import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import indianStates from '../post/indianstates/IndianStates.js';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './post.css';

const baseURL = sessionStorage.getItem("apipathurl");


const SenderInformation = ({ onNext }) => {
  const [OrderID,setOrderID] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [senderCity, setSenderCity] = useState('');
  const [senderState, setSenderState] = useState('');
  const [senderPostalCode, setSenderPostalCode] = useState('');
  const [senderMobilenumber, setSenderMobilenumber] = useState('');
  const [senderemail, setSenderemail] = useState('');

  

  const handleNext = (event) => {
    event.preventDefault();

    if (!OrderID) {
      toast.error('OrderID is required');
      return;
    }
    
    if (!senderName) {
      toast.error('Sender Name is required');
      return;
    }
    
    if (!senderAddress) {
      toast.error('Sender Address is required');
      return;
    }
    
    if (!senderCity) {
      toast.error('Sender City is required');
      return;
    }
    
    if (!senderState) {
      toast.error('Sender State is required');
      return;
    }
    
    if (!senderPostalCode) {
      toast.error('Sender Postal Code is required');
      return;
    }
    
    if (!senderMobilenumber) {
      toast.error('Sender Mobile Number is required');
      return;
    }
    
    if (!senderemail) {
      toast.error('Sender Email is required');
      return;
    }
    

    if (senderPostalCode.length !== 6) {
      toast.error('Postal code must be 6 digits');
      return;
    }

    if (senderMobilenumber.length !== 10) {
      toast.error('Mobile number must be 10 digits');
      return;
    }
    if(OrderID.length !==8){
      toast.error('order id must be 8 digits')
      return;
    }
    
    if (senderPostalCode.length !== 6 || isNaN(senderPostalCode)) {
      toast.error('Postal code must be a 6-digit number');
      return;
    }

    if (senderMobilenumber.length !== 10 || isNaN(senderMobilenumber)) {
      toast.error('Mobile number must be a 10-digit number');
      return;
    }

    if (OrderID.length !== 8 || isNaN(OrderID)) {
      toast.error('Order ID must be an 8-digit number');
      return;
    }
       // Email validation
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(senderemail)) {
         toast.error('Invalid email address');
         return;
       }

    onNext({
      OrderID,
      senderName,
      senderAddress,
      senderCity,
      senderState,
      senderPostalCode,
      senderMobilenumber,
      senderemail
    });
  };
  const handleStateChange = (selectedOption) => {
    setSenderState(selectedOption.value);
  };
  



  return (
    <div className='post-form'>
      <h2>Sender Information</h2>
      <form onSubmit={handleNext}>

        <div className='form-group'>
          <label>OrderID:</label>
          <input type ="text" value={OrderID} onChange={(e)=> setOrderID(e.target.value)} maxLength={8}/>
        </div>

        <div className='form-group'>
          <label>Name:</label>
          <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Address:</label>
          <input type="text" value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} />
        </div>
       <div>
       
       <label> City: </label>
          <input type="text" value={senderCity} onChange={(e) => setSenderCity(e.target.value)} />
          </div>
        <div>
        <label>
          State:</label>
          <Select
              options={indianStates}
              value={indianStates.find((state) => state.value === senderState)}
              onChange={handleStateChange}
            />
          </div>
        <div>
        <label>
          Postal Code: </label>
          <input type="text" value={senderPostalCode} onChange={(e) => setSenderPostalCode(e.target.value)}  maxLength={6}
            />
          </div>
        <div>
        <label>
          Mobile Number: </label>
          <input type="text" value={senderMobilenumber} onChange={(e) => setSenderMobilenumber(e.target.value)} maxLength={10}
            />
       
          </div>
          <div>
        <label>
          Email:</label>
          <input type="text" value={senderemail} onChange={(e) => setSenderemail(e.target.value)} />
        
        </div>
        <div className='th'><button type="submit">Next</button></div>
      </form>
      <ToastContainer />
    </div>
  );
};



