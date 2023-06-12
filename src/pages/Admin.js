import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle, SupervisorAccount } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slider from './Corosoul';
import Pagination from '../pagination/Pagination';
import { Paginate } from '../pagination/Paginate';
import './admin.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomerHistory from './post/PostHistory';
import CreateOrder from '../createorder/CreateOrder';




// const baseURL = sessionStorage.getItem('apipathurl');
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await fetch(`http://localhost:3000/api/order/history`);
      // const response = await fetch(`${baseURL}/order/history`);
      const data = await response.json();
  
      // Get the currently generated order
      const currentOrder = data.orderHistory.find(order => order.status === 'Generated');
  
      // Sort the orders based on the date in descending order, with the currently generated order at the top
      const sortedOrders = data.orderHistory
        .filter(order => order.status !== 'Generated') // Exclude the currently generated order from the sorting process
        .sort((a, b) => new Date(b.date) - new Date(a.date));
  
      // Prepend the currently generated order at the beginning of the sorted orders array
      sortedOrders.unshift(currentOrder);
  
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false); // Set loading state back to false after fetching orders
    }
  };
  
  

  const createOrder = async () => {
    
    if (!orderID || !status || ! date|| !time || !location) {
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
      const response = await fetch(`http://localhost:3000/api/order/createorder`, {
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
          <li><Link to='/postalhistory'>PostList</Link></li>
        
          <li>
            <Link to='/list'>UserList</Link>
          </li>
          <li ><Link to='/admin'><button><CreateOrder/></button></Link></li>
          <li
          >
            <Link to='/post'><button className="postLink" >
              Post
            </button></Link>
          </li>
          <li
          >
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{ marginRight: '20px' }}
              startIcon={<SupervisorAccount />}
            >

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
    setIsLoading(true); // Set loading state to true
    const response = await fetch(`http://localhost:3000/api/order/history`);
    // const response = await fetch(`${baseURL}/order/history`);
    const data = await response.json();

    // Get the currently generated order
    const currentOrder = data.orderHistory.find(order => order.status === 'Generated');

    // Sort the orders based on date and time in descending order, with the currently generated order at the top
    const sortedOrders = data.orderHistory
      .filter(order => order.status !== 'Generated') // Exclude the currently generated order from the sorting process
      .sort((a, b) => {
        const dateComparison = new Date(b.date) - new Date(a.date); // Compare dates
        if (dateComparison !== 0) {
          return dateComparison; // If dates are different, return the date comparison result
        }
        // If dates are the same, compare times
        return new Date(b.time) - new Date(a.time);
      });

    // Prepend the currently generated order at the beginning of the sorted orders array, if it exists
    if (currentOrder) {
      sortedOrders.unshift(currentOrder);
    }

    setOrders(sortedOrders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  } finally {
    setIsLoading(false); // Set loading state back to false after fetching orders
  }
};



  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  // const fetchOrders = async () => {
  //   try {
      
  //     setIsLoading(true); // Set loading state to true

  //     const response = await fetch(`${baseURL}/order/history`);
  //     const data = await response.json();
  //     setOrders(data.orderHistory);
  //   } catch (error) {
  //     console.error('Failed to fetch orders:', error);
  //   } finally {
  //     setIsLoading(false); // Set loading state back to false after fetching orders
  //   }
  // };

  // const createOrder = async () => {
  //   try {
  //     setIsLoading(true); // Set loading state to true

  //     const response = await fetch(`${baseURL}/order/createorder`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         orderID,
  //         status,
  //         date,
  //         time,
  //         location,
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.status === 201) {
  //         fetchOrders();
  //         setShowForm(false);
  //         setOrderID('');
  //         setStatus('');
  //         setDate(null);
  //         setTime('');
  //         setLocation('');
  //         setSuccessMessage('Order created successfully.');
  //       } else {
  //         console.error('Failed to create order:', data.message);
  //       }
  //     } else {
  //       console.error('Failed to create order:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Failed to create order:', error);
  //   } finally {
  //     setIsLoading(false); // Set loading state back to false after creating order
  //   }
  // };

  // ...

  return (
    <>
      <Header />

      <div className="admin" style={{ position: 'relative' }}>
        <div className="button">

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              zIndex: '999',
              position: 'absolute',
              top: '0px',
              width: '100%',
              left: '0',
              marginTop: '10px',
            }}
          >
            {/* <button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{ marginRight: '20px' }}
          >
            create 
          </button> */}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <div className="container">
                <button onClick={() => setShowForm(true)}>Create Order</button>
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
                      <label>Location && Mobile Number:</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div>

                      <Link to='/admin'> <button
                      
                        style={{ marginRight: '10px' }}
                      >
                        Create Order
                      </button></Link>

                      <button onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                    {successMessage && <p>{successMessage}</p>}
                  </form>
                )}
              </div>

              {/* <MenuItem>
    <Link to="/post">
      <button>Post</button>
    </Link>
  </MenuItem>
  <MenuItem>
    <Link to="/register">
      <button>Add user</button>
    </Link>
  </MenuItem> */}
              {/* <MenuItem>
    <Link to="/login">
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </Link>
  </MenuItem>  */}
            </Menu>
          </div>
        </div>
      </div>
      <Slider />

      <div className="container">
        <h1>Orders Details</h1>
        {isLoading ? (
          <div>Loading...</div> // Display the loader while isLoading is true
        ) : (
          <table>
            <thead>
              <tr>
                <th>OrderID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th> Receiver Mobile Number</th>
                <th>Receiver Address</th>
                <th>Receiver Pincode</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderID}</td>
                  <td>{order.status}</td>
                  <td>{order.date}</td>
                  <td>{order.time}</td>
                  <td>{order.location}</td>
                  <td>{order.mobilenumber}</td>
                  <td>{order.address}</td>
                  <td>{order.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        items={orders.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />

    </>

  );
};

export default AdminPage;
