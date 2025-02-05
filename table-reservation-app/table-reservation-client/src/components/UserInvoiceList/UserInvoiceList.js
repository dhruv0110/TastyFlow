import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get route params
import Sidebar from '../../components/Sidebar/Sidebar';
import "./UserInvoiceList.css";
import axios from 'axios';

const InvoiceDetail = () => {
  const { invoiceId } = useParams(); // Get the invoiceId from the URL
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoiceDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/invoice/admin/${invoiceId}`);
        setInvoice(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoice details:', error);
        setLoading(false);
      }
    };

    fetchInvoiceDetail();
  }, [invoiceId]); // Fetch invoice details whenever the invoiceId changes

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="invoice-detail">

        {loading ? (
          <p>Loading invoice details...</p>
        ) : (
          invoice && (
            <div>
              <h1>Invoice Number: {invoice.invoiceNumber}</h1>
              <p><strong>Invoice Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> {invoice.totalAmount}</p>
              <p><strong>CGST:</strong> {invoice.cgst}</p>
              <p><strong>SGST:</strong> {invoice.sgst}</p>
              <p><strong>Round Off:</strong> {invoice.roundOff}</p>

              <h4>Foods:</h4>
              <ul>
                {invoice.foods.map((food, index) => (
                  <li key={index}>
                    {food.name} - {food.quantity} x {food.price} = {food.total}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default InvoiceDetail;
