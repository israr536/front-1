import React, { useState } from 'react';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShippingFast, faUser, faClipboardList, faTruck, faLocation, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import './slider.css';
import img from "../images/post.jpg"
// import Footer from "../Footer";

const baseURL = sessionStorage.getItem("apipathurl")

const Slider = () => {
  const [orderHistory, setOrderHistory] = useState({});
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrderById = async (orderID) => {
    try {
      setShowOrderHistory(false);
      setIsLoading(true);
      // const response = await fetch(`http://localhost:3000/api/post/${orderID}`);
        const response = await fetch(`${baseURL}/post/${orderID}`);
      const data = await response.json();
      setOrderHistory(data.order);
      setShowOrderHistory(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch order:', error);
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fetchOrderById(inputValue);
  };

  const handleCancel = () => {
    setShowOrderHistory(false);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    
      <div className='slider '>
        <div className='trackingDiv'>
          <div className="search-box">
            <div className='tabButtons'>
              <div className='single active'>
                <FontAwesomeIcon icon={faShippingFast} className="tracking-icon" />
                <label htmlFor="trackingInput">Tracking</label>
              </div>
              {/* <div className='single'>
                <FontAwesomeIcon icon={faRupeeSign} className="tracking-icon" />
                <label htmlFor="trackingInput">Shipping Rates</label>
              </div> */}

              {/* <div className='single'>
                <FontAwesomeIcon icon={faLocation} className="tracking-icon" />
                <label htmlFor="trackingInput">Find Drop Points</label>
              </div> */}
            </div>
            <div className='trackInputDiv'>
              <h2>Enter your orderID</h2>
              <div className='trackInput'>

                <input
                  type="text"
                  id="trackingInput"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter orderID number"
                />
                <button onClick={handleClick} className="search-button">
                  <span className="button-text">Search</span>
                  {/* <FontAwesomeIcon icon={faSearch} /> */}
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className='container order-tracking-history'>
  {isLoading ? (
    <div>Loading...</div>
  ) : showOrderHistory ? (
    orderHistory ? ( // Check if orderHistory is not null or undefined
      <div className="order-tracking-history">
        <span className="cancel-span" onClick={handleCancel}>×</span>
        <h2>Order Tracking History</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr key={orderHistory._id}>
              <td>{orderHistory.OrderID}</td>
              <td>{orderHistory.status}</td>
              <td>{orderHistory.date}</td>
              <td>{orderHistory.location}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : (
      <div className="order-tracking-history">
        <span className="cancel-span" onClick={handleCancel}>×</span>
        <h2>Order Tracking History</h2>
        <p>No Order history found !!</p>
      </div>
    )
  ) : null}
</div>

        <div className="sending-container">

          <div className="subheadings">
          <h1>Let's Start Sending Your Order</h1>
          <p>Join the best courier and logistics company in india who can send your packages easily,safely and reliably!!</p>
            <div>
              <FontAwesomeIcon icon={faUser} className="subheading-icon" />
              <div className="text">
              <h2> First of all create an Account</h2>
              <p>Choose the Sagenext courier service </p>
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon={faClipboardList} className="subheading-icon" />
              <div className="text">
              <h2>Create Order</h2>
              <p>Enter package details in to our system, schedule package pickup </p>
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon={faTruck} className="subheading-icon" />
              <div className="text">
              <h2>Send and Track Your Packages</h2>
              <p>Give your package to our courier and track your order</p>
              </div>
            </div>
          </div>
          <div className="image-container">
              <img src={img} alt="Image" />
            </div>
        </div>

       
      </div>
    

  );
};

export default Slider;
