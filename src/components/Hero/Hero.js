import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPlay } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularSearches = [
    'Website Design',
    'Logo Design', 
    'WordPress',
    'Voice Over',
    'Video Editing',
    'AI Services',
    'Social Media',
    'SEO'
  ];

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-left">
              <h1 className="hero-title">
                Find the right <span className="highlight">freelance</span><br />
                service, right away
              </h1>
              
              <form className="hero-search" onSubmit={handleSearch}>
                <div className="search-wrapper">
                  <input
                    type="text"
                    placeholder="Search for any service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-btn">
                    <FiSearch />
                  </button>
                </div>
              </form>

              <div className="popular-searches">
                <span className="popular-label">Popular:</span>
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    className="popular-tag"
                    onClick={() => navigate(`/services?search=${encodeURIComponent(search)}`)}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-image-container">
                <img 
                  src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049983/bg-hero-1-1792-x1.png" 
                  alt="Freelancer working" 
                  className="hero-image"
                />
                <div className="floating-cards">
                  <div className="service-card card-1">
                    <img src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png" alt="Logo Design" />
                    <span>Logo Design</span>
                  </div>
                  <div className="service-card card-2">
                    <img src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png" alt="WordPress" />
                    <span>WordPress</span>
                  </div>
                  <div className="service-card card-3">
                    <img src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png" alt="Voice Over" />
                    <span>Voice Over</span>
                  </div>
                  <div className="service-card card-4">
                    <img src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917011/video-editing-2x.png" alt="Video Editing" />
                    <span>Video Editing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by section */}
      <div className="trusted-by">
        <div className="trusted-container">
          <span className="trusted-text">Trusted by:</span>
          <div className="trusted-logos">
            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png" alt="Meta" />
            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png" alt="Google" />
            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png" alt="Netflix" />
            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png" alt="P&G" />
            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png" alt="PayPal" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
