import React from "react";

import { IoMdSend } from "react-icons/io";
import Avatar from "@mui/material/Avatar";
export default function ChatMessages({ developer }) {
  return (
    <div>
      <div className="card-container flex center">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="info-container flex column">
          <span className="name-tag">{developer}</span>
          <span className="date-tage">dd-yy</span>
        </div>
      </div>
      <div className="input-masseges">
        <input
          type="text"
          placeholder="Type your message..."
          value={""}
          onChange={""}
        />

        <IoMdSend className="send-icon" onClick={""} />
      </div>
    </div>
  );
}
