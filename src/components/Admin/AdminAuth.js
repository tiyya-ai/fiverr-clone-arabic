import React from 'react';
const { useState, createContext, useContext, useEffect } = React;
import { FiLock, FiUser, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import './AdminAuth.css';

// Admin Authentication Context
const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

// Admin users from environment variables (cached for performance)
const ADMIN_USERS = [
  {
    id: 1,
    username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    email: 'admin@fiverr-clone.com',
    role: 'super_admin',
    permissions: ['all'],
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 2,
    username: process.env.NEXT_PUBLIC_MOD_USERNAME || 'moderator',
    password: process.env.MOD_PASSWORD || 'mod123',
    email: 'moderator@fiverr-clone.com',
    role: 'moderator',
    permissions: ['manage_users', 'manage_services', 'view_reports'],
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 3,
    username: process.env.NEXT_PUBLIC_SUPPORT_USERNAME || 'support',
    password: process.env.SUPPORT_PASSWORD || 'support123',
    email: 'support@fiverr-clone.com',
    role: 'support',
    permissions: ['manage_orders', 'view_users', 'respond_tickets'],
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
  }
];

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const savedAdmin = localStorage.getItem('adminUser');
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin);
        setAdminUser(adminData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse admin user data:', error);
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const admin = ADMIN_USERS.find(
      user => user.username === username && user.password === password
    );

    if (admin) {
      const { password: _, ...adminData } = admin; // Remove password from stored data
      setAdminUser(adminData);
      setIsAuthenticated(true);
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const logout = () => {
    setAdminUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminUser');
  };

  const hasPermission = (permission) => {
    if (!adminUser) return false;
    if (adminUser.permissions.includes('all')) return true;
    return adminUser.permissions.includes(permission);
  };

  const value = {
    isAuthenticated,
    adminUser,
    loading,
    login,
    logout,
    hasPermission
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin', password: '***', role: 'Super Admin' },
    { username: process.env.NEXT_PUBLIC_MOD_USERNAME || 'moderator', password: '***', role: 'Moderator' },
    { username: process.env.NEXT_PUBLIC_SUPPORT_USERNAME || 'support', password: '***', role: 'Support' }
  ];

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <FiShield size={48} />
            <h1>Admin Panel</h1>
          </div>
          <p>Sign in to access the administration dashboard</p>
        </div>

        {error && (
          <div className="error-message">
            <FiLock />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-container">
              <FiUser className="input-icon" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Credentials</h3>
          <div className="credentials-list">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="credential-item">
                <div className="credential-info">
                  <strong>{cred.role}</strong>
                  <span>Username: {cred.username}</span>
                  <span>Password: {cred.password}</span>
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
                  Use
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="login-footer">
          <p>© 2023 Fiverr Clone Admin Panel. All rights reserved.</p>
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
        <p>جاري تحميل لوحة الإدارة...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return children;
};

export default AdminLogin;
