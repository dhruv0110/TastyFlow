import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Sidebar from '../../components/Sidebar/Sidebar';
import "./InvoiceList.css";
import axios from 'axios';

const List = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoice/admin/all-invoice');
        setInvoices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="invoice-list">
        <form className="invoice-list-form flex-col">
          <h1 className="header">All Invoice List</h1>

          {loading ? (
            <p>Loading invoices...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Invoice Date</th>
                  <th>Actions</th> {/* Add Actions column for Edit */}
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/admin/invoices/${invoice._id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                        View Invoice
                      </Link>
                      {' | '}
                      <Link to={`/admin/invoices/edit/${invoice._id}`} style={{ color: 'green', textDecoration: 'underline' }}>
                        Edit Invoice
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </form>
      </div>
    </div>
  );
};

export default List;
