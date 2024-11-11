import React from 'react';
import './cart.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart , getTotalCartAmount ,url } = useContext(StoreContext);
  const navigate = useNavigate();
  
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-item'>
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>৳{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>৳{(item.price * cartItems[item._id])}</p>
                  <button onClick={() => removeFromCart(item._id)}>x</button>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>CART-TOTALS</h2>
          <div className="cart-totals">
            <div className="cart-total-details">
              <p className="label">SubTotal</p>
              <p className="value">৳{getTotalCartAmount()}</p>
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
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
