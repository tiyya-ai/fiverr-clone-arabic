import React, { useState, createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import { FiLock, FiUser, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import './AdminAuth.css';

// Internationalization
const i18n = {
  adminPanel: 'Admin Panel',
  signIn: 'Sign in to access the administration dashboard',
  username: 'Username',
  password: 'Password',
  enterUsername: 'Enter your username',
  enterPassword: 'Enter your password',
  signInBtn: 'Sign In',
  demoCredentials: 'Demo Credentials',
  use: 'Use',
  copyright: '© 2023 Fiverr Clone Admin Panel. All rights reserved.',
  loading: 'جاري تحميل لوحة الإدارة...',
  invalidCredentials: 'Invalid username or password',
  errorOccurred: 'An error occurred. Please try again.'
};

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

// Secure admin configuration
const getAdminUsers = () => {
  const defaultAvatar = '/img/admin-avatar.jpg';
  const users = [];
  
  if (process.env.NEXT_PUBLIC_ADMIN_USERNAME) {
    users.push({
      id: 1,
      username: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD || 'demo123',
      email: 'admin@example.com',
      role: 'super_admin',
      permissions: ['all'],
      avatar: defaultAvatar
    });
  }
  
  if (process.env.NEXT_PUBLIC_MOD_USERNAME) {
    users.push({
      id: 2,
      username: process.env.NEXT_PUBLIC_MOD_USERNAME,
      password: process.env.MOD_PASSWORD || 'demo123',
      email: 'moderator@example.com',
      role: 'moderator',
      permissions: ['manage_users', 'manage_services', 'view_reports'],
      avatar: defaultAvatar
    });
  }
  
  if (process.env.NEXT_PUBLIC_SUPPORT_USERNAME) {
    users.push({
      id: 3,
      username: process.env.NEXT_PUBLIC_SUPPORT_USERNAME,
      password: process.env.SUPPORT_PASSWORD || 'demo123',
      email: 'support@example.com',
      role: 'support',
      permissions: ['manage_orders', 'view_users', 'respond_tickets'],
      avatar: defaultAvatar
    });
  }
  
  return users.length > 0 ? users : [{
    id: 1,
    username: 'admin',
    password: 'demo123',
    email: 'admin@example.com',
    role: 'super_admin',
    permissions: ['all'],
    avatar: defaultAvatar
  }];
};

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedAdmin = localStorage.getItem('adminUser');
        if (savedAdmin) {
          const adminData = JSON.parse(savedAdmin);
          if (adminData && adminData.id && adminData.username) {
            setAdminUser(adminData);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('adminUser');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('adminUser');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (username, password) => {
    if (!username || !password) {
      return { success: false, error: i18n.invalidCredentials };
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const adminUsers = getAdminUsers();
      const admin = adminUsers.find(
        user => user.username === username && user.password === password
      );

      if (admin) {
        const { password: _, ...adminData } = admin;
        setAdminUser(adminData);
        setIsAuthenticated(true);
        localStorage.setItem('adminUser', JSON.stringify(adminData));
        return { success: true };
      } else {
        return { success: false, error: i18n.invalidCredentials };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: i18n.errorOccurred };
    }
  }, []);

  const logout = useCallback(() => {
    try {
      setAdminUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('adminUser');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  const hasPermission = useCallback((permission) => {
    if (!adminUser || !adminUser.permissions) return false;
    if (adminUser.permissions.includes('all')) return true;
    return adminUser.permissions.includes(permission);
  }, [adminUser]);

  const value = useMemo(() => ({
    isAuthenticated,
    adminUser,
    loading,
    login,
    logout,
    hasPermission
  }), [isAuthenticated, adminUser, loading, login, logout, hasPermission]);

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[<>"'&]/g, '').trim();
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    if (error) setError('');
  }, [error]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError(i18n.errorOccurred);
    } finally {
      setLoading(false);
    }
  }, [formData.username, formData.password, login]);

  const demoCredentials = useMemo(() => 
    getAdminUsers().map(user => ({
      username: user.username,
      password: '***',
      role: user.role === 'super_admin' ? 'Super Admin' : user.role.charAt(0).toUpperCase() + user.role.slice(1)
    })), []);

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <FiShield size={48} />
            <h1>{i18n.adminPanel}</h1>
          </div>
          <p>{i18n.signIn}</p>
        </div>

        {error && (
          <div className="error-message">
            <FiLock />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">{i18n.username}</label>
            <div className="input-container">
              <FiUser className="input-icon" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={i18n.enterUsername}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">{i18n.password}</label>
            <div className="input-container">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={i18n.enterPassword}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <FiLock />
                {i18n.signInBtn}
              </>
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>{i18n.demoCredentials}</h3>
          <div className="credentials-list">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="credential-item">
                <div className="credential-info">
                  <strong>{cred.role}</strong>
                  <span>{i18n.username}: {cred.username}</span>
                  <span>{i18n.password}: {cred.password}</span>
                </div>
                <button
                  type="button"
                  className="use-credential-btn"
                  onClick={() => {
                    setFormData({
                      username: cred.username,
                      password: ''
                    });
                  }}
                >
                  {i18n.use}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="login-footer">
          <p>{i18n.copyright}</p>
        </div>
      </div>
    </div>
  );
};

export const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner large"></div>
        <p>{i18n.loading}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return children;
};

export default AdminLogin;