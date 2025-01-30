import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar"; // Sidebar component import
import Invoice from "../Invoice/Invoice"; // Import the Invoice component
import './UserFoodPage.css'; // Add your CSS styles

const UserFoodPage = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const [foods, setFoods] = useState([]); // Store all food items
  const [selectedFoods, setSelectedFoods] = useState([]); // Store selected food items
  const [total, setTotal] = useState(0); // Total amount for selected foods
  const [user, setUser] = useState(null); // Store user data
  const [invoiceGenerated, setInvoiceGenerated] = useState(false); // Track if invoice is generated
  const [invoiceId, setInvoiceId] = useState(null); // Store the invoiceId after creation

  // Fetch user and food data
  useEffect(() => {
    // Fetching food items
    fetch("http://localhost:5000/api/food/list")
      .then((response) => response.json())
      .then((data) => setFoods(data.data))
      .catch((err) => console.error("Error fetching food items:", err));

    const token = localStorage.getItem('token'); // Retrieve the token from storage

    if (token) {
      fetch(`http://localhost:5000/api/users/admin/getuser/${userId}`, {
        method: 'GET',
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User Data:", data);  // Log the API response
          setUser(data);  // Set the user data
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    } else {
      console.error("No token found");
    }
  }, [userId]);

  // Add food to selected list
  const addFoodToUser = (food) => {
    setSelectedFoods((prev) => {
      const existingFoodIndex = prev.findIndex(f => f.foodId === food._id);

      if (existingFoodIndex > -1) {
        return prev; // Food already in the list
      }

      const updatedFoods = [
        ...prev,
        {
          foodId: food._id,
          category: food.category,  // Ensure category is included
          name: food.name,
          price: food.price,
          quantity: 1,
        }
      ];
      updateTotal(updatedFoods);
      return updatedFoods;
    });
  };

  // Update the total price
  const updateTotal = (foods) => {
    const total = foods.reduce((sum, food) => sum + food.price * food.quantity, 0);
    setTotal(total);
  };

  // Increase food quantity
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

  // Decrease food quantity
  const decreaseQuantity = (foodId) => {
    setSelectedFoods((prev) => {
      const updatedFoods = prev.map((food) => {
        if (food.foodId === foodId && food.quantity > 1) {
          return { ...food, quantity: food.quantity - 1 };
        }
        return food;
      });
      updateTotal(updatedFoods);
      return updatedFoods;
    });
  };

  // Generate invoice and save it to the backend
  const generateInvoice = () => {
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
        "auth-token": localStorage.getItem("token"), // Include auth-token
      },
      body: JSON.stringify(invoiceData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Invoice created:", data);
        setInvoiceGenerated(true);  // Show the invoice once created
        setInvoiceId(data.invoice._id);  // Save the invoiceId from the response
      })
      .catch((err) => console.error("Error creating invoice:", err));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar /> {/* Sidebar on the left */}

      <div className="user-food-page">
        <div className="food-list">
          <h3>All Foods</h3>
          <ul>
            {foods.map((food) => (
              <li key={food._id}>
                <button onClick={() => addFoodToUser(food)}>
                  Add {food.name} - ${food.price}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="selected-foods">
          <h3>Selected Foods for User</h3>
          <ul>
            {selectedFoods.map((food) => (
              <li key={food.foodId}>
                {food.name} - ${food.price}
                <button onClick={() => decreaseQuantity(food.foodId)}>-</button>
                {food.quantity}
                <button onClick={() => increaseQuantity(food.foodId)}>+</button>
              </li>
            ))}
          </ul>
          <h4>Total: ${total}</h4>

          <button
            onClick={() => {
              fetch(`http://localhost:5000/api/users/${userId}/add-food`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ foods: selectedFoods }),
              })
                .then((response) => response.json())
                .then((data) => alert(data.message))
                .catch((err) => console.error("Error saving selection:", err));
            }}
          >
            Save Selection
          </button>

          <button
            onClick={generateInvoice}
            style={{ marginTop: "20px" }}
          >
            Generate Invoice
          </button>
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
