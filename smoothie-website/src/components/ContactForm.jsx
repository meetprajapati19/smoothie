import React from 'react';
import './ContactForm.css';

const ContactForm = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <form className="contact-form">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

         
          <label>Message</label>
          <textarea placeholder="Message" rows={5}></textarea>

          <button type="submit">Submit</button>
        </form>

        <div className="contact-info">
          <div className="contact-info-row">
            <div className="contact-info-item">
              <h3>Address</h3>
              <p>329, Charusat<br />ANAND</p>
            </div>
            <div className="contact-info-item">
              <h3>Call Us</h3>
              <p>+91 777777777</p>
            </div>
            <div className="contact-info-item">
              <h3>Email Us</h3>
              <p>contact@xyz.com</p>
            </div>
          </div>
          
          <div className="social-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fas fa-envelope"></i>
            </div>
            <p>Mon - Fri: 9:00 am - 6:00 pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
