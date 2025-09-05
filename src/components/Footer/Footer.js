import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><Link to="/services?category=graphics">Graphics & Design</Link></li>
              <li><Link to="/services?category=writing">Writing & Translation</Link></li>
              <li><Link to="/services?category=video">Video & Animation</Link></li>
              <li><Link to="/services?category=music">Music & Audio</Link></li>
              <li><Link to="/services?category=programming">Programming & Tech</Link></li>
              <li><Link to="/services?category=business">Business</Link></li>
              <li><Link to="/services?category=lifestyle">Lifestyle</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">About</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press & News</Link></li>
              <li><Link to="/partnerships">Partnerships</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/intellectual-property">Intellectual Property Claims</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><Link to="/help">Help & Support</Link></li>
              <li><Link to="/trust-safety">Trust & Safety</Link></li>
              <li><Link to="/selling">Selling on Fiverr</Link></li>
              <li><Link to="/buying">Buying on Fiverr</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Community</h3>
            <ul className="footer-links">
              <li><Link to="/events">Customer Success Stories</Link></li>
              <li><Link to="/community">Community Hub</Link></li>
              <li><Link to="/forum">Forum</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/influencers">Influencers</Link></li>
              <li><Link to="/affiliates">Affiliates</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">More From Fiverr</h3>
            <ul className="footer-links">
              <li><Link to="/pro">Fiverr Pro</Link></li>
              <li><Link to="/business">Fiverr Business</Link></li>
              <li><Link to="/logo-maker">Fiverr Logo Maker</Link></li>
              <li><Link to="/guides">Fiverr Guides</Link></li>
              <li><Link to="/workspace">Fiverr Workspace</Link></li>
              <li><Link to="/learn">Learn</Link></li>
              <li><Link to="/working-not-working">Working Not Working</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-logo-section">
              <Link to="/" className="footer-logo">
                <span className="footer-logo-text">fiverr</span>
              </Link>
              <p className="footer-copyright">
                © Fiverr International Ltd. 2024
              </p>
            </div>
            
            <div className="footer-social">
              <div className="social-links">
                <a href="https://twitter.com/fiverr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiTwitter />
                </a>
                <a href="https://facebook.com/fiverr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiFacebook />
                </a>
                <a href="https://linkedin.com/company/fiverr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiLinkedin />
                </a>
                <a href="https://instagram.com/fiverr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiInstagram />
                </a>
                <a href="https://youtube.com/fiverr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiYoutube />
                </a>
              </div>
              
              <div className="footer-settings">
                <div className="language-currency">
                  <button className="footer-btn">
                    🌐 English
                  </button>
                  <button className="footer-btn">
                    $ USD
                  </button>
                  <button className="footer-btn">
                    👤 Accessibility
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;