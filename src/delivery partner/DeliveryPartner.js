import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { Paginate } from "../pagination/Paginate";
import "react-datepicker/dist/react-datepicker.css";
import "./deliverypartner.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = sessionStorage.getItem("apipathurl");

const Header = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setUserRole("");
    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <div>
      <header>
        <div className="logo">Sagenext Post</div>
        <nav className="main-nav">
          <ul>
            <li>
              {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
            </li>
            <li>DeliveryPartner</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

const OrderUpdate = () => {
  const [OrderID, setOrderID] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]); // Added missing state
  const [isLoading, setIsLoading] = useState(true); // Added missing state
  const navigate = useNavigate(); // Hook for navigation

  const pageSize = 10;
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedOrderHistory = Paginate(orderHistory, currentPage, pageSize); // Corrected variable name

  const handleUpdate = async () => {
    try {
      const currentDate = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const formattedDate = currentDate.toLocaleString("en-IN", options);
      const response = await fetch("http://localhost:3000/api/post/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OrderID,
          status,
          date: formattedDate,
          time,
          location,
        }),
      });

      const data = await response.json();
      // setUpdateMessage(data.message);

      // Reset form fields
      setOrderID("");
      setStatus("");
      setDate(null);
      setTime("");
      setLocation("");
      toast.success("order update successfully");
    } catch (error) {
      toast.error("error");
    }
  };

  const fetchCustomerHistory = async () => {
    try {
      // const response = await fetch(
      //   `{baseURL}/post/postalhistory``
      // );
      const response = await fetch(
        "http://localhost:3000/api/post/postalhistory"
      );
      const data = await response.json();

      const reversedCustomerHistory = data.reverse(); // Reverse the customer history array

      setOrderHistory(reversedCustomerHistory); // Corrected state name
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch customer history:", error);
      setIsLoading(false);
    }
  };

  const statusOptions = [
    { value: "order collected", label: "order collected" },
    { value: "packing", label: "packing" },
    { value: "dispatch", label: "dispatch" },
    { value: "delivery in process", label: "delivery in process" },
    { value: "on the way", label: "on the way" },
    { value: "arriving today", label: "arriving today" },
    { value: "out for delivery", label: "out for delivery" },
    { value: "delivered", label: "delivered" },
    { value: "delivery cancel", label: "delivery cancel" },
  ];

  useEffect(() => {
    fetchCustomerHistory();
  }, []); // Added missing dependency array

  return (
    <>
      <Header />
      <div className="container">
        <h2>Update Order Status</h2>
        <div className="delivery-content">
          <input
            type="text"
            placeholder="Order ID"
            value={OrderID}
            onChange={(e) => setOrderID(e.target.value)}
            maxLength={8} 
          />
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
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          {/* {updateMessage && <p>{updateMessage}</p>} */}
          <div className="order">
            <h2>Order History</h2>
            <button onClick={() => setShowHistory(true)}>
              Show Order History
            </button>
            {showHistory && (
              <button onClick={() => setShowHistory(false)}>Cancel</button>
            )}
          </div>
          <ToastContainer />
        </div>

        {showHistory && (
          <div className="customers">
            <h2>Order History</h2>
            <table className="customer-history-table">
              <thead>
                <tr>
                  <th>OrderID</th>
                  <th>Receiver Name</th>
                  <th>Receiver Address</th>
                  <th>Receiver City</th>
                  <th>Receiver State</th>
                  <th>Receiver Postal Code</th>
                  <th>Receiver Mobile Number</th>
                  <th>Receiver Email</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>updates</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrderHistory.map((order) => (
                  <tr key={order._id}>
                    <td>{order.OrderID}</td>
                    <td>{order.receiverName}</td>
                    <td>{order.receiverAddress}</td>
                    <td>{order.receiverCity}</td>
                    <td>{order.receiverState}</td>
                    <td>{order.receiverPostalCode}</td>
                    <td>{order.receiverMobilenumber}</td>
                    <td>{order.receiveremail}</td>
                    <td>{order.location}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.updates.map((update) => (
                        <div  className='upp'key={update.date}>
                          Status: {update.status}, Location: {update.location},
                          Date: {update.date}
                        </div>
                      ))}
                    </td>
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
