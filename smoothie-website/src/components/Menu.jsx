import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import "./Menu.css";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Load cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const firstDoc = querySnapshot.docs[0];
        if (firstDoc) {
          const categoryData = firstDoc.data();
          if (Array.isArray(categoryData.name)) {
            setCategories(categoryData.name);
            setActiveCategory(categoryData.name[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  
  // Fetch items from Firebase based on active category
  useEffect(() => {
    const fetchItems = async () => {
      if (!activeCategory) return;
      
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const itemsData = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(item => item.type && item.type.toLowerCase() === activeCategory.toLowerCase());
        
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [activeCategory]);

  const updateCartItem = (item, quantity) => {
    try {
      const savedCart = localStorage.getItem('cart');
      let cartItems = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        if (quantity === 0) {
          // Remove item if quantity is 0
          cartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
        } else {
          // Update quantity
          cartItems[existingItemIndex].quantity = quantity;
        }
      } else if (quantity > 0) {
        // Add new item
        cartItems.push({
          id: item.id,
          name: item.name,
          price: item.price,
          ingredients: item.ingredients,
          image: item.image,
          type: item.type,
          quantity: quantity
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Failed to update cart. Please try again.');
    }
  };

  const getItemQuantity = (itemId) => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      const item = cartItems.find(cartItem => cartItem.id === itemId);
      return item ? item.quantity : 0;
    }
    return 0;
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
      <h1 className="menu-title">
        MENU <span className="arrow">→</span>
      </h1>
        {cartCount > 0 && (
          <button 
            className="view-cart-button"
            onClick={() => navigate('/cart')}
          >
            View Cart ({cartCount} items)
          </button>
        )}
      </div>

      {loading && <div className="loading">Loading...</div>}

      {!loading && categories.length === 0 && (
        <div className="no-data">No menu categories available.</div>
      )}

      {!loading && categories.length > 0 && (
        <>
      <div className="menu-tabs">
            {categories.map((category, index) => (
          <span
            key={index}
            className={activeCategory === category ? "active-tab" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </span>
        ))}
      </div>

      <div className="menu-grid">
            {items.length === 0 ? (
              <div className="no-data">No items available in this category.</div>
        ) : (
              items.map((item) => {
                const quantity = getItemQuantity(item.id);
                return (
            <div className="menu-card" key={item.id}>
                    <div className="card-content">
              <img 
                src={`/${item.image || 'greensmoothie.jpg'}`} 
                alt={item.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/greensmoothie.jpg';
                }}
              />
              <h2>{item.name}</h2>
              <p>{item.ingredients}</p>
              <div className="price-container">
                <div className="size-price">
                  <span>Price:</span>
                  <span>₹{item.price}</span>
                </div>
              </div>
                    </div>
                    {quantity > 0 ? (
                      <div className="quantity-controls">
                        <button onClick={() => updateCartItem(item, quantity - 1)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => updateCartItem(item, quantity + 1)}>+</button>
                      </div>
                    ) : (
                      <button 
                        className="add-to-cart"
                        onClick={() => updateCartItem(item, 1)}
                      >
                        Add to Cart
                      </button>
                    )}
            </div>
                );
              })
        )}
      </div>
        </>
      )}
    </div>
  );
}
