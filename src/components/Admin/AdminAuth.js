import React, { useState, createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import { FiLock, FiUser, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import './AdminAuth.css';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(() => {
    try {
      const savedAdmin = localStorage.getItem('adminUser');
      if (savedAdmin) {
        const adminData = JSON.parse(savedAdmin);
        if (adminData?.id && adminData?.username) {
          setAdminUser(adminData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminUser');
        }
      }
    } catch {
      localStorage.removeItem('adminUser');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (username, password) => {
    if (!username || !password) {
      return { success: false, error: 'Invalid credentials' };
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username === 'admin' && password === 'demo123') {
        const user = { id: 1, username: 'admin', role: 'admin' };
        setAdminUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('adminUser', JSON.stringify(user));
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch {
      return { success: false, error: 'Login failed' };
    }
  }, []);

  const logout = useCallback(() => {
    setAdminUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminUser');
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    adminUser,
    loading,
    login,
    logout
  }), [isAuthenticated, adminUser, loading, login, logout]);

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.trim() }));
    if (error) setError('');
  }, [error]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password);
      if (!result.success) {
        setError(result.error);
      }
    } catch {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  }, [formData, loading, login]);

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

          <button type="submit" className="login-btn" disabled={loading}>
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
            <div className="credential-item">
              <div className="credential-info">
                <strong>Admin</strong>
                <span>Username: admin</span>
                <span>Password: demo123</span>
              </div>
              <button
                type="button"
                className="use-credential-btn"
                onClick={() => setFormData({ username: 'admin', password: '' })}
              >
                Use
              </button>
            </div>
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
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return children;
};

export default AdminLogin;