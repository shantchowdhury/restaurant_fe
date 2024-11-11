import React from 'react';
import ReactDOM from 'react-dom/client';  // This is the modern method for React 18+
import App from './App.jsx';  // Make sure the path to App is correct
import './index.css';  // Import your global CSS if needed
import { BrowserRouter } from 'react-router-dom';
import StoreContextprovider from './context/StoreContext.jsx';
// Create a root element for rendering the application
ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <StoreContextprovider>
            <App />
        </StoreContextprovider>
    </BrowserRouter>

);
