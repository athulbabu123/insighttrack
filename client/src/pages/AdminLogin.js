import React from 'react'
import {useEffect, useState} from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate} from 'react-router-dom'
import Spinner from '../components/Layout/Spinner'
import Header from './Header'
import Footer from '../components/Layout/Footer'
import './AdminLogin.css'

const AdminLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Dummy check for admin credentials
        if (username === 'admin@123' && password === 'admin1234') {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('isAdmin', 'true');
            message.success('Logged in successfully')
            navigate('/admin/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };




    // const [formData, setFormData] = useState({
    //     username: '',
    //     password: ''
    //   });
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate()

    // const submitHandler = (e) => {
    //     console.log(e.target.value);
    //     setFormData(e.target.value);
    //     if(formData.username==='admin@123' && formData.password==='admin1234'){
    //       navigate('/admin')
    //     }else {
    //       alert('Invalid credentials');
    //   }
        
    //   };

      
    //form submit
//     const submitHandler =async(values)=>{
//         // console.log(values);
//         try{
//             setLoading(true)
//              const {data}=  await axios.post('/users/login',values)
//              setLoading(false) 
//              message.success('login successful')
//              localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
//              navigate('/dashboard')
//         }
//         catch(error){
//             setLoading(false)
//                 message.error('something went wrong')
//         }


// };

// useEffect(()=>{
//     if(localStorage.getItem('user')){
//             navigate('/dashboard')
//     }
// },[navigate]);


  return (
    <div>
      

      <div className='header'>
        <Header/>
      </div>
      <div className='admin-login-page'>
        {loading && <Spinner></Spinner>}
        <Form className='form' layout="vertical">
        {/* onFinish={submitHandler} */}
        <h1 id='admin-heading'>Admin Login</h1>
        {/* <Form.Item label='Name' name="name">
          <Input>
          </Input>
        </Form.Item> */}
        <Form.Item className='admin-label' label='Email' name="email">
          <Input type="email" value={username} onChange={(e) => setUsername(e.target.value)}>
          </Input>
        </Form.Item>
        <Form.Item className='admin-label' label='Password' name="password">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}>
          </Input>
        </Form.Item>
        <div className="link-text d-flex justify-content-between">
          <Link to='/' className='link'>Not an admin? Go to HomePage</Link>
          &nbsp;&nbsp;
          <br></br>
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
        </Form>
    </div>
    <div>
      <Footer/>
    </div>


    </div>
  )
}

export default AdminLogin
