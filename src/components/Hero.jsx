import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const sliderData = [
  {
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=1600&q=80",
    title: "BEACH CLUB",
    estText: "EST.",
    brand: "JOHN 🌴 JACOBS",
    year: "2024"
  },
  {
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&q=80",
    title: "VISION PERFECTED",
    estText: "PREMIUM",
    brand: "CRAFTED LENSES",
    year: "EDITION"
  },
  {
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=1600&q=80",
    title: "URBAN CHIC",
    estText: "NEW",
    brand: "MODERN FRAMES",
    year: "STYLE"
  }
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-banner">
      <div className="hero-overlay"></div>
      
      {/* Background Image Slider */}
      <img 
        src={sliderData[currentSlide].image} 
        alt="Lenskart Banner" 
        className="hero-bg" 
        key={currentSlide} /* Force re-render of image for animation */
      />

      <div className="hero-content-center" key={`content-${currentSlide}`}>
        <h1 className="campaign-title">{sliderData[currentSlide].title}</h1>
        
        <div className="est-text">
          <span>{sliderData[currentSlide].estText}</span>
          <div className="brand-logo-text">{sliderData[currentSlide].brand}</div>
          <span>{sliderData[currentSlide].year}</span>
        </div>

        <Link to="/products" className="shop-now-btn">
          Shop Now
        </Link>
      </div>

      <div className="carousel-dots">
        {sliderData.map((_, index) => (
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