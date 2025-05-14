import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>SLURPIN'SAGE</h3>
          <p>Delicious smoothies for a healthier lifestyle</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li>📍 123 Smoothie Street, City</li>
            <li>📞 (555) 123-4567</li>
            <li>✉️ info@slurpinsage.com</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Opening Hours</h4>
          <ul className="hours">
            <li>Monday - Friday: 8am - 8pm</li>
            <li>Saturday: 9am - 6pm</li>
            <li>Sunday: 10am - 4pm</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Slurpin'Sage. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
