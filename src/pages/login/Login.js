import React, { useState } from 'react';
import './login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch('https://project1-pi-three.vercel.app/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
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

        if (data.role == '1' || data.role == '2') {
          alert('Login successful');
        } else {
          alert('Invalid email or password');
        }
      } else {
        setErrorMessage('Invalid email or password.');
        alert('Login failed! Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
          <div>Loading...</div>
        ) : (
          <button type="submit">Log in</button>
        )}
      </form>
    </div>
  );
};

export default Login;
