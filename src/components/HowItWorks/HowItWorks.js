import React from 'react';
import { FiSearch, FiMessageCircle, FiCheckCircle } from 'react-icons/fi';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FiSearch />,
      title: "Find the perfect service",
      description: "Browse through thousands of services or use our search to find exactly what you need for your project.",
      color: "#ff6b6b"
    },
    {
      id: 2,
      icon: <FiMessageCircle />,
      title: "Communicate with sellers",
      description: "Contact sellers to discuss your requirements, timeline, and budget before placing an order.",
      color: "#4ecdc4"
    },
    {
      id: 3,
      icon: <FiCheckCircle />,
      title: "Get your project done",
      description: "Receive high-quality work from talented freelancers and grow your business with confidence.",
      color: "#1dbf73"
    }
  ];

  return (
    <section className="how-it-works section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">How Fiverr Works</h2>
          <p className="section-subtitle">
            Get your project done in three simple steps
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.id} className="step-item">
              <div className="step-content">
                <div 
                  className="step-icon"
                  style={{ '--step-color': step.color }}
                >
                  {step.icon}
                </div>
                <div className="step-text">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <div className="connector-line"></div>
                  <div className="connector-arrow">→</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="how-it-works-cta text-center">
          <h3 className="cta-title">Ready to get started?</h3>
          <p className="cta-description">
            Join millions of people who use Fiverr to turn their ideas into reality
          </p>
          <div className="cta-buttons">
            <a href="/register" className="btn btn-primary">Get Started</a>
            <a href="/services" className="btn btn-secondary">Browse Services</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;