import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';
import './EditInvoice.css';

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
    invoiceDate: '',
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

    updatedFoods.forEach((food) => {
      totalAmount += food.total;
    });

    const cgst = totalAmount * 0.025;
    const sgst = totalAmount * 0.025;

    const totalBeforeRoundOff = totalAmount + cgst + sgst;

    const roundOffAmount = Math.round(totalBeforeRoundOff) - totalBeforeRoundOff;

    const finalAmount = (totalBeforeRoundOff + roundOffAmount).toFixed(2);

    return {
      totalAmount,
      cgst,
      sgst,
      roundOffAmount,
      finalAmount,
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
      finalAmount,
    });
  };

  const handleAddFoodItem = (foodId) => {
    const selectedFood = foodsList.find((food) => food._id === foodId);
  
    if (selectedFood) {
      const newFoodItem = {
        foodId: selectedFood._id,
        name: selectedFood.name,
        price: selectedFood.price,
        quantity: 1,
        total: selectedFood.price,
      };
  
      // Add the new food item to the invoice
      const updatedFoods = [...invoice.foods, newFoodItem];
  
      // Recalculate the totals after adding the new food item
      const { totalAmount, cgst, sgst, roundOffAmount, finalAmount } = calculateTotalAmount(updatedFoods);
  
      // Update the invoice state with the new food item and the updated totals
      setInvoice({
        ...invoice,
        foods: updatedFoods,
        totalAmount,
        cgst,
        sgst,
        roundOffAmount,
        finalAmount,
      });
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
      finalAmount,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFoods = invoice.foods.map((food) => ({
      foodId: food.foodId,
      name: food.name,
      price: parseFloat(food.price) || 0,
      quantity: parseInt(food.quantity) || 1,
      total: parseFloat(food.total) || 0,
    }));

    const invoiceDataToStore = {
      ...invoice,
      foods: updatedFoods,
      totalAmount: invoice.finalAmount,
      cgst: invoice.cgst,
      sgst: invoice.sgst,
      roundOffAmount: invoice.roundOffAmount,
      finalAmount: invoice.finalAmount,
      invoiceDate: invoice.invoiceDate,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/invoice/admin/update/${invoiceId}`, invoiceDataToStore);

      if (response.data.message === 'Invoice updated successfully') {
        navigate("/admin/all-invoices");
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
    <div className="edit-invoice-container">
      <Sidebar />
      <div className="edit-invoice-detail">
        <h1 className="header">Edit Invoice</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <p>Invoice Number: {invoice.invoiceNumber}</p>
          </div>

          <div className="tax-details">
  <div className="tax-item">
    <label>Total Amount (Including Taxes):</label>
    <p>{invoice.finalAmount ? invoice.finalAmount : invoice.totalAmount}</p>
  </div>

  <div className="tax-item">
    <label>CGST:</label>
    <p>{invoice.cgst}</p>
  </div>

  <div className="tax-item">
    <label>SGST:</label>
    <p>{invoice.sgst}</p>
  </div>

  <div className="tax-item">
    <label>Round Off:</label>
    <p>{invoice.roundOffAmount? invoice.roundOffAmount : invoice.roundOff}</p>
  </div>
</div>


          <h4>Food Items:</h4>
          <div className="food-item-container">
            {invoice.foods.map((food, index) => (
              <div className="food-item" key={index}>
                <div className="food-details">
                <p className='index_num'>{index + 1}.</p>
                  <div>
                    <p>{food.name}</p>
                  </div>
                  <div>
                    <p>{food.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="quantity"
                      value={food.quantity}
                      onChange={(e) => handleFoodChange(index, e)}
                    />
                  </div>
                  <div>
                    <p>{food.total.toFixed(2)}</p>
                  </div>
                  <button type="button" onClick={() => handleRemoveFoodItem(index)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <label>Select Food Item:</label>
            <select onChange={(e) => handleAddFoodItem(e.target.value)} className="food-dropdown">
              <option value="">Select a food item</option>
              {foodsList.map((food) => (
                <option key={food._id} value={food._id}>
                  {food.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditInvoice;
