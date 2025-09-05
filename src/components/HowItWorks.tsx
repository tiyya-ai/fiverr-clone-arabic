'use client'

import { Search, MessageCircle, CreditCard, CheckCircle } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Find the right service',
      description: 'Browse through thousands of services or use our search to find exactly what you need for your project.'
    },
    {
      icon: MessageCircle,
      title: 'Discuss your project',
      description: 'Chat with freelancers to discuss your requirements, timeline, and budget before placing an order.'
    },
    {
      icon: CreditCard,
      title: 'Make secure payment',
      description: 'Pay securely through our platform. Your money is held safely until you approve the completed work.'
    },
    {
      icon: CheckCircle,
      title: 'Get your project',
      description: 'Receive your completed project on time. Request revisions if needed, then approve and rate your experience.'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to find and hire the perfect freelancer for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="text-center group">
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2" />
                  )}
                </div>

                {/* Step Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join millions of people who use our platform to turn their ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Find Services
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                Become a Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks