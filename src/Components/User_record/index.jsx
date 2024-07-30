
import React from 'react';
import './style.css'
import { useState, useEffect } from 'react';

const UserRecord = ({ user, onRemove, onChange }) => {
    
    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState(user);

    const handleUserEdit = ()=>{
        console.log('inside')
        setIsEditing(true);
        }

    const handleCancel =()=>{
        console.log('cancel')
    }

    const handleInputChange = ()=>{
        console.log('user change')
    }

    const handleSubmit = ()=>{
        console.log('submit')
    }

    return (
        <div className="user-record">
            {!isEditing?(<>            <div className="user-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="user-actions">
                <button className="btn btn-remove" onClick={() => onRemove(user)}>Remove</button>
                <button className="btn btn-edit" onClick={handleUserEdit}>Change</button>
            </div></>):(
                <form className="edit-form" onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} />
                    </label>
                </div>
                <div className="form-actions">
                    <button type="submit" className="">Save</button>
                    <button type="button" className="" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            ) }
        </div>
    );
};

export default UserRecord;
