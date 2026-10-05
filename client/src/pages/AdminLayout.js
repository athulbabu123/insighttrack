import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import AdminLayoutNavbar from './AdminLayoutNavbar';
import Footer from '../components/Layout/Footer';
import { Card, Statistic } from 'antd';
import {ContactsOutlined, UserOutlined} from '@ant-design/icons'
import './AdminLayout.css'

const AdminLayout = () => {

    const navigate=useNavigate();

  const userProfile=(
    <div className='user-outlined'><UserOutlined/></div>
  )

  const contactProfile=(
    <div className='user-outlined'><ContactsOutlined /></div>
  )

  const viewContacts=()=>{
    navigate('/admin/contacts');
  }

  const viewUsers=()=>{
    navigate('/admin/users');
  }


  return (
    <>
   <div>
    <div className='container'>
      <AdminLayoutNavbar/>
    </div>

    <div className='card-div'>
    <Card className='card-class'
      title="Users Data"
      extra={userProfile}
      style={{
        width: 310,
      }}
    >
      <p className='user-p'>Admin can view users by clicking the button below </p>
      <p className='user-btn'>
          <button className='btn' onClick={()=>{viewUsers()}}>Users</button>
      </p>
    </Card>
    </div>

    <div className='card-div-2'>
    <Card className='card-class-2'
      title='Users Contact'
      extra={contactProfile}
      style={{
        width: 310,
      }}
    >
      <p className='contacts-p'>Admin can view users contact details by clicking the button below</p>
      <p className='contacts-btn'>
          <button className='btn' onClick={()=>{viewContacts()}}>Contacts</button>
      </p>
    </Card>
    </div>

    

    <div>
      <Footer/>
    </div>

    </div>
    <Outlet/>
    </>
  )
}

export default AdminLayout
