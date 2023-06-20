import React from 'react';
import './resetpassword.css'
import { useState } from "react";

const baseURL = sessionStorage.getItem('apipathurl');

const ResetPasswordPage = () => {
    const [userId, setUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleUserIdChange = (e) => {
      setUserId(e.target.value);
    };
  
    const handleNewPasswordChange = (e) => {
      setNewPassword(e.target.value);
    };
    const handleResetPassword = async () => {
      if (!userId || !newPassword) {
        // Check if any field is vacant
        alert('Please fill in all fields');
        return;
      }
      // try {
      //   const response = await fetch(`${baseURL}/user/reset`, {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ userId, newPassword }),
      //   });
    
      try {
        const response = await fetch('http://localhost:3000/api/user/reset', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, newPassword }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Success message
          alert('Password reset successfully');
    
          // Reset the fields
          setUserId('');
          setNewPassword('');
        } else {
          // Error message from the server
          alert(data.message || 'An error occurred');
        }
      } catch (error) {
        console.error(error);
        // Error message for unexpected errors
        alert('An error occurred');
      }
    };
    
    
    return (
      <div className="container reset-form">
        <h1>Reset Password</h1>
        <div>
          <label >User ID:</label>
          <input type="text" id="userId" value={userId} onChange={handleUserIdChange} />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} />
        </div>
        <button onClick={handleResetPassword}>Reset Password</button>
        <div>{message}</div>
      </div>
    );
  };
  
  export default ResetPasswordPage;
  