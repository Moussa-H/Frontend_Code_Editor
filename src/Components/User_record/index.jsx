
import React from 'react';
import './style.css'

const UserRecord = ({ user, onRemove, onChange }) => {
    return (
        <div className="user-record">
            <div className="user-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="user-actions">
                <button className="btn btn-remove" onClick={() => onRemove(user)}>Remove</button>
                <button className="btn btn-edit" onClick={() => onChange()}>Change</button>
            </div>
        </div>
    );
};

export default UserRecord;
