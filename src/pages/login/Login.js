import React, { useState } from 'react';
import './login.css';

// const baseURL = sessionStorage.getItem('apipathurl');

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true); // Set loading state to true
      const response = await fetch('https://project1-pi-three.vercel.app/api/user/login', {
  // Rest of the code
      method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.status, response.statusText);
      // const response = await fetch(`${baseURL}/user/login`, {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      const data = await response.json();

      if (response.ok) {
        // if (email === data.email && password === data.password && role === data.role) {
        onLogin(data.token, data.username, data.role); // Call the onLogin prop with the necessary data

        // Store the login data in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);

        if (data.role == '1' || data.role == '2') {
          // Set alert to true
          alert('login successfully');
        } else {
          // Set alert to false
          alert('invalid email or password');
        }

      } else {
        setErrorMessage('Invalid email or password.'); // Set the error message
        alert('Login failed! Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login.'); // Set the error message
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Set loading state back to false after the request completes
    }
  };


  return (
    <div className="login-page">
      <h1>Login Page</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display the error message if it exists */}
      <form onSubmit={handleSubmit}>
        <label>
          <br />
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        {isLoading ? (
          <div>Loading...</div> // Display the loader while isLoading is true
        ) : (
          <button type="submit">Log in</button> // Show the login button when not loading
        )}
      </form>
    </div>
  );
};

export default Login;
