import React from "react";
import { useState } from "react";
import './updateuser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = sessionStorage.getItem("apipathurl");

const UpdateUserForm = () => {
    // const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
  
    // const handleUserIdChange = (e) => {
    //   setUserId(e.target.value);
    // };
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleRoleChange = (e) => {
      setRole(e.target.value);
    };
  
    const handleUpdateUser = async () => {
      if (  !username || !email || !role) {
        // Check if any field is vacant
        toast.success('Please fill in all fields');
        return;
      }
      try {
        // const response = await fetch('http://localhost:3000/api/user/update',{
         const response = await fetch(`${baseURL}/user/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  username, email, role }),
        });
    
    
      // try {
      //   const response = await fetch('http://localhost:3000/api/user/update', {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ userId, username, email, role }),
      //   });
    
        if (response.ok) {
          const data = await response.json();
          toast.success('User updated successfully');
          // setMessage(data.message);
    
          // Reset the fields
          // setUserId('');
          setUsername('');
          setEmail('');
          setRole('');
        } else {
          toast.error('Request failed with status ' + response.status);
        }
      } catch (error) {
        // toast.error(error);
        toast.error("user is not updated");
        // setMessage('An error occurred');
      }
    };
    
    
  
    return (
      <div className='update-form'>
        <h1 className="hii">Update User</h1>
        {/* <div>
          <label>User ID:</label>
          <input type="text" id="userId" value={userId} onChange={handleUserIdChange} />
        </div> */}
        <div>
          <label >UserID:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} maxLength={8} />
        </div>
        <div>
          <label >Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label >Role:</label>
        
         <div className='drop'> 
        <select name="role" value={role} onChange={handleRoleChange}>
          <option value="select">Select Role</option>
          <option value="admin">admin</option>
          <option value="deliverypartner">deliverypartner</option>
          <option value="agent">agent</option>
        </select>
        </div>
        </div>
        <div className="button">
        <button onClick={handleUpdateUser}>Update User</button>
        </div>
        <ToastContainer className="toast-container" />
        {/* <div>{message}</div> */}
      </div>
    );
  };
  
  export default UpdateUserForm;
  