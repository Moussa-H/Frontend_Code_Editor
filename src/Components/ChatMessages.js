import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import Avatar from "@mui/material/Avatar";

export default function ChatMessages({ developer }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered");
    if (developer && developer.receiver_id) {
      console.log("Calling displayMessages with:", developer);
      displayMessages(developer);
    } else {
      console.log("Developer or receiver_id is missing");
    }
  }, [developer]);

  const displayMessages = async (developer) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/messages/between/${developer.receiver_id}`,
        {
          params: {
            receiver_id: developer.receiver_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API response:", response.data);
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  return (
    <>
      {developer ? (
        <div className="chatbox">
          <div className="modal-dialog-scrollable">
            <div className="modal-content">
              <div className="msg-head">
                <div className="row">
                  <div className="col-8">
                    <div className="d-flex align-items-center">
                      <span className="chat-icon">
                        <Avatar>
                          {developer.name.charAt(0).toUpperCase()}
                        </Avatar>
                      </span>
                      <div className="flex-grow-1 ms-3">
                        <h3>{developer.name}</h3>
                        <p>Front end developer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-body">
                <div className="msg-body">
                  <ul>
                    {messages.map((message, index) => (
                      <li
                        key={index}
                        className={
                          message.sender_id === developer.receiver_id
                            ? "repaly"
                            : "sender"
                        }
                      >
                        <p>{message.message}</p>
                        <span className="time">{message.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="send-box">
                <form action="">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="message…"
                    placeholder="Write message…"
                  />
                  <button type="button">
                    <IoMdSend />
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>No selected developer</h1>
      )}
    </>
  );
}
