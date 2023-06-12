import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import './App.css';
import AdminPage from './pages/Admin';
import Post from './pages/post/Post';
import OrderUpdate from '../src/delivery partner/DeliveryPartner';
import CustomerHistory from './pages/post/PostHistory';
import CreateOrder from './createorder/CreateOrder';
import UserList from './userslist/UserList';

// sessionStorage.setItem("apipathurl","http://localhost:3000/api")
  //  sessionStorage.setItem("apipathurl","https://postaltrackingapp.onrender.com/api")
const App = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (token && username && role) {
      setUserRole(role);
      setIsLoggedIn(true);

      // Navigate to the appropriate page based on the user role
      if (role == '1') {
        navigate("/admin");
      } else if (role == '2') {
        navigate("/delivery");
      } else if (role == '3') {
        navigate("/");
      }
    }
  }, []);

  const handleLogin = (token, username, role) => {
    console.log(role);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);

    setUserRole(role);
    setIsLoggedIn(true);

    // Navigate to the appropriate page based on the user role
    if (role == '1') {
      navigate("/admin");

    } 
    else if(role == '1') {
      navigate("/post");
    } else if(role == '1') {
      navigate("/admin");
    } else if(role == '1') {
      navigate("/postalhistory");
    } else if(role == '1') {
      navigate("/register");
    } else if (role == '2') {
      navigate("/delivery");
    } else if (role == '3') {
      navigate("/");
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('username');
  //   localStorage.removeItem('role');

  //   setUserRole('');
  //   setIsLoggedIn(false);

  //   navigate("/login");
  // };

  return (
    <>
      <div className="app" style={{ color: 'GrayText' }}>
      
        <Routes>
       
          <Route path="/" element={<Home />} />
         
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {isLoggedIn && userRole == '1' && <Route path="/register" element={<Register />} />}
          {isLoggedIn && userRole == '1' && <Route path="/admin" element={<AdminPage />} />}
          {isLoggedIn && userRole == '1' && <Route path="/list" element={<UserList />} />}
          {isLoggedIn && userRole == '1' && <Route path="/post" element={<Post />} />}
          {isLoggedIn && userRole == '1' && <Route path="/admin" element={<CreateOrder />} />}
         {isLoggedIn && userRole == '1' && <Route path="/postalhistory" element={<CustomerHistory/>}/>}
          {isLoggedIn && userRole == '2' && <Route path="/delivery" element={<OrderUpdate />} />}
        </Routes>
        {/* {isLoggedIn && <button onClick={handleLogout}>Logout</button>}  */}
      </div>
    </>
  );
};

export default App;
