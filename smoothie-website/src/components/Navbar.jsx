import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleOrderClick = () => {
    navigate('/menu');
  };

  useEffect(() => {
    // Load cart count from localStorage
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

    // Initial load
    updateCartCount();

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="left-section">
        <h1 className="logo">SLURPIN'SAGE</h1>
      </div>

      <div className="nav-toggle" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li><Link to="/menu" onClick={handleLinkClick}>Menu</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>  
        <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
        {/* <li className="cart-icon">
         
        </li> */}
        <li>
          <Link to="/cart" className="cart-link">
          <i className="fas fa-cart-shopping"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>
      </ul>

      {location.pathname !== '/menu' && (
        <button className="order-button" onClick={handleOrderClick}>Order Now</button>
      )}
    </nav>
  );
}

export default Navbar;
