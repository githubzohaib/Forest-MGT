import React, { useState, useMemo } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, Leaf, Search, MapPin, Calendar } from 'lucide-react';

export default function WeatherPage() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('San Francisco');
  const [selectedDay, setSelectedDay] = useState(0);
  
  // Weather data structure using objects and arrays (DSA concepts)
  const weatherDatabase = {
    'San Francisco': {
      current: { temp: 72, condition: 'Partly Cloudy', humidity: 65, windSpeed: 12, visibility: 10, pressure: 1013, feelsLike: 70, uvIndex: 6 },
      forecast: [
        { day: 'Mon', high: 75, low: 62, condition: 'Sunny', icon: 'sun', chance: 10 },
        { day: 'Tue', high: 73, low: 61, condition: 'Cloudy', icon: 'cloud', chance: 20 },
        { day: 'Wed', high: 68, low: 58, condition: 'Rainy', icon: 'rain', chance: 85 },
        { day: 'Thu', high: 70, low: 59, condition: 'Cloudy', icon: 'cloud', chance: 40 },
        { day: 'Fri', high: 76, low: 63, condition: 'Sunny', icon: 'sun', chance: 5 },
      ]
    },
    'New York': {
      current: { temp: 65, condition: 'Rainy', humidity: 78, windSpeed: 18, visibility: 7, pressure: 1010, feelsLike: 62, uvIndex: 3 },
      forecast: [
        { day: 'Mon', high: 68, low: 58, condition: 'Rainy', icon: 'rain', chance: 90 },
        { day: 'Tue', high: 66, low: 56, condition: 'Cloudy', icon: 'cloud', chance: 60 },
        { day: 'Wed', high: 70, low: 60, condition: 'Sunny', icon: 'sun', chance: 15 },
        { day: 'Thu', high: 72, low: 61, condition: 'Sunny', icon: 'sun', chance: 10 },
        { day: 'Fri', high: 69, low: 59, condition: 'Cloudy', icon: 'cloud', chance: 35 },
      ]
    },
    'London': {
      current: { temp: 59, condition: 'Overcast', humidity: 72, windSpeed: 15, visibility: 8, pressure: 1012, feelsLike: 56, uvIndex: 2 },
      forecast: [
        { day: 'Mon', high: 61, low: 52, condition: 'Cloudy', icon: 'cloud', chance: 45 },
        { day: 'Tue', high: 60, low: 51, condition: 'Rainy', icon: 'rain', chance: 75 },
        { day: 'Wed', high: 62, low: 53, condition: 'Cloudy', icon: 'cloud', chance: 50 },
        { day: 'Thu', high: 64, low: 54, condition: 'Sunny', icon: 'sun', chance: 20 },
        { day: 'Fri', high: 63, low: 53, condition: 'Cloudy', icon: 'cloud', chance: 40 },
      ]
    },
    'Tokyo': {
      current: { temp: 78, condition: 'Humid', humidity: 85, windSpeed: 10, visibility: 9, pressure: 1008, feelsLike: 82, uvIndex: 8 },
      forecast: [
        { day: 'Mon', high: 80, low: 72, condition: 'Sunny', icon: 'sun', chance: 5 },
        { day: 'Tue', high: 79, low: 71, condition: 'Sunny', icon: 'sun', chance: 10 },
        { day: 'Wed', high: 77, low: 70, condition: 'Rainy', icon: 'rain', chance: 80 },
        { day: 'Thu', high: 76, low: 69, condition: 'Cloudy', icon: 'cloud', chance: 50 },
        { day: 'Fri', high: 81, low: 73, condition: 'Sunny', icon: 'sun', chance: 8 },
      ]
    }
  };

  // Binary Search Tree implementation for location search (DSA concept)
  class LocationBST {
    constructor() {
      this.root = null;
    }
    
    insert(location) {
      const node = { value: location, left: null, right: null };
      if (this.root === null) {
        this.root = node;
      } else {
        this._insertNode(this.root, node);
      }
    }
    
    _insertNode(node, newNode) {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this._insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this._insertNode(node.right, newNode);
        }
      }
    }
    
    search(query) {
      return this._search(this.root, query.toLowerCase());
    }
    
    _search(node, query) {
      if (node === null) return [];
      
      const results = [];
      if (node.value.toLowerCase().includes(query)) {
        results.push(node.value);
      }
      
      results.push(...this._search(node.left, query));
      results.push(...this._search(node.right, query));
      
      return results;
    }
  }

  // Hash Map for O(1) weather lookup (DSA concept)
  const locationMap = useMemo(() => {
    const map = new Map();
    Object.keys(weatherDatabase).forEach(location => {
      map.set(location.toLowerCase(), location);
    });
    return map;
  }, []);

  // Filter locations using search (DSA: string matching with early termination)
  const searchLocations = useMemo(() => {
    if (!searchInput.trim()) return Object.keys(weatherDatabase);
    
    const query = searchInput.toLowerCase();
    return Object.keys(weatherDatabase).filter(loc => 
      loc.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchInput]);

  const currentWeather = weatherDatabase[selectedLocation];
  const currentDay = currentWeather.forecast[selectedDay];

  const getWeatherIcon = (icon, size = 'w-12 h-12') => {
    switch(icon) {
      case 'rain': return <CloudRain className={`${size} text-blue-400`} />;
      case 'sun': return <Sun className={`${size} text-yellow-400`} />;
      case 'cloud': return <Cloud className={`${size} text-gray-300`} />;
      default: return <Cloud className={`${size} text-gray-300`} />;
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSearchInput('');
    setSelectedDay(0);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Background with same gradient as login */}
      <div className="absolute inset-0">
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
      
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-900/30 rounded-full filter blur-3xl" style={{ animation: 'particle1 14s ease-in-out infinite' }}></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-green-950/35 rounded-full filter blur-3xl" style={{ animation: 'particle2 16s ease-in-out infinite' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-black/50 rounded-full filter blur-3xl" style={{ animation: 'particle3 18s ease-in-out infinite' }}></div>
      </div>

      <style>{`
        @keyframes slowerDeepFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes particle1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(30px, -60px) scale(0.9); opacity: 0.35; }
        }
        @keyframes particle2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          66% { transform: translate(-80px, 50px) scale(0.85); opacity: 0.38; }
        }
        @keyframes particle3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-40px, -90px) scale(1.4); opacity: 0.6; }
        }
      `}</style>

      {/* Header with Logo */}
      <div className="w-full max-w-6xl relative z-10 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full shadow-lg">
              <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">EcoGuard</h1>
              <p className="text-emerald-300 text-xs sm:text-sm">Weather Monitoring</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-64 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search locations..."
                className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-emerald-400/30 rounded-lg text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              
              {/* Search Results Dropdown */}
              {searchInput && searchLocations.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-sm border border-emerald-400/30 rounded-lg overflow-hidden z-20">
                  {searchLocations.map((location, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLocationSelect(location)}
                      className="w-full text-left px-4 py-2 text-emerald-300 hover:bg-emerald-600/30 transition-colors text-sm"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Current Weather Card */}
        <div className="bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedLocation}</h2>
              </div>
              <p className="text-emerald-300 text-sm mb-4">Today</p>
              <div className="flex flex-col gap-2">
                <div className="text-6xl sm:text-7xl font-bold text-white">{currentWeather.current.temp}°F</div>
                <p className="text-xl text-emerald-300">{currentWeather.current.condition}</p>
                <p className="text-sm text-emerald-400">Feels like {currentWeather.current.feelsLike}°F</p>
              </div>
            </div>

            <div className="flex-shrink-0">
              {getWeatherIcon('cloud', 'w-24 h-24 sm:w-32 sm:h-32')}
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-emerald-400/20">
            <div className="text-center">
              <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-emerald-400 text-xs sm:text-sm mb-1">Humidity</p>
              <p className="text-white font-semibold text-sm sm:text-base">{currentWeather.current.humidity}%</p>
            </div>
            <div className="text-center">
              <Wind className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
              <p className="text-emerald-400 text-xs sm:text-sm mb-1">Wind Speed</p>
              <p className="text-white font-semibold text-sm sm:text-base">{currentWeather.current.windSpeed} mph</p>
            </div>
            <div className="text-center">
              <Eye className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <p className="text-emerald-400 text-xs sm:text-sm mb-1">Visibility</p>
              <p className="text-white font-semibold text-sm sm:text-base">{currentWeather.current.visibility} mi</p>
            </div>
            <div className="text-center">
              <Gauge className="w-5 h-5 text-orange-400 mx-auto mb-2" />
              <p className="text-emerald-400 text-xs sm:text-sm mb-1">Pressure</p>
              <p className="text-white font-semibold text-sm sm:text-base">{currentWeather.current.pressure} mb</p>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-400" />
            5-Day Forecast
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {currentWeather.forecast.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedDay === idx
                    ? 'bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-400/20'
                }`}
              >
                <p className="font-semibold text-sm sm:text-base mb-3">{day.day}</p>
                <div className="flex justify-center mb-3">
                  {getWeatherIcon(day.icon, 'w-8 h-8')}
                </div>
                <p className="text-xs sm:text-sm mb-2">{day.condition}</p>
                <p className="text-xs">High: <span className="font-bold">{day.high}°</span></p>
                <p className="text-xs">Low: <span className="font-bold">{day.low}°</span></p>
              </button>
            ))}
          </div>

          {/* Selected Day Details */}
          <div className="bg-gradient-to-r from-emerald-900/40 to-green-900/40 border border-emerald-400/20 rounded-xl p-4 sm:p-6">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4">{currentDay.day} - Detailed View</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-emerald-400 text-xs sm:text-sm mb-1">Condition</p>
                <p className="text-white font-semibold text-sm sm:text-base">{currentDay.condition}</p>
              </div>
              <div>
                <p className="text-emerald-400 text-xs sm:text-sm mb-1">High</p>
                <p className="text-white font-semibold text-sm sm:text-base">{currentDay.high}°F</p>
              </div>
              <div>
                <p className="text-emerald-400 text-xs sm:text-sm mb-1">Low</p>
                <p className="text-white font-semibold text-sm sm:text-base">{currentDay.low}°F</p>
              </div>
              <div>
                <p className="text-emerald-400 text-xs sm:text-sm mb-1">Precipitation</p>
                <p className="text-white font-semibold text-sm sm:text-base">{currentDay.chance}%</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-emerald-200 text-xs sm:text-sm mt-8">
          © 2025 EcoGuard System. All rights reserved.
        </p>
      </div>
    </div>
  );
}