import React from 'react';
import './resetpassword.css'
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = sessionStorage.getItem("apipathurl");

const ResetPasswordPage = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handleNewPasswordChange = (e) => {
      setNewPassword(e.target.value);
    };
    const handleResetPassword = async () => {
      if (!username || !newPassword) {
        // Check if any field is vacant
        toast.error('Please fill in all fields');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/user/reset',{
        // const response = await fetch(`${baseURL}/user/reset`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, newPassword }),
        });
    
      // try {
      //   const response = await fetch('http://localhost:3000/api/user/reset', {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ userId, newPassword }),
      //   });
    
        const data = await response.json();
    
        if (response.ok) {
          // Success message
          toast.success('Password reset successfully');
    
          // Reset the fields
          setUsername('');
          setNewPassword('');
        } else {
          // Error message from the server
          toast.error(data.message || 'An error occurred');
        }
      } catch (error) {
        console.error(error);
        // Error message for unexpected errors
        toast.error('An error occurred');
      }
    };
    
    
    return (
      <div className="container reset-form">
        <h1 >Reset Password</h1>
        <div>
          <label >UserID:</label>
          <input type="text" id="userId" value={username} onChange={handleUsernameChange} maxLength={8}/>
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} maxLength={8} />
        </div>
        <div className='btn'>
        <button onClick={handleResetPassword}>Reset Password</button>
        </div>
       
        {/* <div>{message}</div> */}
        <ToastContainer className="toast-container" />
      </div>
    );
  };
  
  export default ResetPasswordPage;
  