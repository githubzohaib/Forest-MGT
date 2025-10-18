import React, { useState, useEffect, useRef } from 'react';
import { Cloud, FileText, ChevronRight, Activity, TrendingUp, MapPin } from 'lucide-react';

// DSA: Queue implementation for animation timing
class AnimationQueue {
  queue: string[];
  constructor() { this.queue = []; }
  enqueue(item: string) { this.queue.push(item); }
  dequeue() { return this.queue.shift(); }
  isEmpty() { return this.queue.length === 0; }
  size() { return this.queue.length; }
}

// DSA: Stack for navigation history
class NavigationStack {
  stack: { cardId: string; timestamp: number }[];
  constructor() { this.stack = []; }
  push(item: { cardId: string; timestamp: number }) { this.stack.push(item); }
  pop() { return this.stack.pop(); }
  peek() { return this.stack[this.stack.length - 1]; }
  isEmpty() { return this.stack.length === 0; }
}

// DSA: HashMap for card data management
class CardDataMap {
  map: Map<string, any>;
  constructor() { this.map = new Map(); }
  set(key: string, value: any) { this.map.set(key, value); }
  get(key: string) { return this.map.get(key); }
  has(key: string) { return this.map.has(key); }
  delete(key: string) { return this.map.delete(key); }
  getAll() { return Array.from(this.map.values()); }
}

