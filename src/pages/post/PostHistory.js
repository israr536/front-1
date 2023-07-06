import React, { useState, useEffect } from "react";
import Pagination from "../../pagination/Pagination";
import { Paginate } from "../../pagination/Paginate";
import { Link } from "react-router-dom";
import "./postalhistory.css";

const baseURL = sessionStorage.getItem("apipathurl");

const CustomerHistory = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSenderInfo, setShowSenderInfo] = useState(true);
  const [showReceiverInfo, setShowReceiverInfo] = useState(false);
  const [showItemInfo, setShowItemInfo] = useState(false);
  const [showPagination, setShowPagination] = useState(false);

  const handleShowSenderInfo = () => {
    setShowSenderInfo(showSenderInfo);
    setShowPagination(true);
  };

  const handleShowReceiverInfo = () => {
    setShowReceiverInfo(!showReceiverInfo);
    setShowPagination(true);
  };

  const handleShowItemInfo = () => {
    setShowItemInfo(!showItemInfo);
    setShowPagination(true);
  };

  const pageSize = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedCustomers = Paginate(customers, currentPage, pageSize);

  useEffect(() => {
    fetchCustomerHistory();
  }, []);

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

      setCustomers(reversedCustomerHistory);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch customer history:", error);
      setIsLoading(false);
    }
  };

  const handleCancelSenderInfo = () => {
    setShowSenderInfo(false);
    setShowPagination(false);
  };

  const handleCancelReceiverInfo = () => {
    setShowReceiverInfo(false);
    setShowPagination(false);
  };

  const handleCancelItemInfo = () => {
    setShowItemInfo(false);
    setShowPagination(false);
  };

  return (
    <div className="postalhistory">
      <h1>Postal History</h1>
      <table className="customer-history-table">{/* Table header */}</table>
      <div style={{display:"flex", justifyContent: 'space-between', margin:'20px auto'}} className="button-nav">
      <button onClick={handleShowSenderInfo}>Sender Information</button>
      {showSenderInfo && (
        <button onClick={handleCancelSenderInfo}>Cancel</button>
      )}

      <button onClick={handleShowReceiverInfo} >Receiver Information</button>
      {showReceiverInfo && (
        <button onClick={handleCancelReceiverInfo}>Cancel</button>
      )}

      <button onClick={handleShowItemInfo}>Item Information</button>
      {showItemInfo && <button onClick={handleCancelItemInfo}>Cancel</button>}
      </div>
      

      {showSenderInfo && (
        <div>
          <h2>Sender Information</h2>
          <table className="customer-history-table">
            <thead>
              <tr>
                <th>OrderID</th>
                <th>Sender Name</th>
                <th>Sender Address</th>
                <th>Sender City</th>
                <th>Sender State</th>
                <th>Sender Postal Code</th>
                <th>Sender Mobile Number</th>
                <th>Sender Email</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.OrderID}</td>
                  <td>{customer.senderName}</td>
                  <td>{customer.senderAddress}</td>
                  <td>{customer.senderCity}</td>
                  <td>{customer.senderState}</td>
                  <td>{customer.senderPostalCode}</td>
                  <td>{customer.senderMobilenumber}</td>
                  <td>{customer.senderemail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showReceiverInfo && (
        <div>
          <h2>Receiver Information</h2>
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
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.OrderID}</td>
                  <td>{customer.receiverName}</td>
                  <td>{customer.receiverAddress}</td>
                  <td>{customer.receiverCity}</td>
                  <td>{customer.receiverState}</td>
                  <td>{customer.receiverPostalCode}</td>
                  <td>{customer.receiverMobilenumber}</td>
                  <td>{customer.receiveremail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showItemInfo && (
        <div>
          <h2>Item Information</h2>
          <table className="customer-history-table">
            <thead>
              <tr>
                <th>OrderID</th>
                <th>Item Name</th>
                <th>Item Quantity</th>
                <th>Item Weight</th>
                <th>Item Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>date</th>
                <th>update</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.OrderID}</td>
                  <td>{customer.ItemName}</td>
                  <td>{customer.ItemQuantity}</td>
                  <td>{customer.ItemWeight}</td>
                  <td>{customer.ItemType}</td>
                  <td>{customer.location}</td>
                  <td>{customer.status}</td>
                  <td>{customer.date}</td>
                  <td>
                    {customer.updates.map((update) => (
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
        </div>
      )}

      {showPagination && (
        <Pagination
          items={customers.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default CustomerHistory;
