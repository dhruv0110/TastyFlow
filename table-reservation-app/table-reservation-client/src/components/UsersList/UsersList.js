// UsersList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar"; // Import the Sidebar
import "./UsersList.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/admin/all-users")  // Fetching all users from the backend
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar /> {/* Add Sidebar */}
      <div className="users-list">
        <h1 className="header">Users List</h1>
        <div className="users-table">
          <div className="users-table-format title">
            <b>Name</b>
            <b>Email</b>
            <b>Role</b>
            <b>Action</b>
          </div>
          {users.map((user) => (
            <div key={user._id} className="users-table-format">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.role}</p>
              <Link to={`/user/${user._id}`} className="cursor">View</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
