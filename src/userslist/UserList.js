import React, { useState, useEffect } from 'react';
import './userlist.css';
import Pagination from '../pagination/Pagination';
import { Paginate } from '../pagination/Paginate';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedUser = Paginate(userList, currentPage, pageSize);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/getusers');
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
  

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'DELETE',
      });
      fetchUserList(); // Fetch the updated user list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-list">
      <h1>User List</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUser.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
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
     <div className='Role'>
     <h4> Important Note:</h4>
       <ul>
        <li> When Role is 1   , means "Admin" </li>
        <li> When Role is 2   , means "DeliveryPartner" </li>
       </ul>
     </div>
        </>
      )}
    </div>
   
  );
};

export default UserList;
