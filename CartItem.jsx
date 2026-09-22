import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Convert string price (e.g., "$15") to number
  const getNumericCost = (costString) => parseFloat(costString.replace('$', ''));

  const totalCartAmount = cartItems.reduce(
    (total, item) => total + getNumericCost(item.cost) * item.quantity, 
    0
  );
  
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item));
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="nav-brand">Paradise Nursery</div>
        <div className="nav-links">
          <span>Home</span>
          <span onClick={onContinueShopping}>Plants</span>
          <span>🛒 Cart ({totalQuantity})</span>
        </div>
      </div>

      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2>Shopping Cart</h2>
        <h3>Total Cart Amount: ${totalCartAmount.toFixed(2)}</h3>
        
        {cartItems.map(item => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '15px 0' }}>
            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div style={{ flex: 1, marginLeft: '20px' }}>
              <h4>{item.name}</h4>
              <p>Unit Price: {item.cost}</p>
              <p>Subtotal: ${(getNumericCost(item.cost) * item.quantity).toFixed(2)}</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            
            <button 
              onClick={() => dispatch(removeItem(item))}
              style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '8px 15px', marginLeft: '20px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))}

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button onClick={onContinueShopping} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Continue Shopping
          </button>
          <button onClick={() => alert('Coming Soon')} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
