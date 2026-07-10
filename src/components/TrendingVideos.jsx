import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TrendingVideos.css';

const TrendingVideos = () => {
  const videos = Array.from({ length: 12 }, (_, i) => `/trending-${i + 1}.mp4`);
  // Duplicate videos for seamless infinite scrolling
  const extendedVideos = [...videos, ...videos];
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animationId;
    const scrollContainer = scrollRef.current;

    const scrollStep = () => {
      if (scrollContainer && !isPaused) {
        scrollContainer.scrollLeft += 3;
        
        // Seamless loop logic: if scrolled past the first set, reset to 0
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 1; // 1 prevents stutter
        }
      }
      animationId = requestAnimationFrame(scrollStep);
    };

    animationId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollToPos = direction === 'left' ? scrollLeft - (clientWidth / 2) : scrollLeft + (clientWidth / 2);
      scrollRef.current.scrollTo({ left: scrollToPos, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="trending-videos-container" 
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button 
        onClick={() => scroll('left')} 
        className="carousel-button left"
        aria-label="Scroll left"
      >
        ❮
      </button>

      <div className="trending-videos-scroll" ref={scrollRef}>
        <div className="trending-videos-track">
          {extendedVideos.map((src, index) => (
            <Link to="/products" key={index} className="trending-video-card">
              <video 
                src={src} 
                autoPlay 
                loop
                muted 
                playsInline 
                className="trending-video"
              />
              <div className="trending-video-overlay">
                <span>Shop Now</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <button 
        onClick={() => scroll('right')} 
        className="carousel-button right"
        aria-label="Scroll right"
      >
        ❯
      </button>
    </div>
  );
};

export default TrendingVideos;