const ReceiverInformation = ({ onPrevious, onNext, senderData }) => {
  const [receiverName, setReceiverName] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [receiverCity, setReceiverCity] = useState('');
  const [receiverState, setReceiverState] = useState(null);
  const [receiverPostalCode, setReceiverPostalCode] = useState('');
  const [receiverMobilenumber, setReceiverMobilenumber] = useState('');
  const [receiveremail, setReceiveremail] = useState('');

  const handlePrevious = (event) => {
    event.preventDefault();

    onPrevious();
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (!receiverName) {
      toast.error('Receiver Name is required');
      return;
    }
    
    if (!receiverAddress) {
      toast.error('Receiver Address is required');
      return;
    }
    
    if (!receiverCity) {
      toast.error('Receiver City is required');
      return;
    }
    
    if (!receiverState) {
      toast.error('Receiver State is required');
      return;
    }
    
    if (!receiverPostalCode) {
      toast.error('Receiver Postal Code is required');
      return;
    }
    
    if (!receiverMobilenumber) {
      toast.error('Receiver Mobile Number is required');
      return;
    }
    
    if (!receiveremail) {
      toast.error('Receiver Email is required');
      return;
    }
    

    if (receiverPostalCode.length !== 6) {
      toast.error('Postal code must be 6 digits');
      return;
    }

    if (receiverMobilenumber.length !== 10) {
      toast.error('Mobile number must be 10 digits');
      return;
    }

    if (receiverPostalCode.length !== 6) {
      toast.error('Postal code must be 6 digits');
      return;
    }

    if (receiverMobilenumber.length !== 10 ) {
      toast.error('Mobile number must be 10 digits');
      return;
    }
    
    
    if (receiverPostalCode.length !== 6 || isNaN(receiverPostalCode)) {
      toast.error('Postal code must be a 6-digit number');
      return;
    }

    if (receiverMobilenumber.length !== 10 || isNaN(receiverMobilenumber)) {
      toast.error('Mobile number must be a 10-digit number');
      return;
    }

    // if (OrderID.length !== 8 || isNaN(OrderID)) {
    //   toast.error('Order ID must be an 8-digit number');
    //   return;
    // }
       // Email validation
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(receiveremail)) {
         toast.error('Invalid email address');
         return;
       }

    onNext({
      //  ...senderData,
      receiverName,
      receiverAddress,
      receiverCity,
      receiverState,
      receiverPostalCode,
      receiverMobilenumber,
      receiveremail
    });
  };

  const handleStateChange = (selectedOption) => {
    setReceiverState(selectedOption.value);
  };

  return (
    <div className='post-form'>
      <div className="receiver">
        <h2>Receiver Information</h2>
        <form>
          <div className='form-group'>
          <label>
            Name: </label>
            <input type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
            </div>
            <div className='form-group'>
          <label>
            Address: </label>
            <input type="text" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} />
         </div>
         <div className='form-group'>
          <label>
            City: </label>
            <input type="text" value={receiverCity} onChange={(e) => setReceiverCity(e.target.value)} />
         </div>
         <div className='form-group'>
          <label>
            State:  </label>
            <Select
            className ='select'
              options={indianStates}
              value={indianStates.find((state) => state.value === receiverState)}
              onChange={handleStateChange}
            />
        </div>
        <div className='form-group'>
          <label>
            Postal Code: </label>
            <input type="text" value={receiverPostalCode} onChange={(e) => setReceiverPostalCode(e.target.value)} maxLength={6}
        />
      </div>
      <div className='form-group'>
          <label>
            Mobile Number:  </label>
            <input type="text" value={receiverMobilenumber} onChange={(e) => setReceiverMobilenumber(e.target.value)} maxLength={10}
        />
         </div>
         <div className='form-group'>
          <label>
            Email:  </label>
            <input type="email" value={receiveremail} onChange={(e) => setReceiveremail(e.target.value)} />
            </div>
         <div className='rece'> <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button></div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};


