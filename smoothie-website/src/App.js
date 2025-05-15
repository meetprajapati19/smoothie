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
import ContactForm from './components/ContactForm';
import './App.css';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
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
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
