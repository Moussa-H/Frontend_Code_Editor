import React, { useEffect, useState } from "react";
import "../Styles/Chat.css";
import "../Styles/utilities.css";
import "../Styles/colors.css";

import DeveloperItem from "../Components/DeveloperItem";
import ChatMessages from "../Components/ChatMessages";
import axios from "axios";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/users");
      setUsers(data.user);
      setFilteredUsers(data.user);
      console.log("users", data.user);
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const searchName = (value) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    searchName(inputValue);
  }, [inputValue]);

  const handleDeveloperClick = (user) => {
    setSelectedDeveloper(user);
    console.log("Developer selected", user);
  };

  return (
    <div className="page-flex">
      <div className="left-side flex column">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for.."
            value={inputValue}
            onChange={handleSearchChange}
          />
        </div>
        <div className="user-list">
          {filteredUsers.map((user, index) => (
            <DeveloperItem
              key={index}
              name={user.name}
              onClick={() => handleDeveloperClick(user)}
            />
          ))}
        </div>
      </div>
      <div className="right-side flex column">
        {selectedDeveloper && (
          <ChatMessages developer={selectedDeveloper} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
