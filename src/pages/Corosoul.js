import React, { useState, useEffect } from 'react';
import './slider.css';

const baseURL = sessionStorage.getItem('apipathurl');

const Slider = () => {
const [orderHistory, setOrderHistory] = useState({});
const [showOrderHistory, setShowOrderHistory] = useState(false);
const [inputValue, setInputValue] = useState('');
const [isLoading, setIsLoading] = useState(false);

// useEffect(() => {
// fetchOrderHistory();
// }, []);

// const fetchOrderHistory = async () => {
// try {
// setIsLoading(true);
// const response = await fetch(`${baseURL}/order/createorder`);
// const data = await response.json();
// setOrderHistory(data.order);
// setIsLoading(false);
// } catch (error) {
// console.error('Failed to fetch order history:', error);
// setIsLoading(false);
// }
// };

const fetchOrderById = async (orderID) => {
try {
setShowOrderHistory(false);
setIsLoading(true);
// const response = await fetch(`http://localhost:3000/api/order/${orderID}`);
const response = await fetch(`${baseURL}/order/${orderID}`);
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
<div>
<div className='slider'>
<div className='search'>
<div>
<input type='text' value={inputValue} onChange={handleInputChange} />
<button onClick={handleClick}>Track</button>
</div>
</div>
<div className='container'>
{isLoading ? (
<div>Loading...</div>
) : showOrderHistory ? (
<div className="order-tracking-history">
<span className="cancel-span" onClick={handleCancel}>×</span>
<h2>Order Tracking History</h2>
<table>
<thead>
<tr>
<th>Order ID</th>
<th>Status</th>
<th>Date</th>
{/* <th>Time</th> */}
<th>Location</th>
</tr>
</thead>
<tbody>
<tr key={orderHistory._id}>
<td>{orderHistory.orderID}</td>
<td>{orderHistory.status}</td>
<td>{orderHistory.date}</td>
{/* <td>{orderHistory.time}</td> */}
<td>{orderHistory.location}</td>
</tr>
</tbody>
</table>
</div>
) : (
<div className='desc'>Click the "Track" button to get started.</div>
)}
</div>
</div>
</div>
);
};

export default Slider;