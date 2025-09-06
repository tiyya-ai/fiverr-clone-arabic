import React from 'react';
import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">الفئات</h3>
            <ul className="footer-links">
              <li><Link href="/services?category=graphics">التصميم والجرافيك</Link></li>
              <li><Link href="/services?category=writing">الكتابة والترجمة</Link></li>
              <li><Link href="/services?category=video">الفيديو والرسوم المتحركة</Link></li>
              <li><Link href="/services?category=music">الموسيقى والصوت</Link></li>
              <li><Link href="/services?category=programming">البرمجة والتقنية</Link></li>
              <li><Link href="/services?category=business">الأعمال</Link></li>
              <li><Link href="/services?category=lifestyle">نمط الحياة</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">حولنا</h3>
            <ul className="footer-links">
              <li><Link href="/about">من نحن</Link></li>
              <li><Link href="/careers">الوظائف</Link></li>
              <li><Link href="/press">الصحافة والأخبار</Link></li>
              <li><Link href="/partnerships">الشراكات</Link></li>
              <li><Link href="/privacy">سياسة الخصوصية</Link></li>
              <li><Link href="/terms">شروط الخدمة</Link></li>
              <li><Link href="/intellectual-property">مطالبات الملكية الفكرية</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">الدعم</h3>
            <ul className="footer-links">
              <li><Link href="/help">المساعدة والدعم</Link></li>
              <li><Link href="/trust-safety">الثقة والأمان</Link></li>
              <li><Link href="/selling">البيع على فايفر</Link></li>
              <li><Link href="/buying">الشراء من فايفر</Link></li>
              <li><Link href="/contact">اتصل بنا</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">المجتمع</h3>
            <ul className="footer-links">
              <li><Link href="/events">قصص نجاح العملاء</Link></li>
              <li><Link href="/community">مركز المجتمع</Link></li>
              <li><Link href="/forum">المنتدى</Link></li>
              <li><Link href="/events">الفعاليات</Link></li>
              <li><Link href="/blog">المدونة</Link></li>
              <li><Link href="/influencers">المؤثرون</Link></li>
              <li><Link href="/affiliates">الشركاء التابعون</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">المزيد من فايفر</h3>
            <ul className="footer-links">
              <li><Link href="/pro">فايفر برو</Link></li>
              <li><Link href="/business">فايفر بيزنس</Link></li>
              <li><Link href="/logo-maker">صانع شعار فايفر</Link></li>
              <li><Link href="/guides">أدلة فايفر</Link></li>
              <li><Link href="/workspace">مساحة عمل فايفر</Link></li>
              <li><Link href="/learn">تعلم</Link></li>
              <li><Link href="/working-not-working">يعمل لا يعمل</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-logo-section">
              <Link href="/" className="footer-logo">
                <span className="footer-logo-text">fiverr</span>
              </Link>
              <p className="footer-copyright">
                © فايفر إنترناشيونال ليميتد. 2024
              </p>
            </div>
            
            <div className="footer-social">
              <div className="social-links">
                <a href="https://twitter.com/fiverr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiTwitter />
                </a>
                <a href="https://facebook.com/fiverr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiFacebook />
                </a>
                <a href="https://linkedin.com/company/fiverr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiLinkedin />
                </a>
                <a href="https://instagram.com/fiverr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiInstagram />
                </a>
                <a href="https://youtube.com/fiverr" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiYoutube />
                </a>
              </div>
              
              <div className="footer-settings">
                <div className="language-currency">
                  <button className="footer-btn">
                    🌐 العربية
                  </button>
                  <button className="footer-btn">
                    $ USD
                  </button>
                  <button className="footer-btn">
                    👤 إمكانية الوصول
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;