import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import Avatar from "@mui/material/Avatar";
//import  Header  from "../Common/header";

export default function ChatMessages({ selectedDeveloper }) {
  const [messages, setMessages] = useState([]);
  const [messagesend, setMessageSend] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };
  useEffect(() => {
    console.log(
      "useEffect triggered with selectedDeveloper:",
      selectedDeveloper
    );
    if (selectedDeveloper && selectedDeveloper.id) {
      console.log("Calling displayMessages with:", selectedDeveloper);
      displayMessages(selectedDeveloper);
    } else {
      console.log("Developer or receiver_id is missing");
    }
  }, [selectedDeveloper]);

  const sendmessageapi = async (messagesend) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/messages/`,
        {
          receiver_id: selectedDeveloper.id,
          message: messagesend,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API response:", response.data);
      setMessages((prevMessages) => [...prevMessages, response.data.message]);
      setMessageSend("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };
  const displayMessages = async (selectedDeveloper) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/messages/between/${selectedDeveloper.id}`,
        {
          params: {
            receiver_id: selectedDeveloper.id,
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
    }
  };

  const handlechange = (e) => {
    setMessageSend(e.target.value);
    console.log("send massege", messagesend);
  };
  const handleClickSend = () => {
    console.log("messagesend display", messagesend);
    if (messagesend) {
      console.log("handleClickSend is run");
      sendmessageapi(messagesend);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="chatbox">
        <div className="modal-dialog-scrollable">
          <div className="modal-content">
            <div className="msg-head">
              <div className="row">
                <div className="col-8">
                  <div className="d-flex align-items-center">
                    <span className="chat-icon">
                      {selectedDeveloper.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="flex-grow-1 ms-3">
                      <h3>{selectedDeveloper.name}</h3>
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
                        message.sender_id === selectedDeveloper.id
                          ? "sender"
                          : "repaly"
                      }
                    >
                      <p>{message.message}</p>
                      <span className="time">{message.time}</span>
                    </li>
                  ))}
                  <div ref={messagesEndRef} />
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
                  value={messagesend}
                  onChange={handlechange}
                />
                <button
                  className="send-massege"
                  type="button"
                  onClick={handleClickSend}
                >
                  <span>Send</span>
                  <IoMdSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
