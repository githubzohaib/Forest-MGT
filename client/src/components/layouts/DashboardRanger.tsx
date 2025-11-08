import React, { useState } from 'react';
import { Leaf, Camera, Upload, X, Bell, Award, MapPin, AlertTriangle, Shield, User, FileText, CheckCircle } from 'lucide-react';

const RangerDashboard = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [reportType, setReportType] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New animal added: Bengal Tiger spotted in Zone A', time: '2 hours ago', isNew: true },
    { id: 2, message: 'Ranger Sarah Mitchell joined the team', time: '5 hours ago', isNew: true },
    { id: 3, message: 'Monthly patrol report due tomorrow', time: '1 day ago', isNew: false },
  ]);

  const rangerProfile = {
    name: 'John Anderson',
    id: 'RNG-2025-047',
    designation: 'Senior Forest Ranger',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  };

  const assignedTasks = [
    { id: 1, area: 'North Sector - Zone A', type: 'Patrol', priority: 'High', time: '08:00 AM - 02:00 PM', status: 'Active' },
    { id: 2, area: 'Wildlife Checkpoint 3', type: 'Monitoring', priority: 'Medium', time: '03:00 PM - 06:00 PM', status: 'Pending' },
    { id: 3, area: 'River Trail Section', type: 'Inspection', priority: 'Low', time: 'Tomorrow 09:00 AM', status: 'Scheduled' },
  ];

  const badges = [
    { name: 'Wildlife Protector', icon: '🦌', earned: '2024' },
    { name: 'Quick Responder', icon: '⚡', earned: '2025' },
    { name: '100 Patrols', icon: '🎖️', earned: '2024' },
    { name: 'Safety Champion', icon: '🛡️', earned: '2025' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReport = () => {
    if (reportType && reportDescription) {
      alert('Report submitted successfully!');
      setSelectedImage(null);
      setReportType('');
      setReportDescription('');
      setShowReportForm(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400 bg-red-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-500/20';
      case 'Pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'Scheduled': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Background with same gradient */}
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

      {/* Main Content */}
      <div className="w-full max-w-7xl relative z-10">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full shadow-lg">
              <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">EcoGuard</h1>
              <p className="text-emerald-300 text-xs sm:text-sm">Ranger Dashboard</p>
            </div>
          </div>
          <Shield className="w-8 h-8 text-emerald-400" />
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img 
              src={rangerProfile.profilePic} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-emerald-400/50 shadow-lg bg-white"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white mb-1">{rangerProfile.name}</h2>
              <p className="text-emerald-300 text-sm mb-2">{rangerProfile.designation}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/30 rounded-full border border-emerald-400/30">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-200 text-sm font-medium">{rangerProfile.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tasks and Report */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assigned Tasks */}
            <div className="bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-emerald-400" />
                Assigned Tasks & Patrol Orders
              </h3>
              <div className="space-y-3">
                {assignedTasks.map((task) => (
                  <div key={task.id} className="bg-white/5 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-4 hover:bg-white/10 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div>
                        <h4 className="text-white font-semibold text-base mb-1">{task.area}</h4>
                        <p className="text-emerald-300 text-sm">{task.type} • {task.time}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Submission */}
            <div className="bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-emerald-400" />
                Submit Report
              </h3>
              
              {!showReportForm ? (
                <button
                  onClick={() => setShowReportForm(true)}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Create New Report
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-emerald-300 text-sm mb-2 block">Report Type</label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="" className="bg-gray-900">Select type...</option>
                      <option value="accident" className="bg-gray-900">Accident</option>
                      <option value="illegal" className="bg-gray-900">Illegal Activity</option>
                      <option value="wildlife" className="bg-gray-900">Wildlife Sighting</option>
                      <option value="suspicious" className="bg-gray-900">Suspicious Activity</option>
                      <option value="other" className="bg-gray-900">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-emerald-300 text-sm mb-2 block">Description</label>
                    <textarea
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Describe what you observed..."
                      rows={4}
                      className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-lg text-white placeholder-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-emerald-300 text-sm mb-2 block">Photo Evidence (Optional)</label>
                    {selectedImage ? (
                      <div className="relative">
                        <img src={selectedImage} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-emerald-400/30 rounded-lg cursor-pointer hover:bg-white/5 transition-all">
                        <Camera className="w-8 h-8 text-emerald-400 mb-2" />
                        <span className="text-emerald-300 text-sm">Click to upload photo</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmitReport}
                      className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      Submit Report
                    </button>
                    <button
                      onClick={() => {
                        setShowReportForm(false);
                        setSelectedImage(null);
                        setReportType('');
                        setReportDescription('');
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-emerald-300 font-semibold rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Notifications and Badges */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6 text-emerald-400" />
                Notifications
              </h3>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-3 rounded-lg border transition-all ${
                    notif.isNew 
                      ? 'bg-emerald-600/20 border-emerald-400/40' 
                      : 'bg-white/5 border-emerald-400/20'
                  }`}>
                    <p className="text-white text-sm mb-1">{notif.message}</p>
                    <p className="text-emerald-400 text-xs">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-400" />
                Badges Earned
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-emerald-600/30 to-green-700/30 border border-emerald-400/30 rounded-xl p-4 text-center hover:scale-105 transition-transform">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <p className="text-white font-semibold text-sm mb-1">{badge.name}</p>
                    <p className="text-emerald-400 text-xs">{badge.earned}</p>
                  </div>
                ))}
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
};

export default RangerDashboard;