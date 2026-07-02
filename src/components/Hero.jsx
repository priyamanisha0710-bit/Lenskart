import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const sliderImages = [
  "https://images.unsplash.com/photo-1577803645773-f96470509666?w=1600&q=80",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&q=80",
  "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=1600&q=80"
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-banner">
      <div className="hero-overlay"></div>
      
      {/* Background Image Slider */}
      <img 
        src={sliderImages[currentSlide]} 
        alt="Lenskart Banner" 
        className="hero-bg" 
      />

      <div className="hero-content-center">
        <h1 className="campaign-title">BEACH CLUB</h1>
        
        <div className="est-text">
          <span>EST.</span>
          <div className="brand-logo-text">JOHN 🌴 JACOBS</div>
          <span>2024</span>
        </div>

        <Link to="/products" className="shop-now-btn">
          Shop Now
        </Link>
      </div>

      <div className="carousel-dots">
        {sliderImages.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default Hero;