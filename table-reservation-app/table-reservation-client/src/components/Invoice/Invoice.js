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

  const printInvoice = () => {
    const printWindow = window.open('', '', 'height=800,width=1200');
    const invoiceHTML = `
      <html>
        <head>
          <title>Invoice - ${invoice.invoiceNumber}</title>
          <style>
            @page {
              size: A4;
              margin: 20mm;
            }

            body {
              font-family: Arial, sans-serif;
              font-size: 12px;
              line-height: 1.5;
              margin: 0;
            }

            .invoice-container {
              width: 100%;
              margin: 0 auto;
            }

            .invoice-header {
              align-items : center;
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }

            .company-info h3 {
              margin-bottom: 5px;
              font-size: 18px;
            }

            .company-info p, .invoice-info p {
              font-size: 12px;
              margin: 2px 0;
            }

            .invoice-info h4 {
              font-size: 20px;
              margin: 0;
            }

            .invoice-info p {
              margin: 5px 0;
            }

            .user-details {
              margin: 20px 0;
              border-top: 1px solid #000;
              padding-top: 10px;
            }

            .user-details h5 {
              margin-bottom: 5px;
              font-size: 14px;
            }

            .food-details {
              margin: 20px 0;
            }

            .food-details table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
              font-size: 12px;
            }

            .food-details th, .food-details td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }

            .food-details th {
              background-color: #f4f4f4;
            }

            .total-summary {
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
              font-weight: bold;
            }

            .total-summary p {
              font-size: 14px;
            }

            .grand-total h4 {
              font-size: 18px;
              font-weight: bold;
            }

            .invoice-footer {
              text-align: center;
              font-size: 10px;
              color: #555;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              margin-top: 30px;
            }

            .print-invoice-btn {
              background-color: #4CAF50;
              color: white;
              border: none;
              padding: 10px 20px;
              font-size: 14px;
              cursor: pointer;
              margin-top: 30px;
              display: block;
              width: 100%;
              text-align: center;
              margin-bottom: 20px;
            }

            .print-invoice-btn:hover {
              background-color: #45a049;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <!-- Invoice Header -->
            <div class="invoice-header">
              <div class="invoice-info">
                <h4>Invoice No. ${invoice.invoiceNumber}</h4>
                <p><strong>Date:</strong> ${new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                <p><strong>ID:</strong> ${invoice._id}</p>
              </div>
              <div class="company-info">
                <h3>TastyFlow</h3>
                <p>Shlok Infinity, 1st Floor, Sundersingh Bhandari Overbridge, Opposite Vishvakarma Temple</p>
                <p>Phone: (909)991-49101</p>
                <p>Email: tastyflow@gmail.com</p>
              </div>
            </div>

            <!-- User Details -->
            <div class="user-details">
              <h5>Bill To:</h5>
              ${user ? `
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Contact:</strong> ${user.contact}</p>
                <p><strong>Id:</strong> ${user._id}</p>
              ` : '<p>No user data available</p>'}
            </div>

            <!-- Selected Foods Table -->
            <div class="food-details">
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
                  ${invoice.foods.map(food => `
                    <tr>
                      <td>${food.name}</td>
                      <td>${food.quantity}</td>
                      <td>$${food.price}</td>
                      <td>$${(food.quantity * food.price).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Total and Summary -->
            <div class="total-summary">
              <div class="total">
                <p>Subtotal: $${invoice.totalAmount}</p>
              </div>
              <div class="tax">
                <p>Tax (5%): $${(invoice.totalAmount * 0.05).toFixed(2)}</p>
              </div>
            </div>
            <div class="grand-total">
              <h4><strong>Grand Total: $${(invoice.totalAmount + (invoice.totalAmount * 0.05)).toFixed(2)}</strong></h4>
            </div>

            <!-- Footer -->
            <div class="invoice-footer">
              <p>Thank you for your business!</p>
              <p>TastyFlow - All Rights Reserved</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Write the invoice HTML to the new window and print
    printWindow.document.write(invoiceHTML);
    printWindow.document.close(); // Needed for IE
    printWindow.print(); // Trigger the print dialog
  };

  if (loading) return <p>Loading invoice...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div className="invoice-info">
          <h4>Invoice No. {invoice.invoiceNumber}</h4>
          <p><strong>Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
          <p><strong>ID:</strong> {invoice._id}</p>
        </div>
        <div className="company-info">
          <h3>TastyFlow</h3>
          <p>Shlok Infinity, 1st Floor, Sundersingh Bhandari Overbridge, Opposite Vishvakarma Temple</p>
          <p>Phone: (909)991-49101</p>
          <p>Email: tastyflow@gmail.com</p>
        </div>
      </div>

      <div className="user-details">
        <h5>Bill To:</h5>
        {user ? (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <p><strong>Id:</strong> {user._id}</p>
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>

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
            {invoice.foods.map((food) => (
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

      <div className="total-summary">
        <div className="total">
          <p><strong>Subtotal:</strong> ${invoice.totalAmount}</p>
        </div>
        <div className="tax">
          <p><strong>Tax (5%):</strong> ${(invoice.totalAmount * 0.05).toFixed(2)}</p>
        </div>
      </div>

      <div className="grand-total">
        <h4><strong>Grand Total:</strong> ${(invoice.totalAmount + (invoice.totalAmount * 0.05)).toFixed(2)}</h4>
      </div>

      <button className="print-invoice-btn" onClick={printInvoice}>
        Print Invoice
      </button>

      <div className="invoice-footer">
        <p>Thank you for your business!</p>
        <p>TastyFlow - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Invoice;
