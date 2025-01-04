// components/UserReviews/UserReviews.js
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./AdminTable.css";
import { Link } from "react-router-dom";

const AdminTable = () => {
  return (
    <div className="admin-page-section">
      <Sidebar />
      <div className="admin-page">
      <h1 className="header">Admin Table</h1>
        <div className="slot-btn">
        <Link to="/admin/slot1">
          <button className="btn order-btn" type="button">
            slot1
          </button>
        </Link>
        <Link to="/admin/slot2">
          <button className="btn order-btn" type="button">
            slot2
          </button>
        </Link>
        <Link to="/admin/slot3">
          <button className="btn order-btn" type="button">
            slot3
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
