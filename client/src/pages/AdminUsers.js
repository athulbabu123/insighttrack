import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { message } from "antd";
import Transactions from './Transactions';
import { useNavigate } from 'react-router-dom';
import AdminLayoutNavbar from './AdminLayoutNavbar';
import './AdminUsers.css'
import Footer from '../components/Layout/Footer';

const AdminUsers = () => {

    const[users,setUsers]=useState([]);
    const[transactions,setTransactions]=useState([]);

    const navigate = useNavigate();

    const getAllUserData=async()=>{
        try {
            axios.get('http://localhost:8080/api/v1/admin/users')
            .then((res)=>{
                console.log(res.data);
                setUsers(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:8080/api/v1/admin/users/delete/${id}`)
        .then((res)=>{
            alert(res.data.message);
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    

    const viewTransactions = async(id)=>{
        console.log(id);
        try {
            // Fetch transactions
            const transactionsResponse = await axios.get(`http://localhost:8080/api/v1/admin/users/view/${id}`);
            const transactions = transactionsResponse.data;
            console.log(transactionsResponse.data);

            if(transactions.length===0){
                console.log(transactionsResponse.data);
            }
                // Fetch User
                const userResponse = await axios.get(`http://localhost:8080/api/v1/admin/users/data/${id}`);
                const user = userResponse.data;
                console.log(userResponse.message);
                navigate('/admin/transactions', { state: { transactions, user } });
            
            
        } catch (error) {
            console.error('Error fetching data:', error);

            if (error.response) {
                if (error.response.status === 404) {
                    // Specific handling for 404 error
                    alert('No transactions found');
                } else {
                    // General error handling
                    alert(`Error: ${error.response.status} - ${error.response.statusText}`);
                }
            } else if (error.request) {
                // Request was made but no response received
                alert('Error: No response received from server');
            } else {
                // Something else happened in setting up the request
                alert('Error: ' + error.message);
            }
        }
    
        
    }
    
    
    useEffect(()=>{
        getAllUserData();
    },[])


  return (
    <>
    <div>
        <AdminLayoutNavbar/>
    </div>
    <section>
        <div className='admin-users-title'>
            <h1 className='user-heading'>Users Data</h1>
        </div>
    
    <div className='data-div-users'>
        <table id='users-table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>View</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {users.map((curUser,index)=>{
        return <tr key={index}>
            <td>{curUser.name}</td>
            <td>{curUser.email}</td>
            <td><button className='btn' onClick={()=>viewTransactions(curUser._id)}>View</button></td>
            <td><button className='btn' onClick={()=>deleteUser(curUser._id)}>Delete</button></td>
        </tr>
    })}
            </tbody>
        </table>
    
    </div>
    </section>
    <div>
        <Footer/>
    </div>
    </>
  )
}

export default AdminUsers
