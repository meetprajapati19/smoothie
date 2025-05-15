import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const loadCartItems = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCartItems(parsedCart);
          calculateTotal(parsedCart);
        } else {
          setCartItems([]);
          setTotal(0);
        }
      } else {
        setCartItems([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
      setCartItems([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    loadCartItems();

    const handleCartUpdate = () => {
      loadCartItems();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setTotal(0);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/menu')} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={`/${item.image || 'greensmoothie.jpg'}`} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/greensmoothie.jpg';
                    }}
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>{item.ingredients}</p>
                    <div className="price">₹{item.price}</div>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="item-total">
                    ₹{item.price * item.quantity}
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{total}</span>
              </div>
              <div className="summary-row">
                <span>Tax (5%):</span>
                <span>₹{(total * 0.05).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{(total * 1.05).toFixed(2)}</span>
              </div>
              
              <div className="cart-actions">
                <button onClick={clearCart} className="clear-cart">
                  Clear Cart
                </button>
                <button onClick={handleCheckout} className="checkout">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 