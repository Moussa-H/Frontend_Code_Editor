import React from "react";
import { useEffect, useState } from "react";
import './style.css'
import '../../Styles/utilities.css'
import '../../Styles/colors.css'
import Search from "../../Common/search";
import ChatCard from "../../Components/Chat_card";
import InputMessage from "../../Components/Input-message";
import ChatSection from "../../Components/Chat-section";
import axios from "axios";



const ChatPage = ()=>{
    const [users, setUsers] = useState([])
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
    console.log(users)
    console.log(typeof(users))
    return (
        <div className="page flex">
            <div className="left-side flex column  ">
                <Search />
                <div className="user-list">
                    {Array.isArray(users) && users.map((user, index) => (
                        <ChatCard key={index} name={user.name} />
                    ))}
                </div>
            </div>            
            <div className="right-side flex column ">
                <ChatCard />
                <ChatSection/>
                <InputMessage/>
            </div>    
        </div>
    )
}

export default ChatPage