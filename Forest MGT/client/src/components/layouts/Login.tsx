import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setLoginSuccess(false);

    // Simulate API call
    setTimeout(() => {
      const fakeToken = "abc123";
      localStorage.setItem("token", fakeToken);
      window.dispatchEvent(new Event("storage"));
      navigate("/dashboard"); // ✅ redirect after login

      setIsLoading(false);
      setLoginSuccess(true);
      console.log('Login attempted with:', { email, password, rememberMe });

      // Reset success message after 3 seconds
      setTimeout(() => setLoginSuccess(false), 3000);
    }, 1500);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: undefined });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F1F8E9' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#1B5E20' }}>
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue to your account</p>
          </div>

          {loginSuccess && (
            <div className="mb-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#E8F5E9', border: '1px solid #1B5E20' }}>
              <CheckCircle className="w-5 h-5" style={{ color: '#1B5E20' }} />
              <span className="text-sm font-medium" style={{ color: '#1B5E20' }}>Login successful!</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                  style={!errors.email ? { outline: 'none' } : {}}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <div className="mt-2 flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className={`block w-full pl-10 pr-12 py-3 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="mt-2 flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-2 cursor-pointer"
                  style={{ accentColor: '#1B5E20' }}
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm font-medium hover:underline"
                style={{ color: '#1B5E20' }}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#1B5E20' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              className="font-medium hover:underline"
              style={{ color: '#1B5E20' }}
            >
              Sign up
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our{' '}
          <button type="button" className="underline hover:text-gray-700">Terms of Service</button>
          {' '}and{' '}
          <button type="button" className="underline hover:text-gray-700">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
}
