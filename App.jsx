import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStarted = () => {
    setShowProducts(true);
  };

  if (showProducts) {
    return showCart ? (
      <CartItem onContinueShopping={() => setShowCart(false)} />
    ) : (
      <ProductList onGoToCart={() => setShowCart(true)} />
    );
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Paradise Nursery</h1>
        <p>Your one-stop shop for beautiful houseplants.</p>
        <AboutUs />
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
