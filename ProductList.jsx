import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './App.css';

function ProductList({ onGoToCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plants = [
    // Category 1: Air Purifying
    { name: 'Snake Plant', category: 'Air Purifying', cost: '$15', image: 'https://images.unsplash.com/photo-1593480838157-1c60d84a7e93?w=200' },
    { name: 'Spider Plant', category: 'Air Purifying', cost: '$12', image: 'https://images.unsplash.com/photo-1616832822158-963d3fb49a88?w=200' },
    { name: 'Peace Lily', category: 'Air Purifying', cost: '$18', image: 'https://images.unsplash.com/photo-1593696954577-674ee6637311?w=200' },
    { name: 'Boston Fern', category: 'Air Purifying', cost: '$14', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?w=200' },
    { name: 'Aloe Vera', category: 'Air Purifying', cost: '$10', image: 'https://images.unsplash.com/photo-1596547609652-9fc5d8d42850?w=200' },
    { name: 'Rubber Plant', category: 'Air Purifying', cost: '$20', image: 'https://images.unsplash.com/photo-1600412852787-8c3395b4c106?w=200' },
    
    // Category 2: Low Light
    { name: 'ZZ Plant', category: 'Low Light', cost: '$22', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=200' },
    { name: 'Pothos', category: 'Low Light', cost: '$11', image: 'https://images.unsplash.com/photo-1613203406362-e93540ce807e?w=200' },
    { name: 'Cast Iron Plant', category: 'Low Light', cost: '$25', image: 'https://images.unsplash.com/photo-1611211232932-da3113c5b960?w=200' },
    { name: 'Chinese Evergreen', category: 'Low Light', cost: '$18', image: 'https://images.unsplash.com/photo-1613739118925-cde1e8f5d65b?w=200' },
    { name: 'Philodendron', category: 'Low Light', cost: '$14', image: 'https://images.unsplash.com/photo-1612450373752-0fbc4bf10515?w=200' },
    { name: 'Parlor Palm', category: 'Low Light', cost: '$16', image: 'https://images.unsplash.com/photo-1597055181300-8809a96e38a2?w=200' },
    
    // Category 3: Pet Friendly
    { name: 'Calathea', category: 'Pet Friendly', cost: '$20', image: 'https://images.unsplash.com/photo-1603517112443-4f9e1eb1c6bc?w=200' },
    { name: 'Areca Palm', category: 'Pet Friendly', cost: '$30', image: 'https://images.unsplash.com/photo-1611080922896-180b59b567d0?w=200' },
    { name: 'Ponytail Palm', category: 'Pet Friendly', cost: '$19', image: 'https://images.unsplash.com/photo-1620138546344-7b2c38516fc5?w=200' },
    { name: 'Money Tree', category: 'Pet Friendly', cost: '$24', image: 'https://images.unsplash.com/photo-1596781297750-13b7dcaf9498?w=200' },
    { name: 'Peperomia', category: 'Pet Friendly', cost: '$12', image: 'https://images.unsplash.com/photo-1593481239920-5d6c8b9b4413?w=200' },
    { name: 'Polka Dot Plant', category: 'Pet Friendly', cost: '$10', image: 'https://images.unsplash.com/photo-1622384666579-2479e0a0f2b3?w=200' }
  ];

  const categories = [...new Set(plants.map(plant => plant.category))];

  return (
    <div>
      <div className="navbar">
        <div className="nav-brand">Paradise Nursery</div>
        <div className="nav-links">
          <span>Home</span>
          <span>Plants</span>
          <span onClick={onGoToCart}>🛒 Cart ({totalQuantity})</span>
        </div>
      </div>
      
      <div style={{ padding: '20px' }}>
        {categories.map(category => (
          <div key={category}>
            <h2>{category}</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {plants.filter(p => p.category === category).map(plant => {
                const isInCart = cartItems.some(item => item.name === plant.name);
                return (
                  <div key={plant.name} style={{ border: '1px solid #ccc', padding: '15px', textAlign: 'center', width: '200px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button 
                      onClick={() => dispatch(addItem(plant))}
                      disabled={isInCart}
                      style={{ backgroundColor: isInCart ? '#ccc' : '#4CAF50', color: 'white', padding: '10px', cursor: isInCart ? 'not-allowed' : 'pointer' }}
                    >
                      {isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

