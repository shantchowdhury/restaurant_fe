import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Placeorder from './pages/Placeorder/Placeorder';
import ExploreMenu from './components/ExploreMenu/ExploreMenu';
import Footer from './components/Footer/Footer';
import MobileApp from './pages/MobileApp/MobileApp';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token')); // Check for token

  const ProtectedRoute = ({ element }) => {
    return token ? element : <Navigate to="/" onClick={() => setShowLogin(true)} />;
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<ProtectedRoute element={<Cart />} />} />
          <Route path='/order' element={<ProtectedRoute element={<Placeorder />} />} />
          <Route path='/menu' element={<ExploreMenu />} />
          <Route path='/mobile-app' element={<MobileApp />} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myorders' element={<MyOrders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
