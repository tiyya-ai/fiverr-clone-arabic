import React, { useState } from 'react';
import { 
  FiX, 
  FiEye, 
  FiEyeOff, 
  FiMail, 
  FiLock, 
  FiUser,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    userType: 'buyer'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      let result;
      if (mode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData);
      }
      
      if (result.success) {
        onClose();
        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          phone: '',
          country: '',
          userType: 'buyer'
        });
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
    alert(`${provider} login would be implemented here`);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
      userType: 'buyer'
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2>{mode === 'login' ? 'Sign in to Fiverr' : 'Join Fiverr'}</h2>
          <button className="auth-modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="auth-modal-body">
          {/* Social Login Buttons */}
          <div className="social-login">
            <button 
              className="social-btn google"
              onClick={() => handleSocialLogin('Google')}
            >
              <FcGoogle />
              Continue with Google
            </button>
            <button 
              className="social-btn facebook"
              onClick={() => handleSocialLogin('Facebook')}
            >
              <FaFacebook />
              Continue with Facebook
            </button>
            <button 
              className="social-btn apple"
              onClick={() => handleSocialLogin('Apple')}
            >
              <FaApple />
              Continue with Apple
            </button>
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {errors.general && (
              <div className="error-message general">
                {errors.general}
              </div>
            )}

            {mode === 'register' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>الاسم الأول</label>
                    <div className="input-container">
                      <FiUser className="input-icon" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className={errors.firstName ? 'error' : ''}
                      />
                    </div>
                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label>الاسم الأخير</label>
                    <div className="input-container">
                      <FiUser className="input-icon" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        className={errors.lastName ? 'error' : ''}
                      />
                    </div>
                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>أريد أن</label>
                  <div className="user-type-selector">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="userType"
                        value="buyer"
                        checked={formData.userType === 'buyer'}
                        onChange={handleInputChange}
                      />
                      <span className="radio-custom"></span>
                      أوظف مستقلين
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="userType"
                        value="seller"
                        checked={formData.userType === 'seller'}
                        onChange={handleInputChange}
                      />
                      <span className="radio-custom"></span>
                      أعمل كمستقل
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <div className="input-container">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>كلمة المرور</label>
              <div className="input-container">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {mode === 'register' && (
              <div className="form-group">
                <label>تأكيد كلمة المرور</label>
                <div className="input-container">
                  <FiLock className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            )}

            {mode === 'login' && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  تذكرني
                </label>
                <button type="button" className="forgot-password">
                  هل نسيت كلمة المرور؟
                </button>
              </div>
            )}

            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'
              )}
            </button>
          </form>

          {mode === 'register' && (
            <div className="terms-notice">
              بالانضمام، فإنك توافق على{' '}
              <a href="/terms" target="_blank">شروط الخدمة</a> و{' '}
              <a href="/privacy" target="_blank">سياسة الخصوصية</a>.
            </div>
          )}
        </div>

        <div className="auth-modal-footer">
          <p>
            {mode === 'login' ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}{' '}
            <button className="switch-mode-btn" onClick={switchMode}>
              {mode === 'login' ? 'انضم هنا' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;