import React from "react";
import { useState } from "react";
import './style.css'
import { IoMdSend } from "react-icons/io";
import ChatSection from "../Chat-section";

const InputMessage = ({ value, onMessageChange})=>{

    return(
        
        <div className="input-container flex">
            <input type="text" 
            placeholder="Type your message..."
            value={value}
            onChange={onMessageChange}/>
            
            <IoMdSend className="send-icon" 
            onClick={''}/>

        </div>
    )
}


export default InputMessage
