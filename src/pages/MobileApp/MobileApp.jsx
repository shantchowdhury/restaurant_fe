import React from 'react';
import { assets } from '../../assets/assets'; // Ensure the correct path is used

const AppDownload = () => {
    return (
      <div className='app-download' id='app-download'>
        <h1>Download Our Mobile App</h1>
        <p>Get our app to enjoy exclusive offers and convenience at your fingertips<br/> CuisineFest App </p>
     <div className="app-download-platforms">
      <img src={assets.play_store} alt="" />
      <img src={assets.app_store} alt="" />
     </div>
      </div>
    )
  }
  
  export default AppDownload
  