export default function RangerDashboard() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [animationQueue] = useState(new AnimationQueue());
  const [navStack] = useState(new NavigationStack());
  const [cardDataMap] = useState(new CardDataMap());
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize card data using HashMap
  useEffect(() => {
    const cards = [
      {
        id: 'animals',
        title: 'Wildlife Monitoring',
        subtitle: 'Track & Protect Animals',
        icon: Activity,
        color: 'from-emerald-600 to-teal-700',
        gradient: 'from-emerald-900 to-teal-800',
        stats: [
          { label: 'Active Species', value: '247', icon: Activity },
          { label: 'Protected Areas', value: '18', icon: MapPin },
          { label: 'Health Status', value: '94%', icon: TrendingUp }
        ],
        path: '/animals'
      },
      {
        id: 'weather',
        title: 'Weather Insights',
        subtitle: 'Real-Time Climate Data',
        icon: Cloud,
        color: 'from-green-700 to-emerald-800',
        gradient: 'from-green-900 to-emerald-900',
        stats: [
          { label: 'Temperature', value: '24°C', icon: Activity },
          { label: 'Humidity', value: '68%', icon: TrendingUp },
          { label: 'Wind Speed', value: '12 km/h', icon: MapPin }
        ],
        path: '/weather'
      },
      {
        id: 'reports',
        title: 'Reports & Analytics',
        subtitle: 'Data-Driven Insights',
        icon: FileText,
        color: 'from-green-900 to-gray-900',
        gradient: 'from-gray-900 to-black',
        stats: [
          { label: 'Monthly Reports', value: '34', icon: FileText },
          { label: 'Incidents', value: '7', icon: Activity },
          { label: 'Completion', value: '89%', icon: TrendingUp }
        ],
        path: '/reports'
      }
    ];

    cards.forEach(card => {
      cardDataMap.set(card.id, card);
      animationQueue.enqueue(card.id);
    });
  }, [cardDataMap, animationQueue]);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleCardClick = (cardId: string, path: string) => {
    navStack.push({ cardId, timestamp: Date.now() });
    setActiveCard(cardId);

    // Simulate navigation
    setTimeout(() => {
      console.log(`Navigating to ${path}`);
      alert(`Navigating to ${path}\n\nIn a real application, this would redirect using React Router.`);
    }, 600);
  };

  const cards = cardDataMap.getAll();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 relative overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              #064e3b 0%, #022c22 10%, #000000 20%, #0a3d2e 30%, 
              #000000 40%, #052e16 50%, #064e3b 60%, #000000 70%, 
              #022c22 80%, #000000 90%, #064e3b 100%)`,
            backgroundSize: '400% 400%',
            animation: 'deepFlow 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, 
              rgba(16, 185, 129, 0.15) 0%, 
              rgba(5, 150, 105, 0.1) 25%, 
              transparent 50%)`,
            transition: 'background 0.3s ease-out'
          }}
        />
        {/* Particles */}
        <div 
          className="absolute top-20 left-20 w-96 h-96 bg-emerald-900/30 rounded-full filter blur-3xl"
          style={{ transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`, animation: 'particle1 18s ease-in-out infinite' }}
        />
        <div 
          className="absolute top-1/3 right-10 w-80 h-80 bg-green-950/35 rounded-full filter blur-3xl"
          style={{ transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * 25}px)`, animation: 'particle2 22s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-20 left-1/4 w-72 h-72 bg-black/40 rounded-full filter blur-3xl"
          style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * -20}px)`, animation: 'particle3 25s ease-in-out infinite' }}
        />
      </div>

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-emerald-950/30 z-50">
        <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Main scroll container */}
      <div ref={scrollContainerRef} className="relative z-10 h-screen w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm py-4 px-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">EcoGuard</h1>
                <p className="text-emerald-300 text-sm">Ranger Dashboard</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-emerald-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-emerald-200">Online</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        {cards.map((card, index) => {
          const Icon = card.icon;
          const isHovered = hoveredCard === card.id;
          const isActive = activeCard === card.id;

          return (
            <div key={card.id} className="snap-start w-full h-screen flex items-center justify-center">
              <div
                className={`card-hover-effect w-full h-full max-w-full max-h-full bg-gradient-to-br ${card.gradient} rounded-none overflow-hidden cursor-pointer relative group ${isActive ? 'ring-4 ring-emerald-400' : ''}`}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(card.id, card.path)}
                style={{ boxShadow: isHovered ? '0 25px 50px -12px rgba(16, 185, 129, 0.4)' : '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
              >
                <div className="relative p-12 flex flex-col justify-center h-full">
                  {/* Icon and arrow */}
                  <div className="mb-8 flex justify-between items-start">
                    <div className={`w-20 h-20 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center shadow-2xl transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}`} style={{ animation: isHovered ? 'pulse-glow 2s infinite' : 'none' }}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className={`transform transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                      <ChevronRight className="w-8 h-8 text-emerald-300" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">{card.title}</h2>
                  <p className="text-emerald-300 text-lg">{card.subtitle}</p>

                  {/* Stats grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    {card.stats.map((stat, idx) => {
                      const StatIcon = stat.icon;
                      return (
                        <div key={idx} className="stat-item bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                          <div className="flex items-center gap-3 mb-2">
                            <StatIcon className="w-5 h-5 text-emerald-300" />
                            <span className="text-emerald-200 text-sm">{stat.label}</span>
                          </div>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Hover action */}
                  <div className={`mt-8 flex items-center gap-2 text-emerald-300 text-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span>Click to explore</span>
                    <ChevronRight className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div className="py-8 text-center">
          <p className="text-emerald-200 text-xs sm:text-sm">© 2025 EcoGuard System. All rights reserved.</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
        <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes deepFlow { 0%,100%{background-position:0% 50%}50%{background-position:100% 50%} }
        @keyframes particle1 { 0%,100%{transform:translate(0,0) scale(1);opacity:0.3}33%{transform:translate(-60px,90px) scale(1.3);opacity:0.4}66%{transform:translate(40px,-70px) scale(0.9);opacity:0.35} }
        @keyframes particle2 { 0%,100%{transform:translate(0,0) scale(1);opacity:0.35}50%{transform:translate(70px,-80px) scale(1.4);opacity:0.45} }
        @keyframes particle3 { 0%,100%{transform:translate(0,0) scale(1);opacity:0.4}40%{transform:translate(-50px,100px) scale(1.2);opacity:0.5}80%{transform:translate(60px,-50px) scale(0.95);opacity:0.38} }
        @keyframes float {0%,100%{transform:translateY(0px);}50%{transform:translateY(-20px);} }
        @keyframes shimmer {0%{background-position:-1000px 0;}100%{background-position:1000px 0;}}
        @keyframes pulse-glow {0%,100%{box-shadow:0 0 20px rgba(16,185,129,0.3);}50%{box-shadow:0 0 40px rgba(16,185,129,0.6);}}
        @keyframes fadeIn { from { opacity:0; transform:translateY(30px);} to {opacity:1; transform:translateY(0);} }
        .card-hover-effect { transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
        .card-hover-effect:hover { transform: scale(1.02) translateY(-8px); }
        .stat-item { animation: float 3s ease-in-out infinite; }
        .stat-item:nth-child(1){animation-delay:0s;} .stat-item:nth-child(2){animation-delay:0.2s;} .stat-item:nth-child(3){animation-delay:0.4s;}
        .scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
