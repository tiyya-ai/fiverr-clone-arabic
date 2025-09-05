'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Globe } from 'lucide-react'

const Footer = () => {
  const footerSections = [
    {
      title: 'روابط مهمة',
      links: [
        { name: 'الرئيسية', href: '/' },
        { name: 'الأسئلة الشائعة', href: '/faq' },
        { name: 'الشروط والأحكام', href: '/terms' },
        { name: 'سياسة الخصوصية', href: '/privacy' },
        { name: 'ضمان الجودة', href: '/guarantee' },
        { name: 'مركز المساعدة', href: '/help' },
        { name: 'نزاع', href: '/dispute' }
      ]
    },
    {
      title: 'الأقسام الرئيسية',
      links: [
        { name: 'صيانة الكهرباء', href: '/services?category=صيانة الكهرباء' },
        { name: 'صيانة السباكة', href: '/services?category=صيانة السباكة' },
        { name: 'صيانة التكييف', href: '/services?category=صيانة التكييف' },
        { name: 'أعمال النجارة', href: '/services?category=أعمال النجارة' },
        { name: 'كاميرات المراقبة', href: '/services?category=كاميرات المراقبة' },
        { name: 'البناء والمقاولات', href: '/services?category=البناء والمقاولات' }
      ]
    },
    {
      title: 'الدعم الفني',
      links: [
        { name: 'المساعدة والدعم', href: '/support' },
        { name: 'الأسئلة الشائعة', href: '/faq' },
        { name: 'الخدمات', href: '/services' },
        { name: 'تواصل معنا', href: '/contact' },
        { name: 'شروط الخدمة', href: '/terms-of-service' },
        { name: 'اشتراك', href: '/subscribe' }
      ]
    },
    {
      title: 'المجتمع',
      links: [
        { name: 'قصص النجاح', href: '/success-stories' },
        { name: 'المنتدى', href: '/forum' },
        { name: 'المدونة', href: '/blog' },
        { name: 'الأحداث', href: '/events' },
        { name: 'الشراكات', href: '/partnerships' },
        { name: 'ادعُ أصدقاءك', href: '/invite' }
      ]
    }
  ]

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/fiverr', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/fiverr', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com/company/fiverr', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/fiverr', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/fiverr', label: 'YouTube' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index} dir="rtl">
              <h3 className="font-bold text-lg mb-4 text-right">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm block text-right"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Logo and Copyright */}
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center">
                <img 
                  src="https://wbl3.com/wp-content/uploads/2022/09/1042165_6877-Converted-1-768x308-1.webp" 
                  alt="WBL3" 
                  className="h-10 brightness-0 invert" 
                />
              </Link>
              <p className="text-gray-400 text-sm">
                © 2024 WBL3. جميع الحقوق محفوظة.
              </p>
            </div>

            {/* Social Links and Settings */}
            <div className="flex items-center space-x-6">
              {/* Social Media */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>

              {/* Language and Currency */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors border border-gray-600 rounded px-3 py-1 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>العربية</span>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors border border-gray-600 rounded px-3 py-1 text-sm">
                  ر.س SAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer