import React, { useState } from 'react';
import { Leaf, Bell, Award, Shield, User, MessageCircle, Send, Users } from 'lucide-react';

const RangerDashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New animal added: Bengal Tiger spotted in Zone A', time: '2 hours ago', isNew: true },
    { id: 2, message: 'Ranger Sarah Mitchell joined the team', time: '5 hours ago', isNew: true },
    { id: 3, message: 'Monthly patrol report due tomorrow', time: '1 day ago', isNew: false },
  ]);

  // const rangerProfile = {
  //   name: 'John Anderson',
  //   id: 'RNG-2025-047',
  //   designation: 'Senior Forest Ranger',
  //   profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  // };

  const storedUser = JSON.parse(localStorage.getItem("userData") || "{}");


  const rangerProfile = {
    name: storedUser?.name || "Unknown Ranger",
    id: storedUser?.rangerId || "N/A",
    designation: "Forest Ranger",
    profilePic: storedUser?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${storedUser?.name}`,
  };


  const badges = [
    { name: 'Wildlife Protector', icon: '🦌', earned: '2024' },
    { name: 'Quick Responder', icon: '⚡', earned: '2025' },
    { name: '100 Patrols', icon: '🎖️', earned: '2024' },
    { name: 'Safety Champion', icon: '🛡️', earned: '2025' },
  ];

  const handleNavigateToChat = () => {
    // In your actual implementation, use: navigate('/chat');
    window.location.href = '/chat';
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* BACKGROUND */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div> 
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[120px] animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] animate-float-slow"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="px-6 lg:px-12 py-12 lg:py-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full shadow-2xl">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none drop-shadow-xl">
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                      EcoGuard
                    </span>
                  </h1>
                  <p className="text-lg text-white/90 font-medium drop-shadow-lg">Ranger Dashboard</p>
                </div>
              </div>
              <Shield className="w-10 h-10 text-emerald-400" />
            </div>

            {/* Profile Card */}
            <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_rgba(31,38,135,0.37)]">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img 
                  src={rangerProfile.profilePic} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-emerald-400/50 shadow-lg bg-white"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white mb-1">{rangerProfile.name}</h2>
                  <p className="text-white/80 text-base mb-3">{rangerProfile.designation}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span className="text-white text-sm font-semibold">{rangerProfile.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-6 lg:px-12 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              
              {/* Left Column - Chat Section */}
              <div className="lg:col-span-2">
                {/* Communication Hub */}
                <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(31,38,135,0.37)] hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.15)] hover:border-white/40 transition-all duration-700">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <MessageCircle className="w-7 h-7 text-emerald-400" />
                    Communication Hub
                  </h3>
                  
                  <div className="bg-gradient-to-br from-emerald-600/20 to-green-700/20 border border-emerald-400/40 rounded-2xl p-10 text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-2xl" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}>
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    
                    <h4 className="text-3xl font-black text-white mb-4 drop-shadow-lg">Connect with Admin</h4>
                    <p className="text-white/90 text-lg mb-8 max-w-md mx-auto leading-relaxed font-medium">
                      Need assistance or want to report something? Chat directly with the admin team in real-time.
                    </p>
                    
                    <button
                      onClick={handleNavigateToChat}
                      className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold text-lg rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:scale-110"
                    >
                      <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
                      <span>Open Chat</span>
                      <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-500">
                      <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                        24/7
                      </div>
                      <p className="text-white/80 text-base font-medium">Admin Support</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-500">
                      <div className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                        Live
                      </div>
                      <p className="text-white/80 text-base font-medium">Real-time Chat</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-500">
                      <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                        Fast
                      </div>
                      <p className="text-white/80 text-base font-medium">Quick Response</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Notifications and Badges */}
              <div className="space-y-8 lg:space-y-10">
                {/* Notifications */}
                <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_rgba(31,38,135,0.37)] hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.15)] hover:border-white/40 transition-all duration-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Bell className="w-6 h-6 text-emerald-400" />
                    Notifications
                  </h3>
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-4 rounded-xl border transition-all ${
                        notif.isNew 
                          ? 'bg-emerald-600/20 border-emerald-400/40' 
                          : 'bg-white/5 border-white/20'
                      }`}>
                        <p className="text-white text-sm mb-1 leading-relaxed">{notif.message}</p>
                        <p className="text-emerald-400 text-xs font-medium">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_rgba(31,38,135,0.37)] hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.15)] hover:border-white/40 transition-all duration-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-emerald-400" />
                    Badges Earned
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {badges.map((badge, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-emerald-600/30 to-green-700/30 border border-emerald-400/30 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-500">
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <p className="text-white font-semibold text-sm mb-1">{badge.name}</p>
                        <p className="text-emerald-400 text-xs">{badge.earned}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="px-6 lg:px-12 pb-12">
          <div className="max-w-[1600px] mx-auto">
            <p className="text-center text-white/80 text-sm mt-8">
              © 2025 EcoGuard System. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(50px,-50px) scale(1.1); }
        }
        @keyframes float-delayed {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-60px,60px) scale(1.15); }
        }
        @keyframes float-slow {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px,50px) scale(1.08); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
        }
        .animate-float { animation: float 20s infinite ease-in-out; }
        .animate-float-delayed { animation: float-delayed 25s infinite ease-in-out; }
        .animate-float-slow { animation: float-slow 30s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default RangerDashboard;