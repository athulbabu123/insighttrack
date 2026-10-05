import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import {message} from 'antd'
import './DashboardNavbar.css'

const DashboardNavbar = () => {

    const navigate=useNavigate();

    const logoutHandler=()=>{
        localStorage.removeItem('user')
        message.success('Logged out successfully')
        navigate('/login')
       }

       const homeNavigator=()=>{
        localStorage.removeItem('user')
        message.success('Logged out successfully')
        navigate('/')
       }

  return (
    <div>
      
      <nav className="navbar navbar-expand-lg fixed-top">
  <div className="container">
    <button className='homeButton' onClick={()=>homeNavigator()}>
    <a className="navbar-brand me-auto">InsightTrack</a>
    </button>
    
    
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>

      <div className="navbar-item offcanvas-body">
        <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
          <li className="nav-item">
            <h1 className='user-dashboard'>User Dasboard</h1>
          </li>
        </ul>
        </div>
      
    </div>

   <button className='logout-button' onClick={logoutHandler}>Logout</button>
   
   <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <div className="navbar-toggler-icon" />
      
      
    </button>

    
   
  </div>
</nav>

    </div>
  )
}

export default DashboardNavbar
