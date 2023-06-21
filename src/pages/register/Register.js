import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';

const baseURL = sessionStorage.getItem("apipathurl");

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'role') {
      setRole(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      // Display an alert if any field is left vacant
      alert('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true
      const response = await fetch(`${baseURL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (response.ok) {
        // Registration successful
        setRegisterMessage('Registration successful');
        // Reset form values
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('');
        toast.success('You are successfully registered');
      } else {
        // Registration failed
    toast.error(`Registration failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Set loading state back to false after the request completes
    }
  };

  return (
   <div>
    <form onSubmit={handleSubmit} className="register-form">
      <h1>Register</h1>
      {registerMessage && <p>{registerMessage}</p>}
      <label>
        <br />
        Username:
        <input type="text" name="username" value={username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={handleChange} />
      </label>
      <br />
     
      <label>
        Role:
        {/* <div className='role'> */}
        <select name="role" value={role} onChange={handleChange}>
          <option value="select">Select Role</option>
          <option value="admin">admin</option>
          <option value="deliverypartner">deliverypartner</option>
          <option value="agent">agent</option>
        </select>
        {/* </div> */}
      </label>
      <br />
     
      {isLoading ? (
        <div>Loading...</div> // Display the loader while isLoading is true
      ) : (
        <input type="submit" value="Submit" /> // Show the submit button when not loading
      )}
    </form>
    <ToastContainer className="toast-container" />
    </div>
  );
};

export default Register;
