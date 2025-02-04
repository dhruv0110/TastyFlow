import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';

const EditInvoice = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState({
    foods: [],
    totalAmount: 0,
    cgst: 0,
    sgst: 0,
    roundOffAmount: 0,
    finalAmount: 0,
    invoiceNumber: '',
    invoiceDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [foodsList, setFoodsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoiceDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/invoice/admin/${invoiceId}`);
        setInvoice(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoice details:', error);
        setError('Error fetching invoice details');
        setLoading(false);
      }
    };

    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/food/list');
        setFoodsList(response.data.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
        setError('Error fetching food items');
      }
    };

    fetchInvoiceDetail();
    fetchFoods();
  }, [invoiceId]);

  const calculateTotalAmount = (updatedFoods) => {
    let totalAmount = 0;
    
    // Sum of food total prices
    updatedFoods.forEach(food => {
      totalAmount += food.total;
    });
  
    // Calculating CGST and SGST at 2.5% each (5% in total)
    const cgst = totalAmount * 0.025;
    const sgst = totalAmount * 0.025;
  
    // Total amount before round-off including food totals and taxes
    const totalBeforeRoundOff = totalAmount + cgst + sgst;
  
    // Round-off logic
    const roundOffAmount = Math.round(totalBeforeRoundOff) - totalBeforeRoundOff;
  
    // Final amount with round-off
    const finalAmount = (totalBeforeRoundOff + roundOffAmount).toFixed(2);
  
    return { 
      totalAmount, 
      cgst, 
      sgst, 
      roundOffAmount, 
      finalAmount 
    };
  };
  

  const handleFoodChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFoods = [...invoice.foods];
    const updatedFood = { ...updatedFoods[index] };
  
    const numericValue = parseFloat(value) || 0;
  
    if (name === 'quantity') {
      updatedFood.quantity = numericValue;
      updatedFood.total = updatedFood.price * numericValue;
    } else if (name === 'price') {
      updatedFood.price = numericValue;
      updatedFood.total = numericValue * updatedFood.quantity;
    }
  
    updatedFoods[index] = updatedFood;
  
    const { totalAmount, cgst, sgst, roundOffAmount, finalAmount } = calculateTotalAmount(updatedFoods);
    setInvoice({
      ...invoice,
      foods: updatedFoods,
      totalAmount,
      cgst,
      sgst,
      roundOffAmount,
      finalAmount // This will now include taxes
    });
  };
  

  const handleAddFoodItem = (foodId) => {
    const selectedFood = foodsList.find(food => food._id === foodId);

    if (selectedFood) {
      const newFoodItem = {
        foodId: selectedFood._id,
        name: selectedFood.name,
        price: selectedFood.price,
        quantity: 1,
        total: selectedFood.price,
      };

      setInvoice(prevState => ({
        ...prevState,
        foods: [...prevState.foods, newFoodItem]
      }));
    }
  };

  const handleRemoveFoodItem = (index) => {
    const updatedFoods = [...invoice.foods];
    updatedFoods.splice(index, 1);

    const { totalAmount, cgst, sgst, roundOffAmount, finalAmount } = calculateTotalAmount(updatedFoods);

    setInvoice({
      ...invoice,
      foods: updatedFoods,
      totalAmount,
      cgst,
      sgst,
      roundOffAmount,
      finalAmount
    });
  };

  const handleInvoiceDateChange = (e) => {
    const updatedInvoice = { ...invoice, invoiceDate: e.target.value };
    setInvoice(updatedInvoice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFoods = invoice.foods.map(food => ({
      foodId: food.foodId,
      name: food.name,
      price: parseFloat(food.price) || 0,
      quantity: parseInt(food.quantity) || 1,
      total: parseFloat(food.total) || 0
    }));

    const invoiceDataToStore = {
      ...invoice,
      foods: updatedFoods,
      totalAmount: invoice.finalAmount,
      cgst: invoice.cgst,
      sgst: invoice.sgst,
      roundOffAmount: invoice.roundOffAmount,
      finalAmount: invoice.finalAmount,
      invoiceDate: invoice.invoiceDate
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/invoice/admin/update/${invoiceId}`, invoiceDataToStore);

      if (response.data.message === 'Invoice updated successfully') {
        navigate(`/admin/invoices/${invoiceId}`);
      } else {
        setError('Failed to update invoice');
      }
    } catch (error) {
      console.error('Error updating invoice:', error);
      setError('Failed to update invoice');
    }
  };

  if (loading) return <p>Loading invoice...</p>;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="invoice-detail">
        <h1 className="header">Edit Invoice</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Invoice Number:</label>
            <input type="text" name="invoiceNumber" value={invoice.invoiceNumber} disabled />
          </div>

          <div>
            <label>Invoice Date:</label>
            <input type="date" name="invoiceDate" value={invoice.invoiceDate.split('T')[0]} onChange={handleInvoiceDateChange} />
          </div>

          <div>
  <label>Total Amount (Including Taxes):</label>
  <input
    type="number"
    name="totalAmount"
    value={invoice.finalAmount} // This now reflects the final amount including taxes
    disabled
  />
</div>


          <div>
            <label>CGST:</label>
            <input type="number" name="cgst" value={invoice.cgst} disabled />
          </div>

          <div>
            <label>SGST:</label>
            <input type="number" name="sgst" value={invoice.sgst} disabled />
          </div>

          <div>
            <label>Round Off:</label>
            <input type="number" name="roundOff" value={invoice.roundOffAmount} disabled />
          </div>

          <h4>Food Items:</h4>
          {invoice.foods.map((food, index) => (
            <div key={index}>
              <h5>Food Item {index + 1}</h5>
              <div>
                <label>Food Name:</label>
                <input type="text" name="name" value={food.name} onChange={(e) => handleFoodChange(index, e)} />
              </div>
              <div>
                <label>Price:</label>
                <input type="number" name="price" value={food.price} onChange={(e) => handleFoodChange(index, e)} disabled />
              </div>
              <div>
                <label>Quantity:</label>
                <input type="number" name="quantity" value={food.quantity} onChange={(e) => handleFoodChange(index, e)} />
              </div>
              <div>
                <label>Total:</label>
                <input type="number" name="total" value={food.total} disabled />
              </div>

              <button type="button" onClick={() => handleRemoveFoodItem(index)}>Remove</button>
            </div>
          ))}

          <div>
            <label>Select Food Item:</label>
            <select onChange={(e) => handleAddFoodItem(e.target.value)}>
              <option value="">Select a food item</option>
              {foodsList.map(food => (
                <option key={food._id} value={food._id}>{food.name}</option>
              ))}
            </select>
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditInvoice;
