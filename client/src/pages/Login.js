import React,{useEffect, useState} from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Layout/Spinner'
import './Login.css'
import Footer from '../components/Layout/Footer'
import Header from './Header'

const Login = () => {

    const [loading,setLoading]=useState(false);
    const navigate=useNavigate()
    //form submit
    const submitHandler =async(values)=>{
        // console.log(values);
        try{
            setLoading(true)
             const {data}=  await axios.post('/users/login',values)
             setLoading(false) 
             message.success('Logged in succesfully')
             localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
             navigate('/dashboard')
        }
        catch(error){
            setLoading(false)
                message.error('something went wrong')
        }


};
useEffect(()=>{
    if(localStorage.getItem('user')){
            navigate('/dashboard')
    }
},[navigate]);


  return (
    <div>
      
      <div className='header'>
        <Header/>
      </div>
      <section className='registration'>
      <div className='login-page'>
        {loading && <Spinner></Spinner>}
        <Form className='form' layout="vertical" onFinish={submitHandler}>
        <h1 className='login-heading'>Login</h1>
        {/* <Form.Item label='Name' name="name">
          <Input>
          </Input>
        </Form.Item> */}
        <Form.Item className='label' label='Email' name="email">
          <Input type="email">
          </Input>
        </Form.Item>
        <Form.Item className='label' label='Password' name="password">
          <Input type="password">
          </Input>
        </Form.Item>

        <div className="link-text d-flex justify-content-between">
          <Link to='/register' className='link'>Not a user? Click here to sign up</Link>
          &nbsp;&nbsp;
          <br></br>
          <button id='register-button' className="btn btn-primary">Login</button>
        </div>
        </Form>
    </div>
      </section>

      <section className='reg-photo'>
        <div>

        </div>
      </section>
      <div>
        <Footer/>
      </div>

    </div>
  )
}

export default Login
