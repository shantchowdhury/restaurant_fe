import React, { useEffect, useContext, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]); // State to store fetched orders

  // Fetch user orders function
  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${url}/api/order/userorders`, {}, {
        headers: {
          Authorization: `Bearer ${token}` // Adding token in headers for authorization
        }
      });

      if (response.data.success) {
        setOrders(response.data.data); // Set fetched orders in state
      } else {
        console.error("Error fetching orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [url]);

  return (
    <div className='my-Orders'>
      <h2>My Orders</h2>
      <div className="container">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, itemIndex) => {
                  if (itemIndex === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`;
                  } else {
                    return `${item.name} x ${item.quantity}, `;
                  }
                })}
              </p>
              <p>৳{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button onClick={fetchUserOrders}>Track Order</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p> // Show this if no orders are found
        )}
      </div>
    </div>
  );
};

export default MyOrders;
