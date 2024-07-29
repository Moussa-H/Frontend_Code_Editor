import React from "react";
import "../Styles/utilities.css";

const ChatCard = ({ name, onClick }) => {
  return (
    <div className="card-container flex center" onClick={onClick}>
      <div className="profile-image">{name.charAt(0).toUpperCase()}</div>
      <div className="info-container flex column">
        <span className="name-tag">{name}</span>
        <span className="date-tage">{""}</span>
      </div>
    </div>
  );
};

export default ChatCard;
