import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { categories } from '@/data/categories';
import CategoryIcon from '@/components/Icons/CategoryIcon';
import './Categories.css';

// Single category card component
const CategoryCard = memo(({ category, className = '' }) => (
  <a
    href={category.url}
    className={`group flex flex-col items-center text-center p-4 border border-slate-200 rounded-xl bg-white hover:border-[#1ab7ea] hover:shadow-lg transition-all duration-300 ${className}`}
  >
    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3">
      <CategoryIcon 
        categoryKey={category.icon}
        size={className.includes('mobile') ? 'sm' : 'md'}
        useExternal={true}
        showFallback={true}
        variant="minimal"
      />
    </div>
    <h4 
      className="font-bold text-slate-800 group-hover:text-[#1ab7ea] text-xs md:text-sm leading-tight text-center transition-colors duration-300" 
      dir="rtl"
    >
      {category.name}
    </h4>
  </a>
));

CategoryCard.displayName = 'CategoryCard';

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string
};

// Main Categories component
const Categories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">الأصناف</h2>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map(category => (
            <CategoryCard 
              key={category.id}
              category={category}
              className="desktop"
            />
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {categories.slice(0, 12).map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              className="mobile"
            />
          ))}
        </div>
        
        {/* View More Button - Mobile Only */}
        <div className="text-center mt-6 md:hidden">
          <a
            href="/services"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1ab7ea] to-[#0ea5d9] hover:from-[#0ea5d9] hover:to-[#0288c7] text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>عرض جميع الخدمات</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Categories);