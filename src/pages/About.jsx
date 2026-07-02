import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <Navbar />
      
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>Discover Our Story</h1>
          <p>Innovating vision, one pair of glasses at a time.</p>
        </div>
      </div>

      <div className="about-container">
        <section className="about-section history-section fade-in-up">
          <div className="section-content">
            <h2>Our History</h2>
            <p>
              Founded in 2010, we started with a simple idea: everyone deserves access to premium quality eyewear without breaking the bank. From a small online startup, we've grown into a global leader in optical technology and fashion. Over the past decade, we've continuously pushed the boundaries of eyewear design and lens manufacturing.
            </p>
          </div>
          <div className="section-image history-image"></div>
        </section>

        <section className="about-section vision-mission-section reverse fade-in-up">
          <div className="section-content" style={{width: '100%'}}>
            <h2>Vision & Mission</h2>
            <div className="vm-cards">
              <div className="vm-card">
                <h3>Our Vision</h3>
                <p>To revolutionize the eyewear industry by making high-quality, fashionable eyewear accessible to every individual across the globe.</p>
              </div>
              <div className="vm-card">
                <h3>Our Mission</h3>
                <p>To combine state-of-the-art optical technology with cutting-edge fashion, delivering unmatched value and empowering our customers to see the world clearly and beautifully.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section experience-section fade-in-up">
          <h2>Our Experience & Milestones</h2>
          <p className="subtitle">Delivering excellence through numbers.</p>
          <div className="stats-container">
            <div className="stat-box">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">2M+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">50k+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">100+</span>
              <span className="stat-label">Retail Stores</span>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default About;
