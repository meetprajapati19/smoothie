import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose'; // 
import Scroll from './components/Scroll';
import Menu from './components/Menu';
import About from './components/About';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <WhyChoose />
              <Scroll />
              <Testimonials/>
            </>
          } />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
