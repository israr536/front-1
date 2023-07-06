import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
 const baseURL = sessionStorage.getItem("apipathurl");
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      // const response = await fetch(`{baseURL}/user/login`, {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, username: email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.token, data.username, data.role);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);

        if (data.role === "admin" || data.role === "deliverypartner" || data.role === "agent") {
          toast.success(`Login successful`);
        } else {
          toast.error('Invalid email or password');
        }
      } else {
        toast.error('An error occurred during login.');
      }
    } catch (error) {
      toast.error('An error occurred during login.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
        <label>
        
          Email or UserID: </label>
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
        <div className='form-group'>
        <label>
          Password:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        
        </div>
        
        {isLoading ? (
          <div>Loading...</div>
        ) : (
         <div className='btn'> <button type="submit">Log in</button></div>
        )}
      </form>
      <ToastContainer className="toast-container" />
    </div>
  );
};

export default Login;
