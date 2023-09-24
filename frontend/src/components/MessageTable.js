import React from 'react';
import './MessageTable.css';
const MessageTable = ({ timeOfLogin, sessionDurations, messages }) => {
  return (
    <table className="message-table">
      <thead>
        <tr>
          <th>Time of Login</th>
          <th>Session Duration</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {timeOfLogin.map((loginTime, index) => {
          // Find the corresponding message for this login time
          const correspondingMessage = messages.find(
            (message) => message.timeOfLogin === loginTime.loginTime
          );

          return (
            <tr key={index}>
              <td>{loginTime.loginTime}</td>
              <td>{loginTime.sessionDuration / 1000}sec</td>
              <td>{correspondingMessage ? correspondingMessage.Message : '--'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MessageTable;
