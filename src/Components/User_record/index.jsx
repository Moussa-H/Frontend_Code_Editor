
import React from 'react';
import './style.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

const UserRecord = ({ user, onRemove, onUpdate }) => {
    
    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState(user);

    const handleUserEdit = ()=>{
        console.log('inside')
        setIsEditing(true);
        }

    const handleCancel =()=>{
        console.log('cancel')
        setIsEditing(false);
        setEditedUser(user);
    }

    const handleInputChange = (e)=>{
        console.log('user change')
        const {name , value} = e.target
        setEditedUser({ ...editedUser, [name]: value })
        console.log(e.target.value)
    }

    const fetchUser = async (user)=>{
        
        try{
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://127.0.0.1:8000/api/users/${user.id}`, editedUser,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }
    const handleSubmit = (e)=>{
        console.log('submit')
        e.preventDefault();
        fetchUser(user)
        setIsEditing(false)
        onUpdate()
    }

    return (
        <div className="user-record">
            {!isEditing?(<>            
            <div className="user-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="user-actions">
                <button className="btn btn-remove" onClick={() => onRemove(user)}>Remove</button>
                <button className="btn btn-edit" onClick={handleUserEdit}>Change</button>
            </div></>):(
                <form className="edit-form" >
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
                    <button type="submit" className="" onClick={handleSubmit}>Save</button>
                    <button type="button" className="" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            ) }
        </div>
    );
};

export default UserRecord;
