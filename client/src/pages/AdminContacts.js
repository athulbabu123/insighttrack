import React, { useEffect, useState } from 'react';
import AdminLayoutNavbar from './AdminLayoutNavbar';
import './AdminContacts.css'
import axios from 'axios';
import Footer from '../components/Layout/Footer';

const AdminContacts = () => {

    const[users,setUsers]=useState([]);

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

useEffect(()=>{
  getAllUserData();
},[])



  return (
    <div>
      

      <div className='contact-header'>
      <h1 className='contact-heading'>User Contact Information</h1>
    </div>

    <div>
      <AdminLayoutNavbar/>
    </div>

    <div className='data-div-contacts'>
        <table id='contacts-table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {users.map((curUser,index)=>{
        return <tr key={index}>
            <td>{curUser.name}</td>
            <td>{curUser.email}</td>
        </tr>
    })}
            </tbody>
        </table>
    
    </div>

    <div>
        <Footer/>
    </div>

    
    </div>
  )
}

export default AdminContacts
