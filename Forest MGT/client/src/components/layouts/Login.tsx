import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Shield, Leaf, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Add navigation for redirect

const USER_ROLES = [
  { id: 'visitor', name: 'Visitor', icon: User, color: 'from-emerald-600 to-teal-700' },
  { id: 'ranger', name: 'Ranger', icon: Shield, color: 'from-green-700 to-emerald-800' },
  { id: 'admin', name: 'Admin', icon: Leaf, color: 'from-green-900 to-gray-900' }
];

export default function Login() {
  const navigate = useNavigate(); // ✅ For redirecting user
  const [currentView, setCurrentView] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'visitor'
  });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'visitor'
  });
  const [forgotEmail, setForgotEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [navStack, setNavStack] = useState(['login']);
  const [attemptQueue, setAttemptQueue] = useState([]);
  
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;
  const validateRole = (role) => USER_ROLES.some((r) => r.id === role);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleRoleSelect = (roleId) => {
    setFormData((prev) => ({ ...prev, role: roleId }));
    if (errors.role) setErrors((prev) => ({ ...prev, role: '' }));
  };

  const handleSignupRoleSelect = (roleId) => {
    setSignupData((prev) => ({ ...prev, role: roleId }));
    if (errors.role) setErrors((prev) => ({ ...prev, role: '' }));
  };

  const addLoginAttempt = (email) => {
    const attempt = { email, timestamp: Date.now() };
    setAttemptQueue((prev) => {
      const newQueue = [...prev, attempt];
      return newQueue.length > 5 ? newQueue.slice(1) : newQueue;
    });
  };

  const getRecentAttempts = (email) => {
    const now = Date.now();
    const timeWindow = 300000; // 5 min
    return attemptQueue.filter(
      (a) => a.email === email && (now - a.timestamp) < timeWindow
    ).length;
  };

  // ✅ Updated handleLogin
  const handleLogin = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 8 characters';

    if (!validateRole(formData.role)) newErrors.role = 'Please select a valid role';

    const recentAttempts = getRecentAttempts(formData.email);
    if (recentAttempts >= 5) newErrors.general = 'Too many login attempts. Please try again later.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addLoginAttempt(formData.email);
    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', { ...formData, rememberMe });

      // ✅ Simulate successful login
      const fakeToken = 'ecoGuardUserToken123';
      localStorage.setItem('token', fakeToken);

      setSuccessMessage('Login successful! Redirecting...');
      
      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 1500);
  };

  const handleSignup = () => {
    const newErrors = {};

    if (!signupData.name || signupData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!signupData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(signupData.email)) newErrors.email = 'Invalid email format';

    if (!signupData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(signupData.password)) newErrors.password = 'Password must be at least 8 characters';

    if (!signupData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (signupData.password !== signupData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!validateRole(signupData.role)) newErrors.role = 'Please select a valid role';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setIsLoading(false);
      console.log('Signup attempt:', signupData);
      setSuccessMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        setSuccessMessage('');
        switchView('login');
      }, 2000);
    }, 1500);
  };

  const handleForgotPassword = () => {
    const newErrors = {};

    if (!forgotEmail) newErrors.email = 'Email is required';
    else if (!validateEmail(forgotEmail)) newErrors.email = 'Invalid email format';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Password reset link sent to your email!');
      setTimeout(() => {
        setSuccessMessage('');
        switchView('login');
      }, 2000);
    }, 1500);
  };

  const switchView = (view) => {
    setNavStack((prev) => [...prev, view]);
    setCurrentView(view);
    setErrors({});
    setSuccessMessage('');
  };

  const goBack = () => {
    if (navStack.length > 1) {
      const newStack = [...navStack];
      newStack.pop();
      setNavStack(newStack);
      setCurrentView(newStack[newStack.length - 1]);
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') action();
  };

  return (
      <div className="min-h-screen w-max relative overflow-x-hidden bg-gradient-to-br from-green-900 to-emerald-800 flex items-center justify-center p-5">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, 
              #064e3b 0%, 
              #022c22 3.33%, 
              #000000 6.66%, 
              #0a3d2e 10%, 
              #022c22 13.33%, 
              #14532d 16.66%, 
              #052e16 20%, 
              #000000 23.33%, 
              #064e3b 26.66%, 
              #111827 30%, 
              #000000 33.33%, 
              #022c22 36.66%, 
              #064e3b 40%, 
              #052e16 43.33%, 
              #000000 46.66%, 
              #0a3d2e 50%, 
              #064e3b 53.33%, 
              #022c22 56.66%, 
              #14532d 60%, 
              #000000 63.33%, 
              #064e3b 66.66%, 
              #052e16 70%, 
              #000000 73.33%, 
              #022c22 76.66%, 
              #14532d 80%, 
              #064e3b 83.33%, 
              #000000 86.66%, 
              #0a3d2e 90%, 
              #000000 93.33%, 
              #022c22 96.66%, 
              #064e3b 100%)`,
            backgroundSize: '400% 400%',
            animation: 'slowerDeepFlow 16s ease-in-out infinite',
          }}
        ></div>
        
        {/* Overlay for enhanced darker depth */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, 
              rgba(6, 78, 59, 0.6) 0%, 
              rgba(2, 44, 34, 0.8) 10%, 
              rgba(0, 0, 0, 0.9) 20%, 
              rgba(10, 61, 46, 0.7) 30%, 
              rgba(0, 0, 0, 0.95) 40%, 
              rgba(5, 46, 22, 0.8) 50%, 
              rgba(6, 78, 59, 0.6) 60%, 
              rgba(0, 0, 0, 0.9) 70%, 
              rgba(2, 44, 34, 0.8) 80%, 
              rgba(0, 0, 0, 0.95) 90%, 
              rgba(6, 78, 59, 0.6) 100%)`,
            backgroundSize: '300% 300%',
            animation: 'slowerDeepFlow 12s ease-in-out infinite reverse',
          }}
        ></div>
      </div>
      
      {/* Dynamic flowing particles with darker tones */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-900/30 rounded-full filter blur-3xl" style={{ animation: 'particle1 14s ease-in-out infinite' }}></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-green-950/35 rounded-full filter blur-3xl" style={{ animation: 'particle2 16s ease-in-out infinite' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-black/50 rounded-full filter blur-3xl" style={{ animation: 'particle3 18s ease-in-out infinite' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-950/25 rounded-full filter blur-2xl" style={{ animation: 'particle4 15s ease-in-out infinite' }}></div>
      </div>
      
      <style>{`
        @keyframes slowerDeepFlow {
          0% { 
            background-position: 0% 50%;
          }
          50% { 
            background-position: 100% 50%;
          }
          100% { 
            background-position: 0% 50%;
          }
        }
        
        @keyframes particle1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(-50px, 80px) scale(1.2); opacity: 0.4; }
          50% { transform: translate(30px, -60px) scale(0.9); opacity: 0.35; }
          75% { transform: translate(70px, 40px) scale(1.1); opacity: 0.33; }
        }
        
        @keyframes particle2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          33% { transform: translate(60px, -70px) scale(1.3); opacity: 0.45; }
          66% { transform: translate(-80px, 50px) scale(0.85); opacity: 0.38; }
        }
        
        @keyframes particle3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-40px, -90px) scale(1.4); opacity: 0.6; }
        }
        
        @keyframes particle4 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          40% { transform: translate(90px, 60px) scale(1.25); opacity: 0.35; }
          80% { transform: translate(-60px, -40px) scale(0.95); opacity: 0.28; }
        }
      `}</style>
      
      <div className="w-full max-w-md relative z-10 my-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full mb-3 shadow-2xl">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">EcoGuard</h1>
          <p className="text-emerald-300 text-[10px] sm:text-xs md:text-sm">Wildlife Management System</p>

        </div>
        
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-7">
          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
          
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}
          
          {currentView === 'login' ? (
            <div>
              <div className="mb-5">
                <label className="block text-gray-800 text-sm font-semibold mb-2">Select Your Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {USER_ROLES.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => handleRoleSelect(role.id)}
                        className={`relative p-3 rounded-xl transition-all duration-300 ${
                          formData.role === role.id
                            ? `bg-gradient-to-br ${role.color} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-1" />
                        <span className="text-xs font-medium block">{role.name}</span>
                        {formData.role === role.id && (
                          <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-white rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-gray-800 text-sm font-semibold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                      className={`w-full pl-11 pr-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-red-600 text-xs">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-gray-800 text-sm font-semibold mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                      className={`w-full pl-11 pr-12 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-red-600 text-xs">{errors.password}</p>}
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => switchView('forgot')}
                    className="text-sm text-emerald-700 hover:text-emerald-800 font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
                
                <div className="text-center">
                  <span className="text-sm text-gray-600">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => switchView('signup')}
                    className="text-sm text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          ) : currentView === 'signup' ? (
            <div>
              <div className="mb-4">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-sm text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1"
                >
                  ← Back to Login
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-5 text-center">Join EcoGuard and protect our wildlife</p>

              
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm font-semibold mb-2">Select Your Role</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {USER_ROLES.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => handleSignupRoleSelect(role.id)}
                          className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                            signupData.role === role.id
                              ? `bg-gradient-to-br ${role.color} text-white shadow-lg scale-105`
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Icon className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-xs font-medium block">{role.name}</span>
                          {signupData.role === role.id && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="signup-name" className="block text-gray-800 text-sm font-semibold mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="signup-name"
                      name="name"
                      value={signupData.name}
                      onChange={handleSignupInputChange}
                      className={`w-full pl-11 pr-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-red-600 text-xs">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="signup-email" className="block text-gray-800 text-sm font-semibold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="signup-email"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupInputChange}
                      className={`w-full pl-11 pr-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-red-600 text-xs">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="signup-password" className="block text-gray-800 text-sm font-semibold mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="signup-password"
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupInputChange}
                      className={`w-full pl-11 pr-12 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-red-600 text-xs">{errors.password}</p>}
                </div>
                
                <div>
                  <label htmlFor="signup-confirm-password" className="block text-gray-800 text-sm font-semibold mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="signup-confirm-password"
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupInputChange}
                      onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                      className={`w-full pl-11 pr-12 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-red-600 text-xs">{errors.confirmPassword}</p>}
                </div>
                
                <button
                  type="button"
                  onClick={handleSignup}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
                
                <div className="text-center">
                  <span className="text-sm text-gray-600">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => switchView('login')}
                    className="text-sm text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-sm text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1"
                >
                  ← Back to Login
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
              <p className="text-gray-600 text-sm mb-6">Enter your email address and we'll send you a link to reset your password.</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="forgot-email" className="block text-gray-800 text-sm font-semibold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="forgot-email"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        if (errors.email) setErrors({});
                      }}
                      onKeyPress={(e) => handleKeyPress(e, handleForgotPassword)}
                      className={`w-full pl-11 pr-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-red-600 text-xs">{errors.email}</p>}
                </div>
                
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </div>
          )}
        </div>
        
        <p className="text-center text-emerald-200 text-[10px] sm:text-xs md:text-sm mt-6 px-2">
         © 2025 EcoGuard System. All rights reserved.
        </p>

      </div>
    </div>
  );
}