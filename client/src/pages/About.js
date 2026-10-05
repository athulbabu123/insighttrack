import React from 'react'
import './About.css';
import Footer from '../components/Layout/Footer';
import Header from './Header';

const About = () => {
  return (
    <div className='about-page'>

        <div>
            <Header/>
        </div>
        
        <div className="about-container">
            <h1 style={{color:"#C0C0C0"}}>About InsightTrack</h1>
            <h2 style={{color:'blue'}}>Our Mission</h2>
            <p>At InsightTrack, our mission is to empower individuals and businesses to take control of their finances through intuitive and powerful tools. We believe that effective financial management is key to achieving personal and professional goals.</p>
            <h2 style={{color:'blue'}}>What We Do</h2>
            <p>InsightTrack is a comprehensive personal finance management application that helps users track their income and expenses, providing valuable insights through detailed analytics. Our platform offers:</p>
            <ul>
                <li><strong><u>Frontend:</u></strong>Built with React, Axios, Bootstrap, Material UI and Ant Design.</li>
                <li><strong><u>Backend:</u></strong>Powered by Node.js, Express.js, MongoDB, and supported by CORS, Morgan, Colors, and Mongoose.</li>
            </ul>
            <h2 style={{color:'blue'}}>Our Vision</h2>
            <p>We are committed to continuous improvement and innovation. Upcoming features include:</p>
            <ul>
                <li><strong>Enhanced Analytics:</strong> Advanced tools for deeper financial insights.</li>
                <li><strong>Mobile Optimization:</strong>  Improved functionality on mobile devices.</li>
                <li><strong>Integration:</strong>  Seamless connection with third-party financial services.</li>
            </ul>
            <h2 style={{color:'#C0C0C0'}}>Contact Us</h2>
            <p>Have questions or need support? Reach out to us at <a href='www.example.com'>support@insighttrack.com</a>.</p>
            <p>Thank you for choosing InsightTrack for your personal finance management needs!</p>
        </div>

        <div>
            <Footer/>
        </div>

        </div>
  )
}

export default About
