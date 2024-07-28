import React from "react";
import './style.css'
import { IoMdSend } from "react-icons/io";
import ChatSection from "../Chat-section";

const InputMessage = ()=>{
    return(
        <div className="input-container flex">
            <input type="text" placeholder="Type your message..." />
            
            <IoMdSend className="send-icon" />

        </div>
    )
}


export default InputMessage
