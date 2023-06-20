import React, { useState, useEffect } from 'react';
import Pagination from '../../pagination/Pagination';
import { Paginate } from '../../pagination/Paginate';
import { Link } from 'react-router-dom';
import './postalhistory.css';

const baseURL = sessionStorage.getItem("apipathurl");
// console.log(baseURL)

const CustomerHistory = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedcustomers = Paginate(customers, currentPage, pageSize);


  useEffect(() => {
    fetchCustomerHistory();
  }, []);

  const fetchCustomerHistory = async () => {
    try {
      //  const response = await fetch('http://localhost:3000/api/post/postalhistory');
       const response = await fetch(`${baseURL}/post/postalhistory`);
      const data = await response.json();
  
      const reversedCustomerHistory = data.reverse(); // Reverse the customer history array
  
      setCustomers(reversedCustomerHistory);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch customer history:', error);
      setIsLoading(false);
    }
  };
  

  return (
    <div className='postalhistory'>
      <h1>Postal History</h1>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <table className="customer-history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sender Name</th>
                <th>Sender Address</th>
                <th>Sender City</th>
                <th>Sender State</th>
                <th>Sender Postal Code</th>
                <th>Sender Mobile Number</th>
                <th>Sender Email</th>
                {/* <th>Sender Item Category</th>
                <th>Sender Item Description</th> */}
                <th>Receiver Name</th>
                <th>Receiver Address</th>
                <th>Receiver City</th>
                <th>Receiver State</th>
                <th>Receiver Postal Code</th>
                <th>Receiver Mobile Number</th>
                <th>Receiver Email</th>
                <th> Item Category</th>
                <th> Item Description</th>
              </tr>
            </thead>
            <tbody>
           {paginatedcustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer._id}</td>
                  <td>{customer.senderName}</td>
                  <td>{customer.senderAddress}</td>
                  <td>{customer.senderCity}</td>
                  <td>{customer.senderState}</td>
                  <td>{customer.senderPostalCode}</td>
                  <td>{customer.senderMobilenumber}</td>
                  <td>{customer.senderemail}</td>
                  {/* <td>{customer.senderItemCategory}</td>
                  <td>{customer.senderItemDescription}</td> */}
                  <td>{customer.receiverName}</td>
                  <td>{customer.receiverAddress}</td>
                  <td>{customer.receiverCity}</td>
                  <td>{customer.receiverState}</td>
                  <td>{customer.receiverPostalCode}</td>
                  <td>{customer.receiverMobilenumber}</td>
                  <td>{customer.receiveremail}</td>
                  <td>{customer.ItemCategory}</td>
                  <td>{customer.ItemDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
       
        </>
      )}
      
      <Pagination
            items={customers.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
      
    </div>
   
  );
};

export default CustomerHistory;
