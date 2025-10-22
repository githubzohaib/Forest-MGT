
//Kesa ho ZOhaib bhai
import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, Leaf, AlertCircle, CloudSnow, RefreshCw } from 'lucide-react';

interface WeatherInfo {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { main: string }[];
  wind: { speed: number };
  visibility: number;
  sys: { country: string };
}

export default function WeatherPage() {
 const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const API_KEY = '5a12f529ead6fabc4b22b72ef9d3be33';

  // Weather condition mapping object (Hash Map - DSA)
  const weatherIcons = {
    'Clear': { icon: Sun, color: 'text-yellow-400' },
    'Clouds': { icon: Cloud, color: 'text-gray-300' },
    'Rain': { icon: CloudRain, color: 'text-blue-400' },
    'Drizzle': { icon: CloudRain, color: 'text-blue-300' },
    'Thunderstorm': { icon: CloudRain, color: 'text-purple-400' },
    'Snow': { icon: CloudSnow, color: 'text-blue-100' },
    'Mist': { icon: Cloud, color: 'text-gray-400' },
    'Smoke': { icon: Cloud, color: 'text-gray-500' },
    'Haze': { icon: Cloud, color: 'text-gray-400' },
    'Dust': { icon: Cloud, color: 'text-yellow-600' },
    'Fog': { icon: Cloud, color: 'text-gray-400' },
    'Sand': { icon: Cloud, color: 'text-yellow-700' },
    'Ash': { icon: Cloud, color: 'text-gray-600' },
    'Squall': { icon: Wind, color: 'text-cyan-400' },
    'Tornado': { icon: Wind, color: 'text-red-400' }
  };

  // Generate forecast using array manipulation (DSA concept)
  const generateForecast = (currentWeather:any) => {
    const forecastDays = [];
    const days = ['Today', 'Tomorrow', 'Thursday', 'Friday', 'Saturday'];
    const conditions = ['Partly Cloudy', 'Rainy', 'Cloudy', 'Sunny', 'Humid'];
    const icons = ['Clouds', 'Rain', 'Clouds', 'Clear', 'Clouds'];

    for (let i = 0; i < 5; i++) {
      const tempVariation = Math.floor(Math.random() * 8) - 2;
      const lowVariation = Math.floor(Math.random() * 4) - 2;

      forecastDays.push({
        day: days[i],
        high: Math.round(currentWeather.main.temp + tempVariation),
        low: Math.round(currentWeather.main.temp - 6 + lowVariation),
        condition: conditions[i],
        icon: icons[i],
        chance: Math.floor(Math.random() * 70) + 20
      });
    }
    return forecastDays;
  };

  // Fetch weather data with error handling
  const fetchWeatherData = async () => {
    try {
      if (isRefreshing) return;
      
      setIsRefreshing(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=Manaus&appid=${API_KEY}&units=metric`;
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Enhance data with Amazon Jungle info
      const enhancedData = {
        ...data,
        name: 'Amazon Jungle',
        sys: { ...data.sys, country: 'BR' }
      };

      setWeatherData(enhancedData);
      setForecast(generateForecast(enhancedData));
      setSelectedDay(0);
      setLastUpdate(new Date());
      setLoading(false);
    } 
    catch (err: unknown) {
  const error = err as Error;
  console.error(error.message);
  setError(error.message);
}
    finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh weather data every 5 minutes
  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition:any, size = 'w-12 h-12') => {
    const weatherInfo = weatherIcons[condition as keyof typeof weatherIcons] || { icon: Cloud, color: 'text-gray-300' };
    const IconComponent = weatherInfo.icon;
    return <IconComponent className={`${size} ${weatherInfo.color}`} />;
  };

  const formatTime = (date:Date | null) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  if (loading && !weatherData) {
    return (
      <div className="min-h-screen w-full h-full flex items-center justify-center relative overflow-hidden" style={{ margin: 0, padding: 0 }}>
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
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-block">
            <svg className="animate-spin h-12 w-12 text-emerald-400" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <p className="text-emerald-300 mt-4 text-sm">Loading Amazon Jungle Weather...</p>
        </div>
        <style>{`
          @keyframes slowerDeepFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full h-full flex flex-col items-center justify-start relative overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Full Background */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 w-full h-full"
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
          className="absolute inset-0 w-full h-full"
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

      {/* Content Container */}
      <div className="w-full max-w-6xl relative z-10 p-3 sm:p-4">
        {/* Header with Logo */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full shadow-lg flex-shrink-0">
              <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">EcoGuard</h1>
              <p className="text-emerald-300 text-xs sm:text-sm truncate">Amazon Rainforest</p>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchWeatherData}
            disabled={isRefreshing}
            className="p-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-lg hover:bg-white/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Last Update Time */}
        {lastUpdate && (
          <div className="text-xs text-emerald-400 text-center sm:text-left mb-3 sm:mb-4">
            Last updated: {formatTime(lastUpdate)}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50/20 backdrop-blur-sm border border-red-400/30 rounded-lg flex items-center gap-2 text-red-300 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Current Weather Card */}
        {weatherData && (
          <>
            <div className="bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1 text-center sm:text-left w-full">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1">{weatherData.name}</h2>
                  <p className="text-emerald-300 text-xs sm:text-sm mb-4">Brazil • Manaus Region</p>
                  <div className="flex flex-col gap-2">
                    <div className="text-6xl sm:text-7xl font-bold text-white">{Math.round(weatherData.main.temp)}°C</div>
                    <p className="text-lg sm:text-xl text-emerald-300">{weatherData.weather[0].main}</p>
                    <p className="text-xs sm:text-sm text-emerald-400">Feels like {Math.round(weatherData.main.feels_like)}°C</p>
                  </div>
                </div>

                <div className="flex-shrink-0 mt-4 sm:mt-0">
                  {getWeatherIcon(weatherData.weather[0].main, 'w-24 h-24 sm:w-32 sm:h-32')}
                </div>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-emerald-400/20">
                <div className="text-center">
                  <Droplets className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
                  <p className="text-xs text-emerald-300">Humidity</p>
                  <p className="text-white font-semibold">{weatherData.main.humidity}%</p>
                </div>
                <div className="text-center">
                  <Wind className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
                  <p className="text-xs text-emerald-300">Wind</p>
                  <p className="text-white font-semibold">{Math.round(weatherData.wind.speed)} km/h</p>
                </div>
                <div className="text-center">
                  <Eye className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
                  <p className="text-xs text-emerald-300">Visibility</p>
                  <p className="text-white font-semibold">{(weatherData.visibility / 1000).toFixed(1)} km</p>
                </div>
                <div className="text-center">
                  <Gauge className="w-6 h-6 mx-auto mb-1 text-emibold-400" />
                  <p className="text-xs text-emerald-300">Pressure</p>
                  <p className="text-white font-semibold">{weatherData.main.pressure} hPa</p>
                </div>
              </div>
            </div>

            {/* Forecast Section */}
            <div className="bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-5 sm:p-6 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">5-Day Forecast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
                {forecast.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                      selectedDay === index 
                        ? 'bg-emerald-500/30 border border-emerald-400/40 scale-105' 
                        : 'bg-white/5 hover:bg-emerald-500/10 border border-emerald-400/10'
                    }`}
                  >
                    <span className="text-sm text-emerald-300 mb-2">{day.day}</span>
                    {getWeatherIcon(day.icon, 'w-10 h-10 sm:w-12 sm:h-12')}
                    <span className="text-xs text-emerald-400 mt-2">{day.condition}</span>
                    <span className="text-sm text-white font-semibold mt-1">{day.high}° / {day.low}°</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <p className="text-center text-emerald-200 text-xs sm:text-sm mt-6 sm:mt-8">
          © 2025 EcoGuard System. All rights reserved.
        </p>
      </div>
    </div>
  );
}