
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
                <button className="btn btn-danger" onClick={() => onRemove()}>Remove</button>
                <button className="btn btn-primary" onClick={() => onChange()}>Change</button>
            </div>
        </div>
    );
};

export default UserRecord;
