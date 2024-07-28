import React from "react";
import './style.css'
import Message from "../Message";

const ChatSection = ()=>{
    return(
        <div className="chat-section-container flex column">
            <Message text={'hello'} user={'user1'}/>
            <Message text={'hello'} user={'user2'}/>

        </div>
    )
}

export default ChatSection