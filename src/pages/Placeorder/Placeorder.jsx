import React, { useContext, useEffect, useState } from 'react';
import './Placeorder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        place: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const decodeToken = (token) => {
        if (!token) return null;
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item }; // Clone item object
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        // Get the token from local storage
        const token = localStorage.getItem('token'); // or however you store your token
        let userId;

        if (token) {
            try {
                const decodedToken = decodeToken(token); // Use the custom decode function
                userId = decodedToken.id; // Assuming 'id' is the property containing the userId
            } catch (error) {
                alert("Failed to decode token. Please log in again.");
                console.error("Token decode error:", error);
                return;
            }
        }

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 10,
            userId: userId, // Add userId here
        };

        try {
            const response = await axios.post(
                `${url}/api/order/place`,
                orderData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Error placing the order: " + (response.data.message || "Unknown error."));
                console.error("Order placement response:", response.data);
            }
        } catch (error) {
            console.error("Order placement error:", error);
            alert("Failed to place the order. Please try again.");
        }
    };

    const navigate = useNavigate();

    useEffect(()=>{
        if (!token){
            navigate('/cart')
        }
        else if(getTotalCartAmount()===0)
        {
            navigate('/cart')
        }
    },[token]
    )

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name='place' onChange={onChangeHandler} value={data.place} type="text" placeholder='Place' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>CART-TOTALS</h2>
                    <div className="cart-totals">
                        <div className="cart-total-details">
                        
                            <p className="label">Subtotal</p>
                            <p className="value">৳{getTotalCartAmount() }</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p className="label">Delivery Fee</p>
                            <p className="value">৳{getTotalCartAmount() === 0 ? 0 : 10}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b className="label">Total</b>
                            <b className="value">৳{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
}

export default Placeorder;
