import react from 'react';
import './Testimonials.css';

const Testimonials = () => (
  <section className="testimonial-section">
    <h2>
      Here is what our Clients are saying
      <br />
      <span>About us</span>
    </h2>

    <div className="testimonial-carousel">
      <div className="testimonial-card">
        <p className="testimonial-title">
          It was a very good experience
        </p>
        <p className="testimonial-text">
          Thank you Slurpin' Sage team for delicious smoothie and heartfelt note. It was so good that it's going to be one of my regular orders.
        </p>
      </div>

      <div className="testimonial-nav">
        <span className="arrow">&#10094;</span>
        <div className="avatars">
          <img src="th.jpg" alt="Client 1" />
          <img src="2.jpg" alt="Client 2" />
          <img className="active" src="3.jpg" alt="Megha" />
          <img src="4.png" alt="Client 4" />
          <img src="th.jpg" alt="Client 5" />
        </div>
        <span className="arrow">&#10095;</span>
      </div>

      <p className="client-name">Megha</p>
    </div>
  </section>
);

export default Testimonials;
