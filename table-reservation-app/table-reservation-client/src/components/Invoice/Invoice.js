import React, { useState, useEffect } from "react";
import "./Invoice.css"; // Import your invoice CSS styles
import axios from "axios"; // Axios to make HTTP requests
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Invoice = ({ invoiceId, user }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false); // Track sending status


  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/invoice/admin/${invoiceId}`
        );
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
    const printWindow = window.open("", "", "height=800,width=1200");
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
              align-items: center;
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
              margin-top: 20px;
              display: flex;
              flex-direction: column;
              font-size: 1.2rem;
            }
            .total {
              display: flex;
              justify-content: space-between;
              width: 98.8%;
              margin-bottom: 10px;
            }
              .total{
  font-size: 14px;
}
            .total-summary .total p {
              font-size: 1.1rem;
            }
            .final-total {
              display: flex;
              justify-content: space-between;
              width: 98.8%;
              margin-bottom: 10px;
              font-size: 1.5rem;
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
            <div class="invoice-header">
              <div class="invoice-info">
                <h4>Invoice No. ${invoice.invoiceNumber}</h4>
                <p><strong>Date:</strong> ${new Date(
                  invoice.invoiceDate
                ).toLocaleDateString()}</p>
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
                <p><strong>Name:</strong> ${invoice.userId.name}</p>
                <p><strong>Email:</strong> ${invoice.userId.email}</p>
                <p><strong>Contact:</strong> ${invoice.userId.contact}</p>
                <p><strong>Id:</strong> ${user}</p>
              ` : '<p>No user data available</p>'}
            </div>

            <!-- Items Purchased Table -->
            <div class="food-details">
              <h5>Items Purchased</h5>
              <table>
                <thead>
                  <tr>
                    <th>SI Number</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoice.foods.map((food, index) => `
                    <tr>
                      <td style="text-align: center;">${index + 1}</td>
                      <td>${food.name}</td>
                      <td>${food.quantity}</td>
                      <td>${food.price}</td>
                      <td style="text-align: right;">${(food.quantity * food.price).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Total and Summary -->
            <div class="total-summary">
              <div class="total">
                <div>CGST (2.5%)</div>
                <div>${invoice.cgst.toFixed(2)}</div>
              </div>
              <div class="total">
                <div>SGST (2.5%)</div>
                <div>${invoice.sgst.toFixed(2)}</div>
              </div>
              <div class="total">
                <div>Round-off:</div>
                <div>${invoice.roundOff.toFixed(2)}</div>
              </div>
            </div>
                    <hr/>
            <!-- Final Total -->
            <div class="final-total">
              <div>Total</div>
              <div>${invoice.totalAmount.toFixed(2)}</div>
            </div>
                    <hr/>
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



  const sendInvoice = async () => {
    try {
      setIsSending(true); // Set sending status to true
      const response = await axios.post(
        `http://localhost:5000/api/users/send-invoice/${invoiceId}`,
        { userId: user }
      );
      setIsSending(false); // Reset sending status after success
    } catch (error) {
      toast.error('Error sending invoice');
      console.error(error);
    }
  };

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
          <p>Phone: (909)91-49101</p>
          <p>Email: tastyflow@gmail.com</p>
        </div>
      </div>  

      <div className="user-details">
        <h5>Bill To:</h5>
        {user ? (
          <div>
             <p><strong>Name:</strong> {invoice.userId.name}</p>
                <p><strong>Email:</strong> {invoice.userId.email}</p>
                <p><strong>Contact:</strong> {invoice.userId.contact}</p>
                <p><strong>Id:</strong> {user}</p>
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
        <th>SI Number</th>
        <th>Description</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {invoice.foods.map((food, index) => (
        <tr key={food.foodId}>
          <td style={{ textAlign: "center" }}>{index + 1}</td>
          <td>{food.name}</td>
          <td style={{ textAlign: "center" }}>{food.quantity}</td>
          <td style={{ textAlign: "right" }}>{food.price}.00</td>
          <td style={{ textAlign: "right" }}>
              {(food.quantity * food.price).toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <div className="total-summary">
        <div className="total">
          <div>CGST (2.5%)</div>
          <div style={{marginRight:"9px"}}>{invoice.cgst.toFixed(2)}</div>
        </div>
        <div className="total">
          <div>SGST (2.5%)</div>
          <div style={{marginRight:"9px"}}>{invoice.sgst.toFixed(2)}</div>
        </div>
      </div>

      <div className="total">
        <div>Round-off:</div>
        <div style={{marginRight:"9px"}}>{invoice.roundOff.toFixed(2)}</div>
      </div>
      <hr />
      <div className="final-total">
        <div>Total</div>
        <div style={{marginRight:"9px"}}>{invoice.totalAmount.toFixed(2)}</div>
      </div>
      <hr />

      <div className="button-container">
  <button className="print-invoice-btn" onClick={printInvoice}>
    Print Invoice
  </button>
  <button
          className="send-invoice-btn"
          onClick={sendInvoice}
          disabled={isSending} // Disable the button while sending
        >
          {isSending ? 'Sending...' : 'Send Invoice'}
        </button>
</div>

      <div className="invoice-footer">
        <p>Thank you for your business!</p>
        <p>TastyFlow - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Invoice;
