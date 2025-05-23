import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
  };

  // Effect to handle body scroll when menu opens/closes
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
    // Cleanup function to remove class if component unmounts while menu is open
    return () => {
      document.body.classList.remove('body-no-scroll');
    };
  }, [isMenuOpen]);

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
        {isMenuOpen ? '✕' : '☰'} {/* Change icon based on state */}
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li><Link to="/menu" onClick={handleLinkClick}>Menu</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>  
        <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
        {/* <li className="cart-icon">
         
        </li> */}
        <li>
          <Link to="/cart" className="cart-link" onClick={handleLinkClick}>
            <i className="fas fa-cart-shopping"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>
      </ul>

      {/* {location.pathname !== '/menu' && (
        <button className="order-button" onClick={handleOrderClick}>Order Now</button>
      )} */}

      {/* Overlay to dim background when menu is open */}
      {isMenuOpen && <div className="nav-overlay" onClick={toggleMenu}></div>}
    </nav>
  );
}

export default Navbar;
