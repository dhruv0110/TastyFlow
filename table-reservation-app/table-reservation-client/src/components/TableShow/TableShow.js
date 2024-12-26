import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import CustomSpinner from '../CustomSpinner/CustomSpinner'; // Import custom spinner
import './TableShow.css';

function TableShow(props) {
  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [tableCapacity, setTableCapacity] = useState(''); // State for table capacity
  const [tableSlot, setTableSlot] = useState('');
  const [loadingTable, setLoadingTable] = useState(null); // State for loading spinner
  const [addingTable, setAddingTable] = useState(false); // State to show a loading spinner when adding a table

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const addTable = async () => {
    if (!tableNumber || !tableCapacity || !tableSlot) {
      props.showAlert('Table number, capacity, and slot are required', 'error');
      return;
    }
  
    try {
      setAddingTable(true); // Show loading spinner while adding a table
      await axios.post('http://localhost:5000/api/tables/add', { number: tableNumber, capacity: tableCapacity, slot: tableSlot });
      props.showAlert('Table added', 'success');
      fetchTables();
      setTableNumber('');
      setTableCapacity('');
      setTableSlot('');
    } catch (error) {
      console.error('Error adding table:', error);
      const errorMessage = error.response?.data?.message || 'Error adding table';
      props.showAlert(errorMessage, 'error'); // Show error message from backend
    } finally {
      setAddingTable(false); // Hide loading spinner after table is added
    }
  };

  const deleteTable = async (number) => {
    try {
      await axios.delete('http://localhost:5000/api/tables/delete', { data: { number } });
      props.showAlert('Table deleted', 'success');
      fetchTables();
    } catch (error) {
      console.error('Error deleting table:', error);
      props.showAlert('Error deleting table', 'error');
    }
  };

  const unreserveTable = async (number) => {
    try {
      setLoadingTable(number); // Set loading state for the table being unreserved
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.post('http://localhost:5000/api/tables/admin/unreserve', 
        { number }, 
        {
          headers: { 'auth-token': token },
        }
      );
      props.showAlert('Table unreserved', 'success');
      fetchTables();
    } catch (error) {
      console.error('Error unreserving table:', error);
      props.showAlert('Error unreserving table', 'error');
    } finally {
      setLoadingTable(null); // Reset loading state after unreserving table
    }
  };

  const sortedTables = [...tables].sort((a, b) => a.number - b.number);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className='table-show'>
        <h1 className='header'>Manage Tables</h1>

        <div className='table-input-container'>
          <input 
            type="number" 
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="Enter table number"
            className="table-input"
          />
          <input 
            type="number" 
            value={tableCapacity}
            onChange={(e) => setTableCapacity(e.target.value)}
            placeholder="Enter table capacity"
            className="table-input"
          />
          <input 
            type="number" 
            value={tableSlot}
            onChange={(e) => setTableSlot(e.target.value)}
            placeholder="Enter table slot"
            className="table-input"
          />
          <button onClick={addTable} className="add-button" disabled={addingTable}>
            {addingTable ? <CustomSpinner /> : 'Add Table'}
          </button>
        </div>

        <div className='table-list'>
          {sortedTables.map(table => (
            <div key={table._id} className='table-item'>
              <button
                onClick={() => table.reserved && unreserveTable(table.number)}
                className={table.reserved ? 'unreserve-button' : 'reserve-button'}
                disabled={loadingTable === table.number}
              >
                {loadingTable === table.number ? (
                  <div className="spinner-container">
                    <CustomSpinner />
                  </div>
                ) : (
                  `Table ${table.number} (Slot: ${table.slot})`
                )}
              </button>

              {table.reserved && (
                <div className='reserved-info'>
                  Reserved by: {table.reservedBy?.name || 'Unknown'} ({table.reservedBy?.contact || 'Unknown'})
                </div>
              )}

              <button
                onClick={() => deleteTable(table.number)}
                className='delete-button'
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TableShow;
