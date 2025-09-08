import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import './BusinessSolutions.css';
import Image from 'next/image';

const BusinessSolutions = () => {
  const features = [
    'خبراء توظيف مخصصون',
    'ضمان الرضا',
    'أدوات إدارة مشاريع متقدمة',
    'شروط دفع مرنة'
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
              الحل المتقدم للعمل الحر للشركات
            </h3>
            <p className="business-description">
              تواصل مع مواهب مختارة بعناية، واحصل على دعم مخصص، وتعاون بسهولة.
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
              جرب فايفر برو
              <FiArrowRight />
            </Link>
          </div>
          <div className="business-image">
            <Image 
              src="/atlaspayx-dashboard-ready-to-upload/business-thin-885e68e.svg" 
              alt="حلول فايفر برو للأعمال"
              width={500}
              height={500}
              className="business-main-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;