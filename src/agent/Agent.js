import React, { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import { Paginate } from "../pagination/Paginate";
import { AccountCircle, SupervisorAccount } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";
import {
  RiUserAddLine,
  RiLogoutBoxLine,
  RiUserSearchLine,
} from "react-icons/ri";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Slider from "../pages/Slider";
import { ToastContainer, toast } from "react-toastify";

const baseURL = sessionStorage.getItem("apipathurl");

const Header = () => {
  const navigate = useNavigate(); // Hook for navigation
  // const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState("");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setUserRole("");
    setIsLoggedIn(true);

    navigate("/login");
  };

  return (
    <div>
      <header>
        <div className="logo">Sagenext Post</div>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/post">Create Order</Link>
            </li>
            <li>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{
                  marginRight: "5px",
                  color: "white",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
                // startIcon={<SupervisorAccountIcon />}
              >
                Agent
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <Link to="/register">
                    <button>Add User</button>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/list">
                    <button>User List</button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Link to="/logout">
                    <button>Logout</button>
                  </Link>
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

const Agent = () => {
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
       const response = await fetch(`${baseURL}/post/update`, {
      // const response = await fetch("http://localhost:3000/api/post/update", {
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
      const response = await fetch(
        `{baseURL}/post/postalhistory`
      );
      // const response = await fetch(
      //   "http://localhost:3000/api/post/postalhistory"
      // );
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
      
          <div className="order">
            {/* <h2>Order History</h2> */}
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
          <div>
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
                        <div key={update.date}>
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

export default Agent;
