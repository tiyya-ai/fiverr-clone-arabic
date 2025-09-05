import React, { useState } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Testimonials.css';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Jennifer Martinez",
      role: "Marketing Director",
      company: "TechStart Inc.",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
      text: "Fiverr has been a game-changer for our startup. We've been able to access top-tier talent for a fraction of the cost of hiring full-time employees. The quality of work consistently exceeds our expectations.",
      project: "Brand Identity & Website Design"
    },
    {
      id: 2,
      name: "Robert Chen",
      role: "E-commerce Owner",
      company: "Chen's Electronics",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
      text: "I've used Fiverr for everything from product photography to social media management. The platform makes it incredibly easy to find skilled professionals who understand my business needs.",
      project: "Product Photography & Social Media"
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "Content Creator",
      company: "Williams Media",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
      text: "As a content creator, I rely on Fiverr for video editing, graphic design, and animation. The turnaround times are amazing, and the quality is always professional-grade.",
      project: "Video Editing & Animation"
    },
    {
      id: 4,
      name: "Michael Thompson",
      role: "Restaurant Owner",
      company: "Thompson's Bistro",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
      text: "Fiverr helped me launch my restaurant's online presence. From logo design to menu creation and social media setup, everything was handled professionally and efficiently.",
      project: "Restaurant Branding & Digital Presence"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
      />
    ));
  };

  return (
    <section className="testimonials section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">What our customers say</h2>
          <p className="section-subtitle">
            Hear from businesses that have transformed their operations with Fiverr
          </p>
        </div>

        <div className="testimonials-container">
          <button 
            className="testimonial-nav prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft />
          </button>

          <div className="testimonial-content">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="testimonial-role">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="testimonial-company">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>

              <div className="testimonial-rating">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>

              <blockquote className="testimonial-text">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              <div className="testimonial-project">
                <span className="project-label">Project:</span>
                <span className="project-name">
                  {testimonials[currentTestimonial].project}
                </span>
              </div>
            </div>
          </div>

          <button 
            className="testimonial-nav next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-number">4.9</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2M+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
