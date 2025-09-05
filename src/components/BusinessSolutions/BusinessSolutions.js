import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import './BusinessSolutions.css';

const BusinessSolutions = () => {
  const features = [
    'Dedicated hiring experts',
    'Satisfaction guarantee',
    'Advanced project management tools',
    'Flexible payment terms'
  ];

  return (
    <section className="business-solutions">
      <div className="business-container">
        <div className="business-content">
          <div className="business-text">
            <h2 className="business-title">
              <span className="fiverr-pro">fiverr</span>
              <span className="pro-text">pro</span>
            </h2>
            <h3 className="business-subtitle">
              The premium freelance solution for businesses
            </h3>
            <p className="business-description">
              Connect with hand-vetted talent, get dedicated support, and collaborate with ease.
            </p>
            <ul className="business-features">
              {features.map((feature, index) => (
                <li key={index} className="business-feature">
                  <FiCheck className="check-icon" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/fiverr-pro" className="btn btn-pro">
              Try Fiverr Pro
              <FiArrowRight />
            </Link>
          </div>
          <div className="business-image">
            <img 
              src="/atlaspayx-dashboard-ready-to-upload/business-thin-885e68e.svg" 
              alt="Fiverr Pro Business Solutions"
              className="business-main-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;