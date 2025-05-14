import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Slurpin'Sage</h1>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Welcome to Slurpin'Sage, where we blend passion with perfection to create
            the most delicious and nutritious smoothies. Our journey began with a simple
            mission: to make healthy eating enjoyable and accessible to everyone.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Our Promise</h2>
          <p>
            We use only the freshest ingredients, sourced locally whenever possible.
            Each smoothie is crafted with care, ensuring you get the perfect balance
            of taste and nutrition in every sip.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li>Quality Ingredients</li>
            <li>Health & Wellness</li>
            <li>Sustainability</li>
            <li>Customer Satisfaction</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About; 