import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import UserRecord from '../../Components/User_record';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [file, setFile] = useState(null);

    const fetchUsers = async()=>{
        try{
            const {data} = await axios('http://127.0.0.1:8000/api/users')
            setUsers(data.user)
            // console.log(data)
        }catch(error){
            console.log(error)
        }
        
    }
    useEffect(()=>{
        fetchUsers()
    },[])


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport =  () => { };

    const handleEditUser =()=>{console.log('user edited')}
    const handleRemoveUser = ()=>{console.log('user removed')}

    return (
        <div className="panel-container">
            <div className="card">
                <div className="card-header">
                    <h1>Admin Panel</h1>
                </div>
                <div className="card-body">
                    <div className="form-inline">
                        <div className="form-group mb-2">
                            <input type="file" className="form-control-file" onChange={handleFileChange} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Import Users</button>
                    </div>
                    <div className="list-group">
                        {users.map(user => (
                            <UserRecord user={user} onChange={handleEditUser} onRemove={handleRemoveUser}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
