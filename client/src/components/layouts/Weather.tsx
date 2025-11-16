import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Leaf, RefreshCw } from 'lucide-react';

interface WeatherInfo {
  name: string;
  main: { temp: number; feels_like: number; humidity: number; pressure: number; };
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

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const weatherIcons = {
    'Clear': { icon: Sun, color: 'text-yellow-400' },
    'Clouds': { icon: Cloud, color: 'text-gray-300' },
    'Rain': { icon: CloudRain, color: 'text-blue-400' },
    'Drizzle': { icon: CloudRain, color: 'text-blue-300' },
    'Thunderstorm': { icon: CloudRain, color: 'text-purple-400' },
    'Snow': { icon: Cloud, color: 'text-blue-100' },
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

  const generateForecast = (currentWeather: any) => {
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

  const fetchWeatherData = async () => {
    try {
      if (isRefreshing) return;
      setIsRefreshing(true);
      setError(null);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Manaus&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();
      const enhancedData = { ...data, name: 'Amazon Jungle', sys: { ...data.sys, country: 'BR' } };
      setWeatherData(enhancedData);
      setForecast(generateForecast(enhancedData));
      setSelectedDay(0);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      setError(error.message);
    } finally { setIsRefreshing(false); }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: any, size = 'w-12 h-12') => {
    const weatherInfo = weatherIcons[condition as keyof typeof weatherIcons] || { icon: Cloud, color: 'text-gray-300' };
    const IconComponent = weatherInfo.icon;
    return <IconComponent className={`${size} ${weatherInfo.color}`} />;
  };

  const formatTime = (date: Date | null) => (date ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '');

  if (loading && !weatherData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-emerald-300">Loading Amazon Jungle Weather...</p>
      </div>
    );
  }

return (
  <div className="h-screen w-screen overflow-hidden relative">

    {/* BACKGROUND */}
    <div className="fixed inset-0 w-full h-full z-0">
      <img
        src="/background2.jpg"
        alt="Background"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/30"></div>
    </div>

    {/* CONTENT CENTERED */}
    <div className="relative z-10 flex flex-col items-center justify-center h-screen w-screen space-y-6 overflow-hidden">

      {/* REFRESH BUTTON TOP RIGHT */}
      <button
        onClick={fetchWeatherData}
        disabled={isRefreshing}
        className="absolute top-8 right-8 p-3 bg-white/10 rounded-lg border border-emerald-400/30 hover:bg-white/20"
      >
        <RefreshCw
          className={`w-6 h-6 text-emerald-400 ${
            isRefreshing ? 'animate-spin' : ''
          }`}
        />
      </button>

      {/* LOGO & TITLE */}
      <div className="flex flex-col items-center gap-2 mt-0">
        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full shadow-xl">
          <Leaf className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-4xl font-bold text-white">EcoGuard</h1>
        <p className="text-emerald-300 text-lg">Amazon Rainforest</p>

        {/* LAST UPDATE & ERROR */}
        <div className="flex flex-col items-center">
          {lastUpdate && (
            <p className="text-emerald-400 text-lg mt-2">
              {`Last updated: ${formatTime(lastUpdate)}`}
            </p>
          )}
          {error && <p className="text-red-400 mt-1">{error}</p>}
        </div>
      </div>

      {/* CURRENT WEATHER BOX */}
      {weatherData && (
        <div className="w-11/12 md:w-3/4 bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-3xl p-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">
                {weatherData.name}
              </h2>
              <p className="text-emerald-300 mb-2">
                {weatherData.weather[0].main}
              </p>
              <p className="text-white text-5xl font-bold">
                {Math.round(weatherData.main.temp)}°C
              </p>
              <p className="text-emerald-400">
                Feels like {Math.round(weatherData.main.feels_like)}°C
              </p>
            </div>
            <div>{getWeatherIcon(weatherData.weather[0].main, 'w-28 h-28')}</div>
          </div>
        </div>
      )}

{/* FORECAST BOX */}
{forecast.length > 0 && (
  <div className="w-11/12 md:w-3/4 bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-3xl p-6">
    <h3 className="text-xl font-bold text-white mb-4 text-center">
      5-Day Forecast
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 justify-items-center w-full">
      {forecast.map((day, index) => (
        <button
          key={index}
          onClick={() => setSelectedDay(index)}
          className={`flex flex-col items-center p-3 rounded-xl transition-all min-w-[100px] sm:min-w-[140px] ${
            selectedDay === index
              ? 'bg-emerald-500/30 border border-emerald-400/40 scale-105'
              : 'bg-white/5 border border-emerald-400/10'
          }`}
        >
          <span className="text-emerald-300 text-sm mb-1">{day.day}</span>
          {getWeatherIcon(day.icon, 'w-10 h-10')}
          <span className="text-emerald-400 text-xs mt-1">{day.condition}</span>
          <span className="text-white text-sm font-semibold mt-1">
            {day.high}° / {day.low}°
          </span>
        </button>
      ))}
    </div>
  </div>
      )}

    </div>
  </div>
);

}
