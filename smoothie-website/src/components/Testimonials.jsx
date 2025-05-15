import React, { useState } from 'react';
import './Testimonials.css';

const testimonialData = [
  {
    id: 1,
    title: "It was a very good experience",
    text: "Thank you Slurpin' Sage team for delicious smoothie and heartfelt note. It was so good that it's going to be one of my regular orders.",
    name: "Megha",
    image: "3.jpg"
  },
  {
    id: 2,
    title: "Best smoothies in town!",
    text: "The flavors are amazing and the service is exceptional. I love how fresh and healthy everything tastes.",
    name: "Rahul",
    image: "2.jpg"
  },
  {
    id: 3,
    title: "Healthy and Delicious",
    text: "Perfect balance of taste and nutrition. Their smoothie bowls are my favorite breakfast option now!",
    name: "Priya",
    image: "th.jpg"
  },
  {
    id: 4,
    title: "Outstanding Quality",
    text: "Fresh ingredients and creative combinations. The staff is friendly and the atmosphere is great.",
    name: "Amit",
    image: "4.png"
  },
  {
    id: 5,
    title: "Regular Customer",
    text: "I've tried many smoothie places, but Slurpin' Sage is by far the best. Their commitment to quality is evident.",
    name: "Neha",
    image: "th.jpg"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAvatarClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonial-section">
      <h2>
        Here is what our Clients are saying
        <br />
        <span>About us</span>
      </h2>

      <div className="testimonial-carousel">
        <div className="testimonial-card">
          <p className="testimonial-title">
            {testimonialData[currentIndex].title}
          </p>
          <p className="testimonial-text">
            {testimonialData[currentIndex].text}
          </p>
        </div>

        <div className="testimonial-nav">
          <span className="arrow" onClick={handlePrevious}>&#10094;</span>
          <div className="avatars">
            {testimonialData.map((testimonial, index) => (
              <img
                key={testimonial.id}
                src={testimonial.image}
                alt={`Client ${index + 1}`}
                className={currentIndex === index ? 'active' : ''}
                onClick={() => handleAvatarClick(index)}
              />
            ))}
          </div>
          <span className="arrow" onClick={handleNext}>&#10095;</span>
        </div>

        <p className="client-name">{testimonialData[currentIndex].name}</p>
      </div>
    </section>
  );
};

export default Testimonials;
