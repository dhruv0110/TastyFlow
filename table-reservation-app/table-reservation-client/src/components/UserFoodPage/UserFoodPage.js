import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar"; // Sidebar component import
import Invoice from "../Invoice/Invoice"; // Import the Invoice component
import './UserFoodPage.css'; // Add your CSS styles
import { toast } from "react-toastify";

const UserFoodPage = () => {
  const { userId } = useParams();
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const [isSelectionSaved, setIsSelectionSaved] = useState(false); // Track if the selection is saved

  useEffect(() => {
    // Fetch food items
    fetch("http://localhost:5000/api/food/list")
      .then((response) => response.json())
      .then((data) => setFoods(data.data))
      .catch((err) => console.error("Error fetching food items:", err));

    const token = localStorage.getItem('token');

    if (token) {
      fetch(`http://localhost:5000/api/users/admin/getuser/${userId}`, {
        method: 'GET',
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.error("Error fetching user data:", err));
    } else {
      console.error("No token found");
    }
  }, [userId]);

  const addFoodToUser = (food) => {
    setSelectedFoods((prev) => {
      const existingFoodIndex = prev.findIndex(f => f.foodId === food._id);

      if (existingFoodIndex > -1) {
        return prev;
      }

      const updatedFoods = [
        ...prev,
        {
          foodId: food._id,
          category: food.category,
          name: food.name,
          price: food.price,
          quantity: 1,
        }
      ];
      updateTotal(updatedFoods);
      return updatedFoods;
    });
  };

  const updateTotal = (foods) => {
    const total = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);
    setTotal(total);
  };

  const increaseQuantity = (foodId) => {
    setSelectedFoods((prev) => {
      const updatedFoods = prev.map((food) => {
        if (food.foodId === foodId) {
          return { ...food, quantity: food.quantity + 1 };
        }
        return food;
      });
      updateTotal(updatedFoods);
      return updatedFoods;
    });
  };

  const decreaseQuantity = (foodId) => {
    setSelectedFoods((prev) => {
      const updatedFoods = prev
        .map((food) => {
          if (food.foodId === foodId && food.quantity > 0) {
            return { ...food, quantity: food.quantity - 1 };
          }
          return food;
        })
        .filter((food) => food.quantity > 0); // Remove foods with quantity 0
  
      updateTotal(updatedFoods);
      return updatedFoods;
    });
  };

  const generateInvoice = () => {
    // Check if selection has been saved before generating the invoice
    if (!isSelectionSaved) {
      toast.error("Please click 'Save Selection' first.");
      return; // Stop the invoice generation process if the selection isn't saved
    }

    const invoiceData = {
      userId: userId,
      foods: selectedFoods.map(food => ({
        foodId: food.foodId,
        name: food.name,
        price: food.price,
        quantity: food.quantity,
      })),
      totalAmount: total,
    };

    fetch("http://localhost:5000/api/invoice/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(invoiceData),
    })
      .then((response) => response.json())
      .then((data) => {
        setInvoiceGenerated(true);
        setInvoiceId(data.invoice._id);
      })
      .catch((err) => console.error("Error creating invoice:", err));
  };

  const saveSelection = () => {
    fetch(`http://localhost:5000/api/users/${userId}/add-food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foods: selectedFoods }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setIsSelectionSaved(true); // Mark the selection as saved
      })
      .catch((err) => console.error("Error saving selection:", err));
  };

  return (
    <div className="user-food-page-wrapper">
      <Sidebar /> {/* Sidebar on the left */}
      <div className="user-food-page">
        <div className="food-list">
          <h1 className="header">All Foods List</h1>
          <ul>
            {foods.map((food) => (
              <li key={food._id} className="food-item">
                <div className="food-details">
                  <span className="food-name">{food.name}</span>
                </div>
                <span className="food-price">${food.price}</span>
                <button onClick={() => addFoodToUser(food)}>Add Food</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="selected-foods">
          <h1 className="header">Selected Foods for User</h1>
          
          {/* Display User's Details */}
          {user && (
            <div className="user-details">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Contact:</strong> {user.contact}</p>
              {/* Add more user details as needed */}
            </div>
          )}

          <ul>
            {selectedFoods.map((food) => (
              <li key={food.foodId}>
                <div className="food-name-price">
                  <span className="food-name">{food.name}</span>
                  <span className="food-price">${food.price}</span>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(food.foodId)}>-</button>
                  <span className="food-quantity">{food.quantity}</span>
                  <button onClick={() => increaseQuantity(food.foodId)}>+</button>
                </div>
              </li>
            ))}
          </ul>

          <h4 className="total-price">Total: ${total}</h4>

          <div className="actions">
            <button
              onClick={saveSelection}
              className="action-button"
              disabled={total === 0} // Disable Save Selection if total is 0
            >
              Save Selection
            </button>

            <button
              onClick={generateInvoice}
              className="action-button"
              disabled={total === 0} // Disable Generate Invoice if total is 0
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Render Invoice when generated */}
      {invoiceGenerated && user && invoiceId && (
        <Invoice invoiceId={invoiceId} user={user} />
      )}
    </div>
  );
};

export default UserFoodPage;
