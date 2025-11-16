import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Cloud, Heart, ChevronRight, Trees, Shield, Users, TrendingUp, Zap, Target, Database, Globe } from 'lucide-react';

// ============================================
// DATA STRUCTURES IMPLEMENTATION
// ============================================

// QUEUE: For managing rotating features (FIFO - First In First Out)
class Queue<T> {
  private items: T[] = [];
  
  enqueue(item: T): void {
    this.items.push(item);
  }
  
  dequeue(): T | undefined {
    return this.items.shift();
  }
  
  peek(): T | undefined {
    return this.items[0];
  }
  
  size(): number {
    return this.items.length;
  }
  
  rotate(): void {
    const first = this.dequeue();
    if (first) this.enqueue(first);
  }
}

// STACK: For navigation history tracking (LIFO - Last In First Out)
class NavigationStack {
  private stack: string[] = [];
  
  push(page: string): void {
    this.stack.push(page);
  }
  
  pop(): string | undefined {
    return this.stack.pop();
  }
  
  peek(): string | undefined {
    return this.stack[this.stack.length - 1];
  }
  
  isEmpty(): boolean {
    return this.stack.length === 0;
  }
  
  getHistory(): string[] {
    return [...this.stack];
  }
}

// ============================================
// ALGORITHM: Parallax Scroll Effect Calculator
// Calculates element position based on scroll depth
// Time Complexity: O(1) - Constant time calculation
// ============================================
const calculateParallax = (scrollY: number, speed: number): number => {
  return scrollY * speed;
};

// ============================================
// ALGORITHM: Smooth Animation Interpolation (Linear Interpolation)
// Creates smooth transitions between values
// Time Complexity: O(1) - Single calculation
// ============================================
const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

// ============================================
// ALGORITHM: Staggered Animation Delay Calculator
// Calculates sequential delays for cascading animations
// Time Complexity: O(1) - Direct multiplication
// ============================================
const calculateStaggerDelay = (index: number, baseDelay: number = 100): number => {
  return index * baseDelay;
};

// ============================================
// ALGORITHM: Easing Function (Cubic Ease Out)
// Creates smooth deceleration effect
// Time Complexity: O(1) - Mathematical operation
// ============================================
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

