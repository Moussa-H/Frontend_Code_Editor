import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import UserRecord from '../../Components/User_record';
import {read, utils, writeFile} from 'xlsx';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [usersFilter, setUsersFilter] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [rows, setRows] = useState([])

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
            const token = localStorage.getItem('token')
            const {data} = await axios('http://127.0.0.1:8000/api/users',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
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
        const files = e.target.files
        if(files.length){
            const file = files[0]
            const reader = new FileReader()
            reader.onload = e => {
                const wb = read(e.target.result)
                const sheets = wb.SheetNames
                if(sheets.length){
                    const row = utils.sheet_to_json(wb.Sheets[sheets[0]])
                    setRows(row)                
                }
            }
            reader.readAsArrayBuffer(file)
        }
    };

    const handleImport = async () => {
        console.log(rows)
        const token = localStorage.getItem('token');
        const usersArray = Object.values(rows);
        console.log(typeof(usersArray))
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users', {users: rows}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            console.log(response)
            fetchUsers(); // Refresh the users list after import
        } catch (error) {
            console.error('Error importing users:', error);
            if (error.response && error.response.data) {
                console.error('Server response:', error.response.data);
            }
        }
    };

        const handleRemoveUser = async (user) => {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`http://127.0.0.1:8000/api/users/${user.id} `,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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
                            <input type="file" 
                            className="form-control-file"
                            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                            onChange={handleFileChange} />
                        </div>
                        <button type="submit" className=" " onClick={handleImport} >import</button>
                    </div>
                    <div className="list-group">
                        {usersFilter.map(user => (
                            <UserRecord user={user} onRemove={handleRemoveUser}/>                   
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
