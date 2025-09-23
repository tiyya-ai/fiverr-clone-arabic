import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Categories.css';

const Categories = () => {
  const categories = [
    {
      id: 'graphics',
      name: 'Graphics & Design',
      image: '/atlaspayx-dashboard-ready-to-upload/graphics-design-thin-ff38893.svg',
      smallImage: '/atlaspayx-dashboard-ready-to-upload/logo-design.png'
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      image: '/atlaspayx-dashboard-ready-to-upload/digital-marketing-thin-68edb44.svg',
      smallImage: '/atlaspayx-dashboard-ready-to-upload/social-media-marketing.png'
    },
    {
      id: 'writing',
      name: 'Writing & Translation',
      image: '/atlaspayx-dashboard-ready-to-upload/writing-translation-thin-fd3699b.svg',
      smallImage: '/atlaspayx-dashboard-ready-to-upload/Book Design.png'
    },
    {
      id: 'video',
      name: 'Video & Animation',
      image: '/atlaspayx-dashboard-ready-to-upload/video-animation-thin-9d3f24d.svg',
      smallImage: '/atlaspayx-dashboard-ready-to-upload/video-editing.png'
    },
    {
      id: 'music',
      name: 'Music & Audio',
      image: '/atlaspayx-dashboard-ready-to-upload/music-audio-thin-43a9801.svg',
      smallImage: '/atlaspayx-dashboard-ready-to-upload/voice-over.png'
    },
    {
      id: 'programming',
      name: 'Programming & Tech',
      image: '/atlaspayx-dashboard-ready-to-upload/programming-tech-thin-56382a2.svg',
      smallImage: '/atlaspayx-dashboard-ready-to-upload/website-development.png'
    },
    {
      id: 'business',
      name: 'Business',
      image: '/atlaspayx-dashboard-ready-to-upload/business-thin-885e68e.svg',
      smallImage: '/atlaspayx-dashboard-ready-to-upload/consulting-thin-d5547ff.svg'
    },
    {
      id: 'ai-services',
      name: 'AI Services',
      image: '/atlaspayx-dashboard-ready-to-upload/ai-services-thin-104f389.svg',
      smallImage: '/atlaspayx-dashboard-ready-to-upload/AI Development.png'
    },
    {
      id: 'seo',
      name: 'SEO',
      image: '/atlaspayx-dashboard-ready-to-upload/digital-marketing-thin-68edb44.svg',
      smallImage: '/atlaspayx-dashboard-ready-to-upload/seo.png'
    }
  ];

  return (
    <section className="categories">
      <div className="categories-container">
        <div className="section-header">
          <h2 className="section-title">Popular services</h2>
        </div>

        <div className="categories-slider">
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/services?category=${category.id}`}
                className="category-card"
              >
                <div className="category-image">
                  <Image 
                    src={category.smallImage} 
                    alt={category.name}
                    width={80}
                    height={80}
                    className="category-img"
                  />
                </div>
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;