'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  FiSearch, 
  FiUser, 
  FiMenu, 
  FiX, 
  FiGlobe, 
  FiLogOut, 
  FiSettings, 
  FiChevronDown, 
  FiMessageCircle, 
  FiBarChart2, 
  FiHeart, 
  FiShoppingCart, 
  FiBriefcase, 
  FiStar 
} from 'react-icons/fi';
import AuthModal from '../Auth/AuthModal';
import LoginModal from '../LoginModal';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';
import Image from 'next/image';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setIsMenuOpen(false);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  // Navigation items
  const navItems = [
    { name: 'Explore', path: '/services' },
    { name: 'Become a Seller', path: '/become-seller' },
  ];

  // Categories dropdown items
  const categories = [
    { name: 'Graphics & Design', path: '/categories/graphics-design' },
    { name: 'Digital Marketing', path: '/categories/digital-marketing' },
    { name: 'Writing & Translation', path: '/categories/writing-translation' },
    { name: 'Video & Animation', path: '/categories/video-animation' },
    { name: 'Music & Audio', path: '/categories/music-audio' },
    { name: 'Programming & Tech', path: '/categories/programming-tech' },
    { name: 'Business', path: '/categories/business' },
    { name: 'Lifestyle', path: '/categories/lifestyle' },
  ];

  return (
    <div className="header-wrapper">
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-top-bar">
          <div className="header-container">
            <div className="header-top-content">
              <div className="top-links">
                <span>Fiverr Business</span>
                <span>Explore</span>
                <span>English</span>
                <span>$ USD</span>
                <span>Become a Seller</span>
              </div>
              {!isAuthenticated ? (
                <div className="auth-links">
                  <button onClick={openLoginModal}>Sign In</button>
                  <button className="join-btn" onClick={() => openAuthModal('register')}>Join</button>
                </div>
              ) : (
                <div className="user-menu">
                  <button className="user-avatar" onClick={toggleUserMenu}>
                    {user?.profileImage ? (
                      <Image src={user.profileImage} alt={user.name} width={32} height={32} />
                    ) : (
                      <FiUser />
                    )}
                    {user?.name && <span>{user.name.split(' ')[0]}</span>}
                    <FiChevronDown className={`dropdown-arrow ${showUserMenu ? 'active' : ''}`} />
                  </button>
                  {showUserMenu && (
                    <div className="dropdown-menu">
                      <div className="dropdown-header">
                        <div className="user-info">
                          <div className="user-avatar">
                            {user?.profileImage ? (
                              <Image src={user.profileImage} alt={user.name} width={40} height={40} />
                            ) : (
                              <FiUser />
                            )}
                          </div>
                          <div>
                            <h4>{user?.name || 'User'}</h4>
                            <p>@{user?.username || 'username'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link to="/dashboard" className="dropdown-item">
                        <FiUser /> Dashboard
                      </Link>
                      <Link to="/dashboard/orders" className="dropdown-item">
                        <FiShoppingCart /> Orders
                      </Link>
                      <Link to="/dashboard/messages" className="dropdown-item">
                        <FiMessageCircle /> Messages
                      </Link>
                      <Link to="/dashboard/listings" className="dropdown-item">
                        <FiBriefcase /> My Gigs
                      </Link>
                      <Link to="/dashboard/reviews" className="dropdown-item">
                        <FiStar /> Reviews
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link to="/dashboard/settings" className="dropdown-item">
                        <FiSettings /> Settings
                      </Link>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FiLogOut /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="main-header">
          <div className="header-container">
            <div className="header-content">
              <Link to="/" className="logo">
                <span className="logo-text">fiverr</span>
              </Link>
              <nav className="main-nav">
                <div className="nav-dropdown">
                  <span className="nav-link dropdown-trigger">
                    Fiverr Pro
                    <span className="new-badge">NEW</span>
                  </span>
                </div>
                <Link to="/explore" className="nav-link">Explore</Link>
                <div className="nav-dropdown">
                  <span className="nav-link dropdown-trigger">
                    English <FiChevronDown />
                  </span>
                </div>
                <Link to="/become-seller" className="nav-link">Become a Seller</Link>
                {!isAuthenticated ? (
                  <>
                    <button 
                      className="btn btn-text" 
                      onClick={() => openAuthModal('login')}
                    >
                      Sign in
                    </button>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => openAuthModal('register')}
                    >
                      Join
                    </button>
                  </>
                ) : (
                  <div className="user-menu">
                    <button className="user-menu-trigger" onClick={toggleUserMenu}>
                      <FiMessageCircle className="nav-icon" />
                    </button>
                    <button className="user-menu-trigger" onClick={toggleUserMenu}>
                      <FiHeart className="nav-icon" />
                    </button>
                    <button className="user-menu-trigger" onClick={toggleUserMenu}>
                      <FiUser className="nav-icon" />
                      <FiChevronDown />
                    </button>
                  </div>
                )}
              </nav>

              <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>

            <div className="search-bar-container">
              <form className="search-form" onSubmit={handleSearch}>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="What service are you looking for today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-btn">
                    <FiSearch />
                  </button>
                </div>
              </form>
            </div>

            {isMenuOpen && (
              <div className="mobile-menu">
                <div className="mobile-search">
                  <form onSubmit={handleSearch} className="search-form">
                    <input
                      type="text"
                      placeholder="What service are you looking for?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                    <button type="submit" className="search-button">
                      <FiSearch className="search-icon" />
                    </button>
                  </form>
                </div>
                
                <div className="mobile-nav">
                  {navItems.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className="mobile-nav-item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {isAuthenticated ? (
                    <>
                      <Link to="/dashboard" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                      </Link>
                      <Link to="/dashboard/orders" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
                        My Orders
                      </Link>
                      <Link to="/dashboard/messages" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
                        Messages
                      </Link>
                      <button className="mobile-nav-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="mobile-nav-item"
                        onClick={() => {
                          openAuthModal('login');
                          setIsMenuOpen(false);
                        }}
                      >
                        Sign In
                      </button>
                      <button 
                        className="mobile-nav-item"
                        onClick={() => {
                          openAuthModal('register');
                          setIsMenuOpen(false);
                        }}
                      >
                        Join
                      </button>
                    </>
                  )}
                </div>
                
                <div className="mobile-categories">
                  <h3>Categories</h3>
                  {categories.map((category) => (
                    <Link 
                      key={category.path} 
                      to={category.path} 
                      className="category-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        initialMode={authMode}
      />

      <LoginModal 
        isOpen={showLoginModal}
        onClose={closeLoginModal}
      />

      {showUserMenu && (
        <div className="user-menu-overlay" onClick={() => setShowUserMenu(false)}></div>
      )}
    </div>
  );
};

export default Header;
