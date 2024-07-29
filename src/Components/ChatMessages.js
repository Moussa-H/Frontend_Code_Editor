import React from "react";

import { IoMdSend } from "react-icons/io";
import Avatar from "@mui/material/Avatar";
import { IoChatbubblesOutline } from "react-icons/io5";
export default function ChatMessages({ developer }) {
  return (
    <>
      {developer && (
        <div class="chatbox">
          <div class="modal-dialog-scrollable">
            <div class="modal-content">
              <div class="msg-head">
                <div class="row">
                  <div class="col-8">
                    <div class="d-flex align-items-center">
                      <span class="chat-icon">
                        <div className="profile-image"></div>
                      </span>
                      <div className="profile-image">
                        {developer.name.charAt(0).toUpperCase()}
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h3> {developer.name}</h3>
                        <p>Front end developer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-body">
                <div class="msg-body">
                  <ul>
                    <li class="sender">
                      <p> Hey, Are you there? </p>
                      <span class="time">10:06 am</span>
                    </li>
                    <li class="sender">
                      <p> Hey, Are you there? </p>
                      <span class="time">10:16 am</span>
                    </li>
                    <li class="repaly">
                      <p>yes!</p>
                      <span class="time">10:20 am</span>
                    </li>
                    <li class="sender">
                      <p> Hey, Are you there? </p>
                      <span class="time">10:26 am</span>
                    </li>
                    <li class="sender">
                      <p> Hey, Are you there? </p>
                      <span class="time">10:32 am</span>
                    </li>
                    <li class="repaly">
                      <p>How are you?</p>
                      <span class="time">10:35 am</span>
                    </li>

                    <li class="repaly">
                      <p> yes, tell me</p>
                      <span class="time">10:36 am</span>
                    </li>
                    <li class="repaly">
                      <p>yes... on it</p>
                      <span class="time">junt now</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="send-box">
                <form action="">
                  <input
                    type="text"
                    class="form-control"
                    aria-label="message…"
                    placeholder="Write message…"
                  />

                  <button type="button">
                    <i class="fa fa-paper-plane" aria-hidden="true"></i> Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
