// Hero.js
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Delicious <br /> Smoothies & Shakes</h1>
        <p>Slurpin' Sage brings you tasty, healthy and refreshing smoothies and shakes made from fresh fruits and veggies.</p>
        <button className="order-btn">Order Now</button>
      </div>
      <div className="hero-image">
        <img src="/hero-image.png" alt="Delicious Smoothies" />
      </div>
    </section>
  );
};

export default Hero;