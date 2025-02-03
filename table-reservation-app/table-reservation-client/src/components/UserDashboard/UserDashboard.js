import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar/Sidebar'
import "./UserDashboard.css"
import { useNavigate, useParams } from 'react-router-dom';

const UserDashBoard = () => {
    const { userId } = useParams();
    const navigate = useNavigate(); // hook for navigation
console.log('User ID:', userId);  // This will help you verify the userId

    const [userName, setUserName] = useState('')
    const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/admin/getuser/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
            },
          });
    
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            setUserName(data);
          } else {
            toast.error("Error fetching user details");
          }
        } catch (error) {
          toast.error("An error occurred while fetching user details");
          console.log(error)
        }
      };

        useEffect(() => {
          fetchUserDetails();
        }, [userId]);

        const handleReviewsClick = () => {
            navigate(`/users/reviews/${userId}`); // Navigate to the reviews page
        };
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="user-dash">
        <form className="user-dash-form flex-col">
          <h1 className="header">{userName.name}</h1>
          
            <button onClick={handleReviewsClick}>reviews</button>
        </form>
      </div>
    </div>
  );
};

export default UserDashBoard;
