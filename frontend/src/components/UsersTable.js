import React from 'react';
import './MessageTable.css';

const UsersTable = ({users}) => {
  return (
    <table className="message-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile Number</th>
          <th>Message</th>
          <th>Last Login</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          // Find the corresponding message for this login time
        

          return (
            <tr key={index}>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.MobileNumber}</td>
              <td>{user.lastMessage}</td>
              <td>{user.lastLoginTime}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default UsersTable