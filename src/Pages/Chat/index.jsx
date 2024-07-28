import React from "react";
import './style.css'
import '../../Styles/utilities.css'
import '../../Styles/colors.css'
import Search from "../../Common/search";
import ChatCard from "../../Components/Chat_card";
import InputMessage from "../../Components/Input-message";
import ChatSection from "../../Components/Chat-section";



const ChatPage = ()=>{

    return (
        <div className="page flex">
            <div className="left-side flex column  ">
                <Search />
                <ChatCard />
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