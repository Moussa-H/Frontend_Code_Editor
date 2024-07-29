import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import UserRecord from '../../Components/User_record';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [usersFilter, setUsersFilter] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [file, setFile] = useState(null);

    const handleSearchChange = (e)=>{
        setInputValue(e.target.value)
        console.log(inputValue)
    }

    const searchUser = (value)=>{
        const filter = users.filter((user)=> user.name.toLowerCase().includes(value.toLowerCase()))
        setUsersFilter(filter)
    }

    useEffect(()=>{
        searchUser(inputValue)
    },[inputValue])

    const fetchUsers = async()=>{
        try{
            const {data} = await axios('http://127.0.0.1:8000/api/users')
            setUsers(data.user)
            setUsersFilter(data.user)
            console.log(data.user)
        }catch(error){
            console.log(error)
        }
        
    }
    useEffect(()=>{
        fetchUsers()
    },[])


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(file)
    };

    const handleImport =  () => { };

    const handleEditUser =()=>{console.log('user edited')}

        const handleRemoveUser = async (user) => {
        try {
            await axios(`http://127.0.0.1:8000/api/users/${user.id}`);
            setUsers(users.filter((u) => u.id !== user.id));
            console.log(`user with ${user.id} and ${user.name} is deleted`)
        
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };
    return (
        <div className="panel-container">
            <div className="card">
                <div className="card-header">
                    <h1>Admin Panel</h1>
                </div>
                <input
                    type="text"
                    placeholder="Search for.."
                    value={inputValue}
                    onChange={handleSearchChange}
                />
                <div className="card-body">
                    <div className="form-inline">
                        <div className="form-group mb-2">
                            <input type="file" className="form-control-file" onChange={handleFileChange} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Import Users</button>
                    </div>
                    <div className="list-group">
                        {usersFilter.map(user => (
                            <UserRecord user={user} onChange={handleEditUser} onRemove={handleRemoveUser}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
