import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState,useEffect} from "react"; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const baseURL = sessionStorage.getItem("apipathurl");
        
  const CreateOrder = () =>{
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [orderID, setOrderID] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [mobilenumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState('');
    const [userRole, setUserRole] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    

const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };


    // useEffect(() => {
    //     fetchOrders();
    //   }, []);
    
    //   const fetchOrders = async () => {
    //     try {
    //       setIsLoading(true); // Set loading state to true
    
    //       const response = await fetch('http://localhost:3000/api/order/history');
    //       const data = await response.json();
    //       setOrders(data.orderHistory);
    //     } catch (error) {
    //       console.error('Failed to fetch orders:', error);
    //     } finally {
    //       setIsLoading(false); // Set loading state back to false after fetching orders
    //     }
    //   };
    
      const createOrder = async () => {
    
        if (!orderID || !status || ! date||  !location || !mobilenumber || !address || !pincode) {
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
          // time,
          location,
          mobilenumber,
          address,
          pincode,
        }),
      });
    
          if (response.ok) {
            const data = await response.json();
            if (data.status == 201) {
              const newOrder = data.order;
              setOrders([newOrder, ...orders]);
    
              setShowForm(true);
              setOrderID('');
              setStatus('');
              setDate(null);
              setTime('');
              setLocation('');
               setMobileNumber('');
               setAddress('');
               setPincode('');
              toast.success('Form submitted successfully!');
                 // Navigate to the appropriate page based on the user role
          // if (userRole === 'admin') {
          //   navigate('/admin');
          // } else if (userRole === 'agent') {
          //   navigate('/agent');
          // }
            } else {
              toast.error('Failed to create order:', data.message);
            }
          } else {
            toast.error('Failed to create order:', response.statusText);
          }
        } catch (error) {
          toast.error('Failed to create order:', error);
        } finally {
          setIsLoading(false); // Set loading state back to false after creating order
        }
      };
    
      const handleCreateOrderClick = () => {
        setShowForm(true);
      };
      const statusOptions = [
        { value: 'order collected', label: 'order collected'},
        { value: 'packing', label: 'packing',},
        { value: 'dispatch', label: 'dispatch'},
        { value: 'on the way', label:'on the way' },
        { value: 'out for delivery', label: 'out for delivery' },
        { value: ' delivered', label: ' delivered' },
        { value: 'delivery cancel', label: ' delivery cancel' },
        // Add more options as needed
      ];
      // ...
      return(
        <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Create Order
          </button>
  
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
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="delivery-status"
                    >
                      <option value="">Select Status</option>
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
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
                    <label>Location:</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label> Receiver Mobile Number:</label>
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
                    <button
                      onClick={createOrder}
                      style={{ marginRight: '10px' }}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating Order...' : 'Create Order'}
                    </button>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                  </div>
                  {successMessage && <p>{successMessage}</p>}
                </form>
                <ToastContainer className="toast-container" />
                {/* <button onClick={handleCreateOrderClick}>Create Order</button> */}
              
            </div>
          </Menu>
        </div>
      </div>
      );

};

export default CreateOrder;