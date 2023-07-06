import React, { useState, useEffect } from 'react';
import './userlist.css';
import Pagination from '../pagination/Pagination';
import { Paginate } from '../pagination/Paginate';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const baseURL = sessionStorage.getItem("apipathurl")

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate(); // Use useNavigate instead of withRouter


  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedUser = Paginate(userList, currentPage, pageSize);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
       const response = await fetch(`http://localhost:3000/api/user/getusers`);
      //  const response = await fetch(`${baseURL}/user/getusers`);
      const data = await response.json();
  
      if (response.ok) {
        const reversedUserList = data.userList.reverse(); // Reverse the user list array
        setUserList(reversedUserList);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (username) => {
    try {
      // await fetch(`{baseURL}/user/${username}`, {
      await fetch(`http://localhost:3000/api/user/${username}`, {
        method: 'DELETE',
      });
      setTimeout(fetchUserList, 1000); // Fetch the updated user list after a delay of 1 second (1000 milliseconds)
    } catch (error) {
      console.error(error);
    }
  };
  

  const updateUser = (username) => {
    console.log(`Update user with ID: ${username}`);
    navigate('/update'); // Use navigate to navigate to the /register route
  };

  const resetPassword = (username) => {
    console.log(`Reset password for user with ID: ${username}`);
    navigate('/reset'); // Use navigate to navigate to the /register route
  };

  return (
    <div className="user-list-table">
      <h1>User List</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>UserID</th>
                {/* <th>Username</th> */}
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUser.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  {/* <td>{user.username}</td> */}
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => deleteUser(user.username)}>Delete</button>
                    <button onClick={() => updateUser(user.username)}>Update</button>
                    <button onClick={() => resetPassword(user.username)}>Reset Password</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            items={userList.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default UserList;
