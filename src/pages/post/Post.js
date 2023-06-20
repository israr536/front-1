import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './post.css';

const baseURL = sessionStorage.getItem('apipathurl');


// const CustomerHistory = () => {
//   const [customers, setCustomers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchCustomerHistory();
//   }, []);

//   const fetchCustomerHistory = async () => {
//     try {
//       const response = await fetch(`${baseURL}/post/postalhistory`);
//       const data = await response.json();
//       setCustomers(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Failed to fetch customer history:', error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Postal History</h1>
//       {isLoading ? (
//         <div className="loader">Loading...</div>
//       ) : (
//         <table className="customer-history-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Status</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Location &amp; Mobile Number</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((customer) => (
//               <tr key={customer.orderID}>
//                 <td>{customer.orderID}</td>
//                 <td>{customer.status}</td>
//                 <td>{customer.date}</td>
//                 <td>{customer.time}</td>
//                 <td>{customer.location}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

  const Post = () => {
    const [senderName, setSenderName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [senderCity, setSenderCity] = useState('');
    const [senderState, setSenderState] = useState('');
    const [senderPostalCode, setSenderPostalCode] = useState('');
    const [senderMobilenumber, setSenderMobilenumber] = useState('');
    const [senderemail, setSenderEmail] = useState('');

    const [receiverName, setReceiverName] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [receiverCity, setReceiverCity] = useState('');
    const [receiverState, setReceiverState] = useState('');
    const [receiverPostalCode, setReceiverPostalCode] = useState('');
    const [receiverMobilenumber, setReceiverMobilenumber] = useState('');
    const [receiveremail, setReceiverEmail] = useState('');

    const [ItemCategory, setItemCategory] = useState('');
    const [ItemDescription, setItemDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
  

    const [submitMessage, setSubmitMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false); // Loading state variable

    // ...existing code...
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleTimeChange = (e) => {
      setSelectedTime(e.target.value);
    };

const handleSubmit = (event) => {
  event.preventDefault();

  // Validate form fields
  if (
    !senderName ||
    !senderAddress ||
    !senderCity ||
    !senderState ||
    !senderPostalCode ||
    !senderMobilenumber ||
    !senderemail ||
    !receiverName ||
    !receiverAddress ||
    !receiverCity ||
    !receiverState ||
    !receiverPostalCode ||
    !receiverMobilenumber ||
    !receiveremail ||
    !ItemCategory ||
    !ItemDescription
  ) {
    const fields = [
      { value: senderName, message: 'Sender Name is required.' },
      { value: senderAddress, message: 'Sender Address is required.' },
      { value: senderCity, message: 'Sender city is required.' },
      { value: senderState, message: 'Sender state is required.' },
      { value: senderPostalCode, message: 'Sender code is required.' },
      { value: senderMobilenumber, message: 'Sender mobileno is required.' },
      { value: senderemail, message: 'Sender Email is required.' },
      { value: receiverName, message: 'receiver Name is required.' },
      { value: receiverAddress, message: 'receiver Address is required.' },
      { value: receiverCity, message: 'receiver City is required.' },
      { value: receiverState, message: 'receiver State is required.' },
      { value: receiverPostalCode, message: 'receiver PostalCode is required.' },
      { value: receiverMobilenumber, message: 'receiver Mobilenumber is required.' },
      { value: receiveremail, message: 'receiver email is required.' },
      { value: ItemCategory, message: 'item category is required.' },
      { value: ItemDescription, message: 'item description is required.' },
      
    ];
  
    fields.forEach(field => {
      if (!field.value) {
        alert(field.message);
      }
    });
  
    return;
  }

  const formData = {
    senderName,
    senderAddress,
    senderCity,
    senderState,
    senderPostalCode,
    senderMobilenumber,
    senderemail,
    ItemCategory,
    ItemDescription,
    receiverName,
    receiverAddress,
    receiverCity,
    receiverState,
    receiverPostalCode,
    receiverMobilenumber,
    receiveremail,
    ItemCategory,
    ItemDescription,
  };
  
  setIsLoading(true); // Set loading to true when form is submitted
  // fetch('http://localhost:3000/api/post/createpost',{
   fetch(`${baseURL}/post/createpost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  // fetch(`${baseURL}/post/createpost`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(formData),
  // })
    .then((response) => response.json())
    .then((data) => {
      console.log('Form submission successful', data);
      setSubmitMessage('Form submitted successfully!');
      // Reset form fields
      setSenderName('');
      setSenderAddress('');
      setSenderCity('');
      setSenderState('');
      setSenderPostalCode('');
      setSenderMobilenumber('');
      setSenderEmail('');
      setReceiverName('');
      setReceiverAddress('');
      setReceiverCity('');
      setReceiverState('');
      setReceiverPostalCode('');
      setReceiverMobilenumber('');
      setReceiverEmail('');
      setItemCategory('');
      setItemDescription('');

        // Show success message
        alert('Form submitted successfully!');
    })
    .catch((error) => {
      console.error('Error submitting the form', error);
      setSubmitMessage('An error occurred. Please try again.');
      // Handle the error or display an error message
    })
    .finally(() => {
      setIsLoading(false); // Set loading to false after form submission is complete
    });
};

// ...existing code...


    return (
      <>
        <div>
          <h1>Postal Address Form</h1>
          <form onSubmit={handleSubmit} className="post-form">
            {/* Sender Information */}
            <div className="sender">
              <h2>Sender Information</h2>
              <label>
                Name:
                <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
              </label>
              <br />
              <label>
                Address:
                <input type="text" value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} />
              </label>
              <br />
              <label>
                City:
                <input type="text" value={senderCity} onChange={(e) => setSenderCity(e.target.value)} />
              </label>
              <br />
              <label>
                State:
                <input type="text" value={senderState} onChange={(e) => setSenderState(e.target.value)} />
              </label>
              <br />
              <label>
                Postal Code:
                <input type="text" value={senderPostalCode} onChange={(e) => setSenderPostalCode(e.target.value)} />
              </label>
              <br />
              <label>
                Mobile Number:
                <input type="text" value={senderMobilenumber} onChange={(e) => setSenderMobilenumber(e.target.value)} />
              </label>
              <br />
              <label>
                Email:
                <input type="text" value={senderemail} onChange={(e) => setSenderEmail(e.target.value)} />
              </label>
              <br />
              {/* <label>
                Item Category:
                <input type="text" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} />
              </label>
              <br />
              <label>
                Item Description:
                <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </label>
              <br /> */}
            </div>

            {/* Receiver Information */}
            <div className="receiver">
              <h2>Receiver Information</h2>
              <label>
                Name:
                <input type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
              </label>
              <br />
              <label>
                Address:
                <input type="text" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} />
              </label>
              <br />
              <label>
                City:
                <input type="text" value={receiverCity} onChange={(e) => setReceiverCity(e.target.value)} />
              </label>
              <br />
              <label>
                State:
                <input type="text" value={receiverState} onChange={(e) => setReceiverState(e.target.value)} />
              </label>
              <br />
              <label>
                Postal Code:
                <input type="text" value={receiverPostalCode} onChange={(e) => setReceiverPostalCode(e.target.value)} />
              </label>
              <br />
              <label>
                Mobile Number:
                <input type="text" value={receiverMobilenumber} onChange={(e) => setReceiverMobilenumber(e.target.value)} />
              </label>
              <br />
              <label>
                Email:
                <input type="text" value={receiveremail} onChange={(e) => setReceiverEmail(e.target.value)} />
              </label>
              <br />
              {/* <label>
                Item Category:
                <input type="text" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} />
              </label>
              <br />
              <label>
                Item Description:
                <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </label>
              <br /> */}
            </div>

            <fieldset>
              <legend>Item Remarks:</legend>
            <div className='common-fields w-100'>  
               <label style={{marginRight: '30px'}}>
                Item Category:
                <input type="text" value={ItemCategory} onChange={(e) => setItemCategory(e.target.value)} />
              </label>
              <br />
              <label style={{marginRight: '10px'}}>
                Item Description:
                <input type="text" value={ItemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </label>
              <br />
              {/* <label style={{ marginRight: '10px' }}>
                Date:
                <DatePicker selected={selectedDate} onChange={handleDateChange} />
              </label>
              <br />
              <label style={{ marginRight: '10px' }}>
                Time:
                <input type="text" value={selectedTime} onChange={handleTimeChange} />
              </label>
              <br /> */}
              </div>
            </fieldset>
            

            <div className='submit-box'>
            <button type="submit" className="submit-button">
              Submit
            </button>
            </div>
            {isLoading && <div className="loader" >Loading...</div>} {/* Show loader if isLoading is true */}
            <div className="submit-message">{submitMessage}</div>
          </form>
        </div>
      </>
    );
  };




export default Post;
