import React from 'react';
import './WhyChoose.css';

function WhyChoose() {
  return (
    <section className="why-choose-section">
      <h2>Why Choose Slurpin’Sage</h2>
      <p className="subtitle">
        We're committed to providing delicious, nutritious options that fuel your body and please your taste buds.
      </p>
      
      <div className="cards-container">
        <div className="feature-card">
          <img src="leaf-icon.jpeg" alt="Organic Icon" />
          <h3>100% Organic</h3>
          <p>We source only the freshest, organic ingredients from local farms to ensure maximum nutrition and flavor.</p>
        </div>

        <div className="feature-card">
        <img src="salad-icon.png" alt="Delicious Smoothies" />
          <h3>Nutrioned</h3>
          <p>Each item on our menu is carefully crafted to provide a balance of vitamins, minerals, and antioxidants.</p>
        </div>

        <div className="feature-card">
          <img src="tree-icon.jpeg" alt="Tree Icon" />
          <h3>100% Organic</h3>
          <p>We source only the freshest, organic ingredients from local farms to ensure maximum nutrition and flavor.</p>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
