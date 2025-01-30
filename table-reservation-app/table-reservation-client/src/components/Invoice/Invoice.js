import React, { useState, useEffect } from "react";
import './Invoice.css'; // Import your invoice CSS styles
import axios from "axios"; // Axios to make HTTP requests

const Invoice = ({ invoiceId, user }) => {
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchInvoice = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/invoice/${invoiceId}`);
          setInvoice(response.data);
          setLoading(false);
        } catch (err) {
          setError("Error fetching invoice data.");
          setLoading(false);
        }
      };
  
      fetchInvoice();
    }, [invoiceId]);
  
    if (loading) return <p>Loading invoice...</p>;
    if (error) return <p>{error}</p>;
  
    const {foods, totalAmount, invoiceDate, invoiceNumber } = invoice;
  
    return (
      <div className="invoice-container">
        {/* Invoice Header */}
        <div className="invoice-header">
          <div className="invoice-info">
            <h4>Invoice No. {invoiceNumber}</h4>
            <p><strong>Date:</strong> {new Date(invoiceDate).toLocaleDateString()}</p>
          </div>
          <div className="company-info">
            <h3>TastyFlow</h3>
            <p>Shlok infinity, 1st floor, Sundersingh Bhandari Overbridge, Opposite Vishvakarma temple</p>
            <p>Phone: (909)991-49101</p>
            <p>Email: tastyflow@gmail.com</p>
          </div>
        </div>
  
        {/* User Details */}
        <div className="user-details">
          <h5>Bill To:</h5>
          {user ? (
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Contact:</strong> {user.contact}</p>
              <p><strong>Address:</strong> {user.address}</p>
            </div>
          ) : (
            <p>No user data available</p>
          )}
        </div>
  
        {/* Selected Foods Table */}
        <div className="food-details">
          <h5>Items Purchased</h5>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.foodId}>
                  <td>{food.name}</td>
                  <td>{food.quantity}</td>
                  <td>${food.price}</td>
                  <td>${(food.quantity * food.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Total and Summary */}
        <div className="total-summary">
          <div className="total">
            <p><strong>Subtotal:</strong> ${totalAmount}</p>
          </div>
          <div className="tax">
            <p><strong>Tax (5%):</strong> ${(totalAmount * 0.05).toFixed(2)}</p>
          </div>
          <div className="grand-total">
            <h4><strong>Grand Total:</strong> ${(totalAmount + (totalAmount * 0.05)).toFixed(2)}</h4>
          </div>
        </div>
  
        {/* Print Button */}
        <button className="print-invoice-btn" onClick={() => window.print()}>
          Print Invoice
        </button>
  
        {/* Footer */}
        <div className="invoice-footer">
          <p>Thank you for your business!</p>
          <p>Company Footer Information</p>
        </div>
      </div>
    );
  };
  
  export default Invoice;