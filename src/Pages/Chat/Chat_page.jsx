import React from "react";
import './style.css'
import '../../Styles/utilities.css'
import '../../Styles/colors.css'
import Search from "../../Common/search";
import ChatCard from "../../Components/chat_card";



const ChatPage = ()=>{

    return (
        <div className="page flex">
            <div className="left-side flex column  ">
                <Search className='search-container'/>
                <ChatCard className='card-container'/>
            </div>
            <div className="right-side flex secondary-bg">
                
            </div>    
        </div>
    )
}

export default ChatPage