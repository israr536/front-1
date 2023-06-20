import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import { Paginate } from '../pagination/Paginate';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './deliverypartner.css';
import { Link } from 'react-router-dom';


const baseURL = sessionStorage.getItem("apipathurl");
// const { sessionStorage } = window;

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

    navigate('/login');
  };

  return (
    <div>
      <header>
        <div className="logo">Sagenext Post</div>
        <nav className='main-nav'>
          <ul>
            {/* <li>
            <Link to="/post" style={{color: '#fff', textDecoration:'none', fontSize:'16px'}}>
              Send Your Letters
            </Link>
            </li> */}
            <li>{ isLoggedIn && <button onClick={handleLogout}>Logout</button>}</li>
            {/* <li>About us</li> */}
          </ul>
        </nav>
        {/* <div className="menu-icon">
          <FaBars />
        </div> */}
      </header>
    
    </div>
  );
};

const OrderUpdate = () => {
  const [orderID, setOrderID] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(null); // Updated to use the "date" state as null
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Hook for navigation

  const baseURL = sessionStorage.getItem("apipathurl")

  const pageSize = 10;
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedOrderHistory = Paginate(orderHistory, currentPage, pageSize);

  // const baseURL = sessionStorage.getItem('apipathurl');

  const handleUpdate = async () => {
    try {
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
      //  const response = await axios.put('http://localhost/api/update/status',{
       const response = await axios.put(`${baseURL}/update/status`, {
        orderID,
        status,
        date:formattedDate,
        time,
        location,
      });

      // const response = await axios.put(`${baseURL}/update/status`, {
      //   orderID,
      //   status,
      //   date:formattedDate,
      //   time,
      //   location,
      // });

      setUpdateMessage(response.data.message);

      // Reset form fields
      setOrderID('');
      setStatus('');
      setDate(null);
      setTime('');
      setLocation('');
      alert('order update successfully')
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      // const response = await axios.post('http://localhost:3000/api/update/history');
      const response = await axios.post(`${baseURL}/update/history`);
      const data = response.data;
  
      const currentOrder = data.orderHistory.find(order => order.status === 'Generated');
  
      const sortedOrderHistory = data.orderHistory
        .filter(order => order.status !== 'Generated')
        .sort((a, b) => {
          const dateComparison = new Date(b.date) - new Date(a.date);
          if (dateComparison !== 0) {
            return dateComparison;
          }
          return new Date(b.time) - new Date(a.time);
        });
  
      if (currentOrder) {
        sortedOrderHistory.unshift(currentOrder);
      }
  
      const reversedOrderHistory = sortedOrderHistory.reverse(); // Reverse the sorted order history array
  
      setOrderHistory(reversedOrderHistory);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  useEffect(() => {
    fetchOrderHistory();
  }, []);
  const statusOptions = [
    { value: 'order collected', label: 'order collected'},
    { value: 'packing', label: 'packing',},
    { value: 'dispatch', label: 'dispatch'},
    { value: 'on the way', label:'on the way' },
    { value: 'out for delivery', label: 'out for delivery' },
    { value: 'delivered', label: 'delivered ' },
    { value: 'delivery cancel', label: ' delivery cancel' },
    // Add more options as needed
  ];
  

  return (
    <>
      <Header />
      <div className='container'>
        <h2>Update Order Status</h2>
        <div className='delivery-content'>
          <input
            type='text'
            placeholder='Order ID'
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
          />
              <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='delivery-status'
          >
            <option value="">Select Status</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
            
          {/* <DatePicker
            placeholderText="Date"
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="MM/dd/yyyy"
          /> */}
          <input
            type='date'
            placeholder='Date '
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {/* <input
            type='text'
            placeholder='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          /> */}
          <input
            type='text'
            placeholder='Location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          {updateMessage && <p>{updateMessage}</p>}
          {/* {isLoggedIn && <button onClick={handleLogout}>Logout</button>} */}
          <div className='order'>
            <h2>Order History</h2>
            <button onClick={() => setShowHistory(true)}>Show Order History</button>
          
          </div>
        </div> {/* end deliverye content */}
          
          {/* show order history */}
          {showHistory && (
              <div className='order-history-popup'>
                <div className='order-history-header' >
                  <span className='close-button' onClick={() => setShowHistory(false)}>×</span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Status</th>
                      <th>Date</th>
                      {/* <th>Time</th> */}
                      <th>Location</th>
                    <th>Receiver Mobile number</th>
                    <th>Receiver Address</th>
                    <th>Receiver Pincode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrderHistory.map((order) => (
                      <tr key={order.orderID}>
                        <td>{order.orderID}</td>
                        <td>{order.status}</td>
                        <td>{order.date}</td>
                        {/* <td>{order.time}</td> */}
                        <td>{order.location}</td>
                        <td>{order.mobilenumber}</td>
                        <td>{order.address}</td>
                        <td>{order.pincode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  items={orderHistory.length}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                />
              </div>
            )}
      </div>
    </>
  );
};

export default OrderUpdate;