const EcoGuardLanding: React.FC = () => {
  // ============================================
  // STATE MANAGEMENT - Using TypeScript with React Hooks
  // ============================================
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Navigation Stack Instance - Tracks user navigation history
  const navStack = useRef(new NavigationStack());
  
  // ============================================
  // ARRAY DATA STRUCTURE: Statistics Dashboard
  // Stores key performance indicators
  // ============================================
  const statistics = [
    { value: '32K+', label: 'Forest Areas Protected', icon: Trees },
    { value: '1,200+', label: 'Wildlife Species', icon: Heart },
    { value: '250+', label: 'Active Rangers', icon: Users },
    { value: '100%', label: 'Reliable System', icon: TrendingUp }
  ];
  
  // ============================================
  // QUEUE DATA STRUCTURE: Features Rotation System
  // Automatically cycles through features using FIFO principle
  // ============================================
  const featuresQueue = useRef(new Queue<{ title: string; desc: string; icon: any }>());
  
  const features = [
    { 
      title: 'Weather Monitoring', 
      desc: 'Track real-time weather conditions and forecast patterns across forest regions',
      icon: Cloud 
    },
    { 
      title: 'Wildlife Database', 
      desc: 'Comprehensive information on forest species, habitats and conservation status',
      icon: Heart 
    },
    { 
      title: 'Ranger Network', 
      desc: 'Connect and coordinate with field teams for efficient forest management',
      icon: Shield 
    },
    { 
      title: 'Data Analytics', 
      desc: 'Advanced reporting and insights for informed decision making',
      icon: Database 
    }
  ];
  
  // ALGORITHM: Initialize Queue with features (executed once on mount)
  // Time Complexity: O(n) where n is number of features
  useEffect(() => {
    features.forEach(feature => featuresQueue.current.enqueue(feature));
  }, []);
  
  // ============================================
  // ALGORITHM: Automated Feature Rotation using Queue
  // Rotates features every 4 seconds using Queue.rotate()
  // Time Complexity: O(1) per rotation
  // ============================================
  useEffect(() => {
    const interval = setInterval(() => {
      featuresQueue.current.rotate(); // Queue rotation algorithm
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, []);
  
  // ============================================
  // EVENT HANDLER: Parallax Scroll Algorithm
  // Updates scroll position for parallax calculations
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // ============================================
  // NAVIGATION HANDLER: Stack-based History Tracking
  // Pushes navigation to stack and redirects
  // Time Complexity: O(1)
  // ============================================
  const handleNavigation = (page: string, path: string) => {
    navStack.current.push(page); // STACK: Push operation
    console.log(`📍 Navigating to: ${page}`);
    console.log(`📚 Navigation Stack:`, navStack.current.getHistory());
    
    // Redirect to actual route
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* ============================================
          BACKGROUND LAYER: Static Background Image
          ALGORITHM: Parallax effect with slower speed
          ============================================ */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(public/background2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        
          filter: 'brightness(1.5)',
        }}
      />
      
      {/* Subtle overlay for better text readability */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* ============================================
          NAVIGATION BAR: Array-based Menu Rendering
          ============================================ */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              onClick={() => handleNavigation('Home', '/')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <Leaf className="w-10 h-10 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-3xl font-bold text-white">
                Eco<span className="text-emerald-500">Guard</span>
              </span>
            </div>

            {/* Desktop Menu - ARRAY: Navigation Items */}
            <div className="flex items-center space-x-8">
              {/* ARRAY: Map through navigation items with staggered animation */}
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Features', path: '/features' },
                { name: 'Contact', path: '/contact' }
              ].map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.name, item.path)}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-base font-medium relative group"
                  style={{
                    animationDelay: `${calculateStaggerDelay(index, 80)}ms`
                  }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              
              {/* Login Button */}
              <button 
                onClick={() => handleNavigation('Login', '/login')}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================
          HERO SECTION: Main Content Area
          ============================================ */}
      <div className="relative z-10 pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Content */}
          <div className="text-center mb-20">
            <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Advanced Forest Management System</span>
            </div>
            
            <h1 
              className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
              style={{
                animation: 'fadeInUp 1s ease-out',
              }}
            >
              Protecting Forests,
              <br />
              <span className="text-emerald-500">
                Preserving Nature
              </span>
            </h1>
            
            <p 
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
              style={{
                animation: 'fadeInUp 1s ease-out 0.2s both'
              }}
            >
              A powerful platform designed for forest rangers to monitor weather conditions, 
              track wildlife populations, and manage conservation efforts with precision and efficiency.
            </p>
          </div>

          {/* ============================================
              GLASSMORPHIC CARDS: Main Feature Cards
              Enhanced hover effects and animations
              ============================================ */}
          <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
            
            {/* CARD 1: Weather Monitoring */}
            <div
              onMouseEnter={() => setHoveredCard('weather')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleNavigation('Weather Dashboard', '/weather')}
              className="group relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-500"
              style={{
                background: 'rgba(17, 24, 39, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                transform: `translateY(${calculateParallax(scrollY, -0.1)}px) scale(${hoveredCard === 'weather' ? 1.03 : 1})`,
                boxShadow: hoveredCard === 'weather' 
                  ? '0 20px 50px rgba(59, 130, 246, 0.3)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.5)',
                animation: 'slideInLeft 0.8s ease-out',
              }}
            >
              {/* Gradient overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)'
                }}
              />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4 text-white">
                  Weather Monitoring
                </h3>
                
                <p className="text-gray-400 text-base mb-6 leading-relaxed">
                  Access live weather updates, temperature readings, humidity levels, and forecast 
                  predictions to plan field operations and respond to changing conditions effectively.
                </p>
                
                <div className="flex items-center text-blue-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">View Weather Data</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
            </div>

            {/* CARD 2: Wildlife Information */}
            <div
              onMouseEnter={() => setHoveredCard('wildlife')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleNavigation('Wildlife Database', '/wildlife')}
              className="group relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-500"
              style={{
                background: 'rgba(17, 24, 39, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                transform: `translateY(${calculateParallax(scrollY, -0.1)}px) scale(${hoveredCard === 'wildlife' ? 1.03 : 1})`,
                boxShadow: hoveredCard === 'wildlife' 
                  ? '0 20px 50px rgba(16, 185, 129, 0.3)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.5)',
                animation: 'slideInRight 0.8s ease-out',
              }}
            >
              {/* Gradient overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)'
                }}
              />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4 text-white">
                  Wildlife Database
                </h3>
                
                <p className="text-gray-400 text-base mb-6 leading-relaxed">
                  Explore detailed information about forest animals, their habitats, behavioral patterns, 
                  and conservation priorities to support wildlife protection initiatives.
                </p>
                
                <div className="flex items-center text-emerald-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">Explore Wildlife Info</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-600/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl" />
            </div>
          </div>

          {/* ============================================
              STATISTICS SECTION: Array Iteration
              ALGORITHM: calculateStaggerDelay for cascade effect
              ============================================ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-emerald-500/50 transition-all duration-300"
                  style={{
                    animation: 'fadeInUp 0.8s ease-out',
                    animationDelay: `${calculateStaggerDelay(index, 100)}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-emerald-500" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* ============================================
              FEATURES SECTION: Queue-based Auto-rotation
              ALGORITHM: Queue.rotate() for cyclic display
              ============================================ */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Core Features
            </h2>
            <p className="text-gray-400 text-center mb-12 text-lg">
              Essential tools for modern forest conservation
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = index === activeFeature;
                
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl transition-all duration-500 ${
                      isActive ? 'scale-105' : 'scale-100'
                    }`}
                    style={{
                      background: isActive 
                        ? 'rgba(16, 185, 129, 0.15)' 
                        : 'rgba(31, 41, 55, 0.5)',
                      backdropFilter: 'blur(10px)',
                      border: isActive 
                        ? '2px solid rgba(16, 185, 129, 0.5)' 
                        : '1px solid rgba(75, 85, 99, 0.3)',
                    }}
                  >
                    <Icon className={`w-10 h-10 mb-4 transition-colors duration-300 ${
                      isActive ? 'text-emerald-400' : 'text-gray-500'
                    }`} />
                    <h3 className={`text-xl font-bold mb-2 ${
                      isActive ? 'text-white' : 'text-gray-300'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mission Section */}
          <div className="text-center py-16 px-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <Target className="w-14 h-14 mx-auto mb-6 text-emerald-500" />
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              EcoGuard empowers forest rangers with modern technology to safeguard natural ecosystems. 
              Through real-time data and intelligent tools, we're building a sustainable future for 
              our forests and the diverse wildlife that calls them home.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================
          FOOTER SECTION
          ============================================ */}
      <footer className="relative z-10 border-t border-gray-800 py-10 mt-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Leaf className="w-7 h-7 text-emerald-500" />
            <span className="text-2xl font-bold">EcoGuard</span>
          </div>
          <p className="text-gray-400 mb-4">
            Advanced forest management for a greener tomorrow
          </p>
          <p className="text-gray-500 text-sm mb-2">
            © 2025 EcoGuard. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with React + TypeScript | Data Structures: Queue, Stack, Arrays | 
            Algorithms: Parallax, Lerp, Stagger, Cubic Easing
          </p>
        </div>
      </footer>

      {/* ============================================
          CSS ANIMATIONS
          ============================================ */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EcoGuardLanding;