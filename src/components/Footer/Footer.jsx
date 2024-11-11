import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>We believe that great food tells a story.From our kitchen to your table we craft every dish with love & passion turning simple meals into moments worth savoring and bold flavors to bring people together for unforgettable moments,Thank you for making us part of your journey.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
        </div>
       <div className="footer-content-center">
        <h2>Company</h2>
        <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
       </div>
        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+8801688538164</li>
                <li>cfest@cusinefest.com</li>
            </ul>
        </div>

      </div>
      <hr/>
    <p className="footer-copyright">Copyright 2024 @ CuisineFest.com -All Right Reserved.</p>
    </div>
  )
}

export default Footer
