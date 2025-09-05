import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiHeart } from 'react-icons/fi';
import './FeaturedServices.css';

const FeaturedServices = () => {
  const featuredServices = [
    {
      id: 1,
      title: "I will design a modern logo for your business",
      seller: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        level: "Level 2 Seller",
        rating: 4.9
      },
      image: "/atlaspayx-dashboard-ready-to-upload/logo-design.png",
      price: 25,
      rating: 4.9,
      reviews: 1247,
      category: "Graphics & Design",
      tags: ["Logo Design", "Brand Identity", "Modern"],
      delivery: "2 days"
    },
    {
      id: 2,
      title: "I will develop a responsive WordPress website",
      seller: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        level: "Top Rated Seller",
        rating: 5.0
      },
      image: "/atlaspayx-dashboard-ready-to-upload/website-development.png",
      price: 150,
      rating: 5.0,
      reviews: 892,
      category: "Programming & Tech",
      tags: ["WordPress", "Responsive", "Custom"],
      delivery: "5 days"
    },
    {
      id: 3,
      title: "I will create an engaging promotional video",
      seller: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        level: "Level 2 Seller",
        rating: 4.8
      },
      image: "/atlaspayx-dashboard-ready-to-upload/video-editing.png",
      price: 75,
      rating: 4.8,
      reviews: 634,
      category: "Video & Animation",
      tags: ["Promotional", "Animation", "Marketing"],
      delivery: "3 days"
    },
    {
      id: 4,
      title: "I will write compelling copy for your website",
      seller: {
        name: "Alex Rodriguez",
        avatar: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/7f56ebdb-bg3h-7i1h-ch0i-bf8e7d5g4h6i/JPEG_20210630_156789_456789012.jpg",
        level: "Level 1 Seller",
        rating: 4.7
      },
      image: "/atlaspayx-dashboard-ready-to-upload/Book Design.png",
      price: 50,
      rating: 4.7,
      reviews: 423,
      category: "Writing & Translation",
      tags: ["Copywriting", "Web Content", "SEO"],
      delivery: "2 days"
    },
    {
      id: 5,
      title: "I will provide professional voice over services",
      seller: {
        name: "David Wilson",
        avatar: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/8g67fcec-ch4i-8j2i-di1j-cg9f8e6h5i7j/JPEG_20210705_167890_567890123.jpg",
        level: "Top Rated Seller",
        rating: 4.9
      },
      image: "/atlaspayx-dashboard-ready-to-upload/voice-over.png",
      price: 40,
      rating: 4.9,
      reviews: 756,
      category: "Music & Audio",
      tags: ["Voice Over", "Narration", "Professional"],
      delivery: "1 day"
    },
    {
      id: 6,
      title: "I will create AI-powered solutions for your business",
      seller: {
        name: "Lisa Thompson",
        avatar: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/9h78gdfd-di5j-9k3j-ej2k-dh0g9f7i6j8k/JPEG_20210710_178901_678901234.jpg",
        level: "Level 2 Seller",
        rating: 4.8
      },
      image: "/atlaspayx-dashboard-ready-to-upload/AI Development.png",
      price: 200,
      rating: 4.8,
      reviews: 312,
      category: "AI Services",
      tags: ["AI Development", "Machine Learning", "Automation"],
      delivery: "7 days"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FiStar key="half" className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="star" />);
    }

    return stars;
  };

  return (
    <section className="featured-services section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Services</h2>
          <p className="section-subtitle">
            Hand-picked services from our top-rated sellers
          </p>
        </div>

        <div className="services-grid">
          {featuredServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-image-container">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                />
                <button className="favorite-btn">
                  <FiHeart />
                </button>
                <div className="service-category">{service.category}</div>
              </div>

              <div className="service-content">
                <div className="seller-info">
                  <img
                    src={service.seller.avatar}
                    alt={service.seller.name}
                    className="seller-avatar"
                  />
                  <div className="seller-details">
                    <span className="seller-name">{service.seller.name}</span>
                    <span className="seller-level">{service.seller.level}</span>
                  </div>
                </div>

                <Link to={`/service/${service.id}`} className="service-link">
                  <h3 className="service-title">{service.title}</h3>
                </Link>

                <div className="service-rating">
                  <div className="stars">
                    {renderStars(service.rating)}
                  </div>
                  <span className="rating-text">
                    {service.rating} ({service.reviews})
                  </span>
                </div>

                <div className="service-tags">
                  {service.tags.map((tag, index) => (
                    <span key={index} className="service-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="service-footer">
                  <div className="service-delivery">
                    <span className="delivery-time">{service.delivery} delivery</span>
                  </div>
                  <div className="service-price">
                    <span className="price-label">Starting at</span>
                    <span className="price">${service.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="featured-cta text-center">
          <Link to="/services" className="btn btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;