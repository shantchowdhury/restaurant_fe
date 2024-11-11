import React, { useState, useEffect, useRef, useContext } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { assets } from '../../assets/assets'; 
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [activeMenu, setActiveMenu] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref to track the dropdown
  const navigate = useNavigate(); // Ensure this is defined for navigation

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <div className="navbar">
      <Link to='/'>
        <img src={assets.logo} alt="Cuisine Fest Logo" className="logo" />
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/" onClick={() => setActiveMenu('home')} className={activeMenu === 'home' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/menu" onClick={() => setActiveMenu('menu')} className={activeMenu === 'menu' ? 'active' : ''}>Menu</Link>
        </li>
        <li>
          <Link to="/mobile-app" onClick={() => setActiveMenu('mobile-app')} className={activeMenu === 'mobile-app' ? 'active' : ''}>Mobile App</Link>
        </li>
        <li>
          <Link to="/contact-us" onClick={() => setActiveMenu('contact-us')} className={activeMenu === 'contact-us' ? 'active' : ''}>Contact Us</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Basket Icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            <img 
              src={assets.profile_icon} 
              alt="Profile Icon" 
              onClick={toggleDropdown} // Toggle dropdown on click
            />
            {dropdownOpen && (
              <ul className="nav-profile_dropdown">
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>My Orders</p>
                </li>
                <hr />
                <li onClick={handleLogout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
