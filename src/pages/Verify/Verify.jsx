import React, { useContext, useEffect } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);  // Assuming StoreContext contains your base URL
  const navigate = useNavigate();

  // Verify payment function
  const verifyPayment = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  
      // Use params to send success and orderId in the GET request and add Authorization header
      const response = await axios.get(`${url}/api/order/verify`, {
        params: { success, orderId },
        headers: {
          Authorization: `Bearer ${token}`  // Add token to Authorization header
        }
      });
  
      // Redirect based on the payment verification response
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/");
    }
  };
  

  // Use effect to call verifyPayment when component mounts
  useEffect(() => {
    verifyPayment(); // Call the payment verification function
  }, [url, success, orderId]); // Add dependencies

  return (
    <div className='verify'>
      <div className='spinner'></div> {/* Spinner while verifying */}
    </div>
  );
};

export default Verify;
