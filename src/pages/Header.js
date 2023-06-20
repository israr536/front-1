import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
//import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Login } from '@mui/icons-material';

const Header = () => {

  const navigate = useNavigate(); // Hook for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(true);
   const [userRole, setUserRole] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    setUserRole('');
    setIsLoggedIn(true);

    navigate("/login");
  };
  return (
    <div>
    <header>
      <div className="logo">Sagenext Post</div>
      <nav className='main-nav'>
        <ul>
          {/* <li><Link to='/post'>Create Order</Link></li> */}
          <li><Link to='/login'>Log in</Link></li>

          {/* <li>
          <Link to="/post" style={{color: '#fff', textDecoration:'none', fontSize:'16px'}}>
            Send Your Letters
          </Link>
          </li> */}
         {/* <li>{ isLoggedIn && <button onClick={handleLogout}>Logout</button>}</li>  */}
          {/* <li>About us</li> */}
        </ul>
      </nav>
      {/* <div className="menu-icon">
        <FaBars />
      </div> */}
    </header>
   {/* <div>{ isLoggedIn && <button onClick={handleLogout}>Logout</button>}</div> */}
   </div>
  );
};

export default Header;

  
