import React from "react";
import { useEffect, useState } from "react";
import './style.css'
import '../../Styles/utilities.css'
import '../../Styles/colors.css'
// import Search from "../../Common/search";
import ChatCard from "../../Components/Chat_card";
import InputMessage from "../../Components/Input-message";
import ChatSection from "../../Components/Chat-section";
import axios from "axios";



const ChatPage = ()=>{
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState()
    const [inputValue, setInputValue]=useState('')


  const handleSearchChange = (e)=>{
      setInputValue(e.target.value)
  
  }
    const fetchUsers = async()=>{
        try{
            const {data} = await axios('http://127.0.0.1:8000/api/users')
            setUsers(data.user)
            // console.log(data)
        }catch(error){
            console.log(error)
        }
        
    }

    useEffect(()=>{
        fetchUsers()
    },[])
  const searchName = (value)=>{
    users.find((user) => user.includes(value));
    setUsers(users)
  }
    useEffect(()=>{
        searchName(val)
    
    },[val])
    console.log(users)
    console.log(typeof(users))

   
    const handleSendMessage = (e)=>{
        setMessage(e)
        console.log(e)
    }

    const handleSendClick = ()=>{}
    return (
        <div className="page flex">
            <div className="left-side flex column  ">
            <div className="search-container">
      <input
      type="text"
      placeholder="Search for.."
      value={inputValue}
      onChange={handleSearchChange} />
    </div>
                <div className="user-list">
                    {users.map((user, index) => (
                        <ChatCard key={index} name={user.name} />
                    ))}
                </div>
            </div>            
            <div className="right-side flex column ">
                <ChatCard />
                <ChatSection/>
                <InputMessage value={message}
                onMessageChange={handleSendMessage}
                onSendClick={handleSendClick}/>
            </div>    
        </div>
    )
}

export default ChatPage