const ItemInformation = ({ onPrevious, onNext,senderData,receiverData}) => {
  const [ItemName, setItemName] = useState('');
  const [ItemQuantity, setItemQuantity] = useState('');
  const [ItemWeight, setItemWeight] = useState('');
  const[ItemType,setItemType] = useState('');
  // const [date, setDate] = useState(null);
  const [location, setlocation] = useState('');
  const [status, setstatus] = useState('');

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivery-in-process', label: 'Delivery in Process' },
    { value: 'on-the-way', label: 'On the Way' },
    { value: 'arriving-today', label: 'Arriving Today' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancel', label: 'Cancel' }
  ];

  const handleStatusChange = (selectedOption) => {
    setstatus(selectedOption.value);
  };

  // const handleDateChange = (selectedDate) => {
  //   setDate(selectedDate);
  // };

  const handlePrevious = (event) => {
    event.preventDefault();
    onPrevious();
  };

  const handleNext = (event) => {
    event.preventDefault();

    if (!ItemName) {
      toast.error('Item Name is required');
      return;
    }
    
    if (!ItemQuantity) {
      toast.error('Item Quantity is required');
      return;
    }
    
    if (!ItemWeight) {
      toast.error('Item Weight is required');
      return;
    }
    
    if (!location) {
      toast.error('Location is required');
      return;
    }
    
    if (!status) {
      toast.error('Status is required');
      return;
    }
    if(!ItemType){
      toast.error('ItemType is required');
    }
    
    onNext({
       ...senderData,
       ...receiverData,
      ItemName,
      ItemQuantity,
      ItemWeight,
      ItemType,
      // date,
      location,
      status,
    });
  };

  return (
    <div className="post-form">
      <div className="item">
        <h2>Item Information</h2>
        <div className='form-group'>
        <label>
          Item Name:</label>
          <input type="text" value={ItemName} onChange={(e) => setItemName(e.target.value)} />
          </div>

          <div className='form-group'>
        <label>
          Quantity:</label>
          <input type="number" value={ItemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
        
        </div>
        <div className='form-group'>
        <label>
          Weight: </label>
          <input type="number" value={ItemWeight} onChange={(e) => setItemWeight(e.target.value)} />
          </div>
          <div>
            <label>Type:</label>
            <input type='text' value={ItemType} onChange={(e)=> setItemType(e.target.value)}/>
          </div>
        {/* <label>
          Date:
          <DatePicker selected={date} onChange={handleDateChange} />
        </label>
        <br /> */}
         <div className='form-group'>
        <label>
          Location: </label>
          <input type="text" value={location} onChange={(e) => setlocation(e.target.value)} />
          </div>
          <div className='form-group'>
        <label>
          Status: </label>
          <Select
            options={statusOptions}
            value={statusOptions.find((option) => option.value === status)}
            onChange={handleStatusChange}
          />
       </div>
        
      <div className='rece'>  <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button></div>
        <ToastContainer/>
      </div>
    </div>
  );
};

const Post = ({ senderData, receiverData, itemData, onBackToForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleBackToForm = () => {
    onBackToForm();
  };

  const handleFormSubmit = async () => {
    setIsLoading(true); // Set loading state to true

    const postData = itemData; // Only include itemData, remove senderData and receiverData
    console.log(postData);
    try {
       const response = await fetch(`${baseURL}/post/createpost`, {
      // const response = await fetch('http://localhost:3000/api/post/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      const data = await response.json();
      console.log('Response:', data);
      // Handle the response from the API
      // Perform any necessary actions after successful submission
      // For example, show a success message or redirect the user
      if (response.ok) {
        toast.success('Your order has been submitted successfully!');
        // Perform any additional actions on successful submission
      } else {
        toast.error('Failed to submit the form. Please try again.');
        // Handle the error in an appropriate way
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
      // Handle any errors that occur during the request
      // Display an error message to the user or handle the error in an appropriate way
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
      setIsSubmitted(true); // Set isSubmitted to true after form submission
    }
  };

  useEffect(() => {
    // Clear the toast messages when the component is unmounted or updated
    toast.dismiss();
  }, []);
  return (
    <div className="container">
    <div className="preview">
      <h2>Preview</h2>
      <table>
        <tbody>
          <tr>
            <th colSpan="2">Sender Information:</th>
          </tr>
          <tr>
            <td>Order ID:</td>
            <td>{senderData.OrderID}</td>
          </tr>
          <tr>
            <td>Sender Name:</td>
            <td>{senderData.senderName}</td>
          </tr>
          <tr>
            <td>Sender Address:</td>
            <td>{senderData.senderAddress}</td>
          </tr>
          <tr>
            <td>Sender City:</td>
            <td>{senderData.senderCity}</td>
          </tr>
          <tr>
            <td>Sender State:</td>
            <td>{senderData.senderState}</td>
          </tr>
          <tr>
            <td>Sender Postal Code:</td>
            <td>{senderData.senderPostalCode}</td>
          </tr>
          <tr>
            <td>Sender Mobile Number:</td>
            <td>{senderData.senderMobilenumber}</td>
          </tr>
          <tr>
            <td>Sender Email:</td>
            <td>{senderData.senderemail}</td>
          </tr>
          <tr>
            <th colSpan="2">Receiver Information:</th>
          </tr>
          <tr>
            <td>Receiver Name:</td>
            <td>{receiverData.receiverName}</td>
          </tr>
          <tr>
            <td>Receiver Address:</td>
            <td>{receiverData.receiverAddress}</td>
          </tr>
          <tr>
            <td>Receiver City:</td>
            <td>{receiverData.receiverCity}</td>
          </tr>
          <tr>
            <td>Receiver State:</td>
            <td>{receiverData.receiverState}</td>
          </tr>
          <tr>
            <td>Receiver Postal Code:</td>
            <td>{receiverData.receiverPostalCode}</td>
          </tr>
          <tr>
            <td>Receiver Mobile Number:</td>
            <td>{receiverData.receiverMobilenumber}</td>
          </tr>
          <tr>
            <td>Receiver Email:</td>
            <td>{receiverData.receiveremail}</td>
          </tr>
          <tr>
            <th colSpan="2">Item Information:</th>
          </tr>
          <tr>
            <td>Item Name:</td>
            <td>{itemData.ItemName}</td>
          </tr>
          <tr>
            <td>Item Quantity:</td>
            <td>{itemData.ItemQuantity}</td>
          </tr>
          <tr>
            <td>Item Weight:</td>
            <td>{itemData.ItemWeight}</td>
          </tr>
          <tr>
            <td>Item Type:</td>
            <td>{itemData.ItemType}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>{itemData.location}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{itemData.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="rece">
      <button onClick={handleBackToForm}>Back to page</button>
      {!isSubmitted && !isLoading && (
        <button onClick={handleFormSubmit}>Submit</button>
      )}
      {isLoading && <p>Loading...</p>}
      <ToastContainer className="toast" />
    </div>
  </div>
  );
};
// 

const ShippingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [senderData, setSenderData] = useState({});
  const [receiverData, setReceiverData] = useState({});
  const [itemData, setItemData] = useState({});

  const handleSenderNext = (data) => {
    setSenderData(data);
    setCurrentStep(2);
  };

  const handleReceiverPrevious = () => {
    setCurrentStep(1);
  };

  const handleReceiverNext = (data) => {
    setReceiverData(data);
    setCurrentStep(3);
  };

  const handleItemPrevious = () => {
    setCurrentStep(2);
  };

  const handleItemNext = (data) => {
    setItemData(data);
    setCurrentStep(4);
  };

  const handleBackToForm = () => {
    setCurrentStep(1);
    setShowPreview(false);
  };

  const handleSubmit = () => {
    setShowPreview(true);
  };

  return (
    <div>
      {currentStep === 1 && <SenderInformation onNext={handleSenderNext} />}
      {currentStep === 2 && (
        <ReceiverInformation
          onPrevious={handleReceiverPrevious}
          onNext={handleReceiverNext}
          senderData={senderData}
        />
      )}
      {currentStep === 3 && (
        <ItemInformation
          onPrevious={handleItemPrevious}
          onNext={handleItemNext}
          senderData={senderData}
          receiverData={receiverData}
        />
      )}
      {currentStep === 4 && (
        <Post
          senderData={senderData}
          receiverData={receiverData}
          itemData={itemData}
          onBackToForm={handleBackToForm}
          onSubmit={handleSubmit}
        />
      )}
      {showPreview && (
        <div className="container">
          {/* <h2>Shipping Form</h2>
          <h3>Thank you for submitting the form!</h3>
          <button onClick={handleBackToForm}>Go Back</button> */}
        </div>
      )}
    </div>
  );
};

export default ShippingForm;
