import React from 'react';
import './style.css';

const Message = ({ text, user }) => {
  return (
    <div className={`message ${user}`}>
      <span className="message-user">{user}:</span>
      <span className="message-text">{text}</span>
    </div>
  );
}

export default Message;
