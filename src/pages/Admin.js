import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle, SupervisorAccount } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slider from './Slider';
import Pagination from '../pagination/Pagination';
import { Paginate } from '../pagination/Paginate';
import './admin.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomerHistory from './post/PostHistory';
// import CreateOrder from '../createorder/CreateOrder';




const baseURL = sessionStorage.getItem("apipathurl");
// const { sessionStorage } = window;

const Header = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [orderID, setOrderID] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    setUserRole('');
    setIsLoggedIn(false);

    navigate('/login');
  };

 



  const createOrder = async () => {

    if (!orderID || !status || !date || !time || !location) {
      // Display an alert if any field is left vacant
      alert('Please fill in all fields');
      return;
    }
    try {
      setIsLoading(true); // Set loading state to true

      const currentDate = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };

      const formattedDate = currentDate.toLocaleString('en-IN', options);
      //  const response = await fetch('http://localhost:3000/api/order/createorder',{
      const response = await fetch(`${baseURL}/order/createorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID,
          status,
          date: formattedDate,
          time,
          location,
          mobilenumber,
        }),
      });
      // const response = await fetch(`${baseURL}/order/createorder`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     orderID,
      //     status,
      //     date: formattedDate,
      //     time,
      //     location,
      //     mobilenumber,
      //     address,
      //     pincode,
      //   }),
      // });

      if (response.ok) {
        const data = await response.json();
        if (data.status == 201) {
          const newOrder = data.order;
          setOrders([newOrder, ...orders]);

          setShowForm(false);
          setOrderID('');
          setStatus('');
          setDate(null);
          setTime('');
          setLocation('');
          setMobileNumber('');
          setAddress('');
          setPincode('');
          alert('Form submitted successfully!');
        } else {
          console.error('Failed to create order:', data.message);
        }
      } else {
        console.error('Failed to create order:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      setIsLoading(false); // Set loading state back to false after creating order
    }
  };

  const handleCreateOrderClick = () => {
    setShowForm(true);
  };
  // ...

  return (
    <header>
      <div className="logo">Sagenext Post</div>
      <nav className="main-nav">
        <ul
        >
          <li><Link to='/postalhistory'>Order List</Link></li>

          {/* <li>
            <Link to='/list'>UserList</Link>
          </li> */}
          {/* <div onClick={handleCreateOrderClick}> */}
            {/* <li>
              <Link to='/admin'>
                <CreateOrder />
              </Link>
            </li> */}
          {/* </div> */}
          <li
          >
            <Link to='/post'>
              Create Order
            </Link>
          </li>
          <li
          >
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{ marginRight: '5px', color: 'white', textTransform: 'capitalize', fontSize: '16px' }}
            // startIcon={<SupervisorAccount />}
            >
              Admin
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem>
                <Link to='/register'><button>Add user</button></Link>
              </MenuItem>
              <MenuItem>
                <Link to='/list'><button>UserList</button></Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}><button>Logout</button></MenuItem>
              <div className="container">
                {/* <button onClick={() => setShowForm(true)}>Create Order</button> */}
                {showForm && (
                  <form className="admin-form">
                    <div>
                      <label>Order ID:</label>
                      <input
                        type="text"
                        value={orderID}
                        onChange={(e) => setOrderID(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Status:</label>
                      <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Date:</label>
                      <DatePicker
                        selected={date}
                        onChange={(selectedDate) => setDate(selectedDate)}
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                    <div>
                      <label>Time:</label>
                      <input
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Location:</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div>
                      <label> Customer Mobile Number:</label>
                      <input
                        type="text"
                        value={mobilenumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label> Receiver Address:</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label> Receiver Pincode:</label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </div>
                    <div>
                      <Link to="/admin">
                        <button
                          onClick={createOrder}
                          style={{ marginRight: '10px' }}
                        >
                          Create Order
                        </button>
                      </Link>
                      {successMessage && <p>{successMessage}</p>}
                      <button onClick={() => setShowForm(false)}>Cancel</button>
                    </div>

                  </form>

                )}
              </div>
              {/* <MenuItem><Link to='/post'><button>Post</button></Link></MenuItem> */}

            </Menu>
          </li>

        </ul>

      </nav>
    </header>
  );
};



const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderID, setOrderID] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const pageSize = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedOrders = Paginate(orders, currentPage, pageSize);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('username');
  //   localStorage.removeItem('role');

  //   setUserRole('');
  //   setIsLoggedIn(false);

  //   navigate('/login');
  // };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      // const response = await fetch('http://localhost:3000/api/order/history');
      const response = await fetch(`${baseURL}/order/history`);
      const data = await response.json();

      const currentOrder = data.orderHistory.find(order => order.status === 'Generated');

      const sortedOrders = data.orderHistory
        .filter(order => order.status !== 'Generated')
        .sort((a, b) => {
          const dateComparison = new Date(b.date) - new Date(a.date);
          if (dateComparison !== 0) {
            return dateComparison;
          }
          return new Date(b.time) - new Date(a.time);
        });

      if (currentOrder) {
        sortedOrders.unshift(currentOrder);
      }

      const reversedOrders = sortedOrders.reverse(); // Reverse the sorted orders array

      setOrders(reversedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };



  

  return (
    <>
      <Header />

     
      <Slider />

    

    </>

  );
};

export default AdminPage;
