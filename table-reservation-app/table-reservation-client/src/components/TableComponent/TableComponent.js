import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import "./TableComponent.css";

const TableComponent = ({ showAlert }) => {
  const [tables, setTables] = useState([]);
  const [userId, setUserId] = useState("");
  const [loadingTable, setLoadingTable] = useState(null);
  const [capacityFilter, setCapacityFilter] = useState(""); // State for filtering by capacity
  const [slotFilter, setSlotFilter] = useState(""); // State for filtering by slot

  useEffect(() => {
    fetchUserDetails();
    fetchTables();
    // eslint-disable-next-line
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.post(
        "http://localhost:5000/api/users/getuser",
        {},
        {
          headers: { "auth-token": token },
        }
      );
      setUserId(response.data._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
      showAlert("Error fetching user details", "danger");
    }
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tables");
      setTables(response.data);
    } catch (error) {
      console.error("Error fetching tables:", error);
      showAlert("Error fetching tables", "danger");
    }
  };

  const toggleReservation = async (number, isReserved, reservedBy) => {
    try {
      setLoadingTable(number);
      const token = localStorage.getItem("token");
      if (!token) return;

      if (isReserved && reservedBy === userId) {
        await axios.post(
          "http://localhost:5000/api/tables/unreserve",
          { number },
          {
            headers: { "auth-token": token },
          }
        );
        showAlert("Table unreserved", "success");
      } else if (!isReserved) {
        await axios.post(
          "http://localhost:5000/api/tables/reserve",
          { number },
          {
            headers: { "auth-token": token },
          }
        );
        showAlert("Table reserved", "success");
      } else {
        showAlert(
          "You do not have permission to unreserve this table",
          "danger"
        );
        setLoadingTable(null);
        return;
      }
      fetchTables();
    } catch (error) {
      console.error("Error toggling reservation:", error);
      showAlert("Error toggling reservation", "danger");
    } finally {
      setLoadingTable(null);
    }
  };

  const sortedTables = [...tables].sort((a, b) => a.number - b.number);
  const filteredTables = sortedTables.filter((table) => {
    const matchesCapacity = capacityFilter ? table.capacity === parseInt(capacityFilter) : true;
  
    const tableSlots = Array.isArray(table.slot) ? table.slot : [table.slot];
  
    const matchesSlot = slotFilter
      ? tableSlots.includes(parseInt(slotFilter)) 
      : true;
    
    return matchesCapacity && matchesSlot;
  });

  return (
    <div className="table-container">
      <div className="container">
        <div className="table-heading">
          <h1>Reserve Your Table</h1>
        </div>

        <div className="filter-indicator-container">
          <div className="capacity-filter">
            <label htmlFor="capacity">Filter by Capacity: </label>
            <select
              id="capacity"
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
            >
              <option value="">All Capacities</option>
              <option value="2">2 People</option>
              <option value="4">4 People</option>
              <option value="6">6 People</option>
            </select>
          </div>

          <div className="slot-filter">
            <label htmlFor="slot">Filter by Slot: </label>
            <select
              id="slot"
              value={slotFilter}
              onChange={(e) => setSlotFilter(e.target.value)}
            >
              <option value="">All Slots</option>
              <option value="1">Slot 1 (5:00 to 7:00)</option>
              <option value="2">Slot 2 (7:00 to 9:00)</option>
              <option value="3">Slot 3 (9:00 to 11:00)</option>
            </select>
          </div>

          <div className="indicator">
            <div className="indicator-item">
              <div className="grey"></div>
              <span>Un-Reserved</span>
            </div>
            <div className="indicator-item">
              <div className="red"></div>
              <span>Reserved</span>
            </div>
          </div>
        </div>

        <div className="table-button-container">
          {filteredTables.map((table) => (
            <div key={table.number} className="table-button">
              <button
                onClick={() =>
                  toggleReservation(
                    table.number,
                    table.reserved,
                    table.reservedBy?._id
                  )
                }
                className={`table-button-button ${
                  table.reserved ? "reserved" : ""
                } ${loadingTable === table.number ? "loading" : ""}`}
                disabled={loadingTable === table.number || (table.reserved && table.reservedBy?._id !== userId)}
              >
                {loadingTable === table.number ? (
                  <div className="spinner-container">
                    <CustomSpinner />
                  </div>
                ) : (
                  `Table ${table.number} (slot : ${table.slot})`
                )}
              </button>
              {table.reserved && (
                <div className="table-button-reserved">Reserved</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
