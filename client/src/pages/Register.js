import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Layout/Spinner'
import './Register.css'
import Footer from '../components/Layout/Footer'
import Header from './Header'

const Register = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    //form submit
    const submitHandler = async (values) => {
      // console.log(values);
      try {
        setLoading(true);
        await axios.post('/users/register', values)
        message.success('Registered successfully')
        setLoading(false);
        navigate('/login')
      }
      catch (error) {
        setLoading(false);
        message.error('invalid username or password');
      }
  
    };
  
  
    //prevent login user
    useEffect(() => {
      if (localStorage.getItem('user')) {
        navigate('/')
      }
    }, [navigate]);


  return (
    <div>
      <div className='header'>
        <Header />
      </div>
      <div className='registration'>
        <div className='register-page'>
          {loading && <Spinner/>}
          <Form className='form' layout="vertical" onFinish={submitHandler}>
            <h1 className='register-heading'>Sign up</h1>
            <Form.Item className='register-label' label='Name' name="name">
              <Input>
              </Input>
            </Form.Item>
            <Form.Item className='register-label' label='Email' name="email">
              <Input type="email">
              </Input>
            </Form.Item>
            <Form.Item className='register-label' label='Password' name="password">
              <Input type="password">
              </Input>
            </Form.Item>


            <div className="link-text d-flex justify-content-between">
              <Link to='/login' className='link'>Already signed up? Click here to Login</Link>
              &nbsp;
              <br></br>
              <button id='register-button' className="btn btn-primary">Sign up</button>
            </div>

          </Form>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Register
