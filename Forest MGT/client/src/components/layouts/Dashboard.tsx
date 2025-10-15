import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, Eye, Calendar, Plus, MapPin, Clock } from 'lucide-react';

interface Sighting {
  id: number;
  animalName: string;
  species: string;
  location: string;
  date: string;
  time: string;
  status: 'endangered' | 'safe' | 'threatened';
}

export default function Dashboard() {
  const [totalAnimals] = useState(247);
  const [endangeredCount] = useState(42);
  const [totalSightings30Days] = useState(156);

  const [recentSightings] = useState<Sighting[]>([
    { id: 1, animalName: 'Bengal Tiger', species: 'Panthera tigris', location: 'Sundarbans National Park', date: '2025-10-15', time: '14:30', status: 'endangered' },
    { id: 2, animalName: 'Asian Elephant', species: 'Elephas maximus', location: 'Kaziranga Forest', date: '2025-10-14', time: '09:15', status: 'endangered' },
    { id: 3, animalName: 'Snow Leopard', species: 'Panthera uncia', location: 'Himalayan Region', date: '2025-10-13', time: '16:45', status: 'threatened' },
    { id: 4, animalName: 'Red Panda', species: 'Ailurus fulgens', location: 'Sikkim Valley', date: '2025-10-12', time: '11:20', status: 'endangered' },
    { id: 5, animalName: 'Indian Rhinoceros', species: 'Rhinoceros unicornis', location: 'Chitwan National Park', date: '2025-10-11', time: '07:50', status: 'safe' }
  ]);

  // Last 6 months sighting data (for simple CSS bar chart)
  const [sightingsData] = useState([
    { month: 'May', sightings: 134 },
    { month: 'Jun', sightings: 158 },
    { month: 'Jul', sightings: 142 },
    { month: 'Aug', sightings: 167 },
    { month: 'Sep', sightings: 189 },
    { month: 'Oct', sightings: 156 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'endangered': return 'bg-red-500';
      case 'threatened': return 'bg-orange-500';
      case 'safe': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const maxSightings = Math.max(...sightingsData.map(d => d.sightings));

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F1F8E9' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Wildlife Dashboard</h1>
          <p className="text-gray-600">Monitor and track wildlife sightings across protected areas</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Animals */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-50">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Animals</h3>
            <p className="text-3xl font-bold text-gray-800">{totalAnimals}</p>
            <p className="text-xs text-gray-500 mt-2">Tracked species</p>
          </div>

          {/* Endangered */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-red-50">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Critical</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Endangered</h3>
            <p className="text-3xl font-bold text-gray-800">{endangeredCount}</p>
            <p className="text-xs text-gray-500 mt-2">Need protection</p>
          </div>

          {/* Total Sightings */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-50">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Last 30d</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Sightings</h3>
            <p className="text-3xl font-bold text-gray-800">{totalSightings30Days}</p>
            <p className="text-xs text-gray-500 mt-2">This month</p>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-50">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Today</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Recent Activity</h3>
            <p className="text-3xl font-bold text-gray-800">{recentSightings.length}</p>
            <p className="text-xs text-gray-500 mt-2">New sightings</p>
          </div>
        </div>

        {/* Sightings Simple CSS Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sightings Trend (Last 6 Months)</h2>
          <div className="flex items-end gap-4 h-40">
            {sightingsData.map((data) => (
              <div key={data.month} className="flex flex-col items-center">
                <div
                  className="w-8 rounded-t-lg"
                  style={{
                    height: `${(data.sightings / maxSightings) * 100}%`,
                    backgroundColor: '#1B5E20'
                  }}
                />
                <span className="text-sm mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sightings Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Sightings</h2>
          <div className="space-y-4">
            {recentSightings.map(sighting => (
              <div key={sighting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{sighting.animalName}</h4>
                    <p className="text-sm text-gray-600 italic">{sighting.species}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="hidden md:inline">{sighting.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="hidden sm:inline">{formatDate(sighting.date)}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sighting.status)}`}>
                    {sighting.status.charAt(0).toUpperCase() + sighting.status.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm mb-2">Average Daily Sightings</p>
            <p className="text-3xl font-bold text-green-800">5.2</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm mb-2">Protected Areas</p>
            <p className="text-3xl font-bold text-green-800">18</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm mb-2">Active Researchers</p>
            <p className="text-3xl font-bold text-green-800">32</p>
          </div>
        </div>
      </div>
    </div>
  );
}
