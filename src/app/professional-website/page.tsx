'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Clock, Shield, CheckCircle, ChevronDown, ChevronUp, MessageCircle, Heart } from 'lucide-react';

export default function ProfessionalWebsitePage() {
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const packages = {
    basic: {
      name: 'Basic',
      price: 150,
      delivery: '5 days',
      features: [
        'Responsive web design',
        'Up to 5 pages',
        'Basic SEO optimization',
        'Contact form integration'
      ]
    },
    standard: {
      name: 'Standard',
      price: 200,
      delivery: '7 days',
      features: [
        'Everything in Basic',
        'Up to 10 pages',
        'Advanced SEO optimization',
        'Social media integration',
        'Analytics setup',
        '2 rounds of revisions'
      ]
    },
    premium: {
      name: 'Premium',
      price: 350,
      delivery: '10 days',
      features: [
        'Everything in Standard',
        'Unlimited pages',
        'E-commerce functionality',
        'Custom animations',
        'Performance optimization',
        'Unlimited revisions',
        '30 days support'
      ]
    }
  };

  const faqs = [
    {
      question: 'How long will it take to complete my website?',
      answer: 'Typically, the Basic Package takes 5-7 days to complete, depending on the complexity of the design and the responsiveness of the client during the revision process.'
    },
    {
      question: 'Will my website be mobile-friendly?',
      answer: 'Yes, all websites are designed to be fully responsive and mobile-friendly. We ensure optimal viewing experience across all devices including desktops, tablets, and smartphones.'
    },
    {
      question: 'Can I add more pages to my website later?',
      answer: 'Absolutely! You can always upgrade your package or request additional pages. We offer flexible solutions to accommodate your growing business needs.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We provide comprehensive support including initial setup, training on how to manage your website, and ongoing technical support based on your selected package.'
    },
    {
      question: 'Additional support and maintenance period?',
      answer: 'Basic package includes 7 days of support, Standard includes 15 days, and Premium includes 30 days of comprehensive support and maintenance.'
    }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Highly Recommended! Ana delivered exactly what we needed for our website. The attention to detail and professional approach made the entire process smooth. I highly recommend working with her again in the future for any website design needs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-orange-500 font-bold text-xl">Workspace</span>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">Main</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Explore</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Find By Categories</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600">Freelancers</button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Post a Job</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Title */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <span>★★★★★</span>
                <span>4.9/5.0</span>
                <span>(1,000 reviews)</span>
                <span>•</span>
                <span>10+ years</span>
                <span>•</span>
                <span>Saudi</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Professional website for your business
              </h1>
            </div>

            {/* Service Images */}
            <div className="mb-8">
              <div className="relative h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">Professional Website Design</h3>
                  <p className="text-gray-500 mt-2">Custom business website with modern design</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About this service</h2>
              <p className="text-gray-700 mb-4">
                I will create a professional website that perfectly represents your business and engages your audience. 
                My services include creating a professional online presence that reflects your brand and engages your audience.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Responsive and mobile-friendly design to ensure optimal viewing experience across all devices</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>SEO-friendly optimization and technical layout for business growth</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Integration of high-quality images, graphics and multimedia elements to enhance visual appeal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom use of colors, typography, and branding elements to enhance your brand identity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Implementation of interactive features such as contact forms, social media integration, and user-friendly navigation menus</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Optimization for speed, performance, and search engine visibility (SEO)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Cross-browser compatibility and technical support for seamless user experience across different browsers and devices</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Testing and debugging to ensure a flawless browsing experience for visitors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Training and guidance on how to manage and update your website independently</span>
                </div>
              </div>

              <p className="text-gray-700 mt-4">
                With years of experience in web design and a commitment to excellence, I am dedicated to delivering a 
                website that not only meets but exceeds your expectations. Let's work together to create a professional 
                website that showcases your unique offerings and captivates your target audience.
              </p>

              <p className="text-gray-700 mt-4">
                Let's create a professional website that showcases your unique offerings and captivates your audience. 
                I am here to help you discuss your project requirements and get started on creating your online presence.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-3 text-gray-700">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">1 Client review (★★★★★ 5.0 Overall rating)</h2>
              </div>
              
              {reviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Package Selection */}
              <div className="bg-white rounded-lg border p-6 mb-6">
                <div className="flex space-x-1 mb-4">
                  {Object.entries(packages).map(([key, pkg]) => (
                    <button
                      key={key}
                      className={`flex-1 py-2 px-3 text-sm font-medium rounded ${
                        selectedPackage === key
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedPackage(key)}
                    >
                      {pkg.name}
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ${packages[selectedPackage as keyof typeof packages].price}.00
                  </div>
                  <p className="text-gray-600 text-sm">
                    Upgrade to a website with up to 10 pages, enhanced 
                    SEO, and social media integration.
                  </p>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Delivery time: {packages[selectedPackage as keyof typeof packages].delivery}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {packages[selectedPackage as keyof typeof packages].features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors mb-3">
                  Continue (${packages[selectedPackage as keyof typeof packages].price})
                </button>

                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Contact me
                </button>
              </div>

              {/* Seller Info */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">AA</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Ana Anderson</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span>4.9 (1,000)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From</span>
                    <span className="font-medium">$150.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Price</span>
                    <span className="font-medium">United States $200</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200">
                    Ask Seller
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200">
                    Add Description
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Contact Rating</span>
                    <span className="font-medium">Responsive</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Order Completion</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Delivery Time</span>
                    <span className="font-medium">On time</span>
                  </div>
                </div>

                <button className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium mt-4 hover:bg-orange-600">
                  View profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}