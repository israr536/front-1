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
// import CreateOrder from './createorder/CreateOrder';
import UserList from './userslist/UserList';
import ResetPasswordPage from './pages/register/ResetPassword';
import UpdateUserForm from './pages/register/Updateuser';
import Agent from './agent/Agent';
import { Update } from '@mui/icons-material';
import {  useLocation } from 'react-router-dom';
// import cors from 'react';

 sessionStorage.setItem("apipathurl","http://localhost:3000/api")
    sessionStorage.setItem("apipathurl","https://hexa-order.onrender.com/api")
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
      if (role === 'admin') {
        navigate("/admin");
      } else if (role === 'deliverypartner') {
        navigate("/delivery");
      } else if (role === 'agent') {
        navigate("/agent");
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
    if (role === "admin") {
      navigate("/admin");

    } 
    // else if(role == '1') {
    //   navigate("/post");
     else if(role === "admin") {
      navigate("/admin");
    } else if(role === "admin") {
      navigate("/postalhistory");
    } else if(role === "admin") {
      navigate("/register");
    } else if (role === "deliverypartner") {
      navigate("/delivery");
    } else if (role === "agent") {
      navigate("/agent");
    }
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  
  //   // Rest of your form submission logic...
  
  //   // After the form submission, you can perform any necessary actions based on the user role
  //   if (userRole === 'admin') {
  //     navigate('/admin'); // Redirect to the admin route
  //   } else if (userRole === 'deliverypartner') {
  //     navigate('/delivery'); // Redirect to the delivery partner route
  //   } else if (userRole === 'agent') {
  //     navigate('/agent'); // Redirect to the agent route
  //   }
  // };
  // const location = useLocation();

  // const handleOrderSubmit = () => {
  //   // Logic for order submission

  //   if (location.pathname === '/agent') {
  //     // Handle order submission for agent route
  //     // ...
  //   } else if (location.pathname === '/admin') {
  //     // Handle order submission for admin route
  //     // ...
  //   }

  //   // Redirect to the current route
  //   navigate('/agent' || '/admin');
  // };
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
            {isLoggedIn && (userRole === "agent" || userRole === "admin")  && <Route path="/register" element={<Register />} />}
          {isLoggedIn && userRole === "admin" && <Route path="/admin" element={<AdminPage />} />}
          {isLoggedIn &&(userRole === "agent" || userRole === "admin") && <Route path="/list" element={<UserList />} />}
          {isLoggedIn && (userRole === "agent" || userRole === "admin") && <Route path="/post" element={<Post />} />}
          {/* {isLoggedIn && (userRole === "agent" || userRole === "admin")  && <Route path="/admin" element={<CreateOrder />} />} */}
         {isLoggedIn && userRole === "admin"&& <Route path="/postalhistory" element={<CustomerHistory/>}/>}
          {isLoggedIn && userRole === "deliverypartner" && <Route path="/delivery" element={<OrderUpdate />} />}
          {isLoggedIn && (userRole === "agent" || userRole === "admin")  && <Route path="/reset" element={<ResetPasswordPage />} />}
          {isLoggedIn && (userRole === "agent" || userRole === "admin")  &&  <Route path="/update" element={<UpdateUserForm />} />}
          {isLoggedIn && userRole === "agent" && <Route path="/agent" element={< Agent/>} />}
          {isLoggedIn && userRole === "agent" && <Route path="/agent" element={< Update/>} />}

        </Routes>
        {/* {isLoggedIn && <button onClick={handleLogout}>Logout</button>}  */}
      </div>
    </>
  );
};

export default App;
