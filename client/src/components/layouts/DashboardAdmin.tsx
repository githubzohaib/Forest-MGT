import React, { useState, useEffect } from 'react';
import { Users, Clipboard, Cloud, Eye, PawPrint, ArrowRight, MessageCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  gradient: string;
  delay: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, route, gradient, delay }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    setTimeout(() => {
      navigate(route);
    }, 300);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group relative overflow-hidden rounded-3xl 
        bg-white/10 backdrop-blur-2xl 
        border border-white/20 
        p-6 cursor-pointer transition-all duration-700 
        hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.15)] hover:border-white/40 hover:z-50
        shadow-[0_8px_32px_rgba(31,38,135,0.37)]
        ${isClicked ? 'scale-95 brightness-150' : ''}`}
      style={{ animation: `slideUp 0.8s ease-out ${delay}s both` }}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-50 transition-all duration-700 bg-gradient-to-br ${gradient} blur-3xl scale-150`}></div>

      {isClicked && (
        <>
          <div className="absolute inset-0 rounded-3xl bg-white animate-ping opacity-30"></div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-transparent animate-pulse opacity-20"></div>
        </>
      )}

      <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl border-2 border-white/50 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <div className={`mb-6 inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${gradient} 
        shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 
        group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]`}>
          <div className="transform group-hover:scale-105 transition-transform duration-500">
            {React.cloneElement(icon as any, { className: "w-10 h-10 text-white drop-shadow-2xl" })}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-3 group-hover:text-3xl transition-all duration-500 leading-tight">
          {title}
        </h3>

        <p className="text-white/80 text-base leading-relaxed group-hover:text-white group-hover:text-lg transition-all duration-500 mb-4">
          {description}
        </p>

        <div className="flex items-center gap-3 text-white/70 text-sm font-semibold group-hover:text-white transition-all duration-500">
          <span className="group-hover:translate-x-2 transition-transform duration-500">Access Module</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-4 group-hover:scale-110 transition-all duration-500" />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white/0 group-hover:border-white/60 rounded-tl-3xl transition-all duration-500"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white/0 group-hover:border-white/60 rounded-br-3xl transition-all duration-500"></div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dashboardCards: DashboardCardProps[] = [
    {
      title: "Ranger Registry",
      description: "Manage field ranger profiles, certifications, and deployment zones.",
      icon: <Users className="w-14 h-14 text-white drop-shadow-2xl" />,
      route: "/rangers",
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      delay: 0.1
    },
    {
      title: "Mission Control",
      description: "Assign patrol routes and coordinate operations.",
      icon: <Clipboard className="w-14 h-14 text-white drop-shadow-2xl" />,
      route: "/assign-work",
      gradient: "from-purple-500 via-purple-600 to-pink-500",
      delay: 0.2
    },
    {
      title: "Weather Station",
      description: "Access real-time meteorological data.",
      icon: <Cloud className="w-14 h-14 text-white drop-shadow-2xl" />,
      route: "/weather",
      gradient: "from-amber-500 via-orange-500 to-orange-600",
      delay: 0.3
    },
    {
      title: "Wildlife Observatory",
      description: "Species database, sightings, and analytics.",
      icon: <Eye className="w-14 h-14 text-white drop-shadow-2xl" />,
      route: "/animals",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      delay: 0.4
    },
    {
      title: "Species Manager",
      description: "Update animals records and classifications.",
      icon: <PawPrint className="w-14 h-14 text-white drop-shadow-2xl" />,
      route: "/adminedit",
      gradient: "from-teal-500 via-cyan-500 to-blue-500",
      delay: 0.5
    },
    {
      title: "Chat with Ranger",
      description: "Communicate with field rangers in real-time.",
      icon: <MessageCircle className="w-14 h-14 text-white drop-shadow-2xl" />,
      route: "/chat",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      delay: 0.6
    },
    {
      title: "View Reports",
      description: "See all submitted ranger activity & incident reports.",
      icon: <Clipboard className="w-14 h-14 text-white drop-shadow-2xl" />,
      route: "/view-reports",
      gradient: "from-red-500 via-rose-500 to-pink-500",
      delay: 0.7
    }
  ];

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
          <div className="max-w-[1600px] mx-auto text-center">

            {/* REMOVED ICON — NOTHING ELSE CHANGED */}

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-none drop-shadow-xl">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                Wildlife Command
              </span>
              <br />
              <span className="text-white drop-shadow-lg">Center</span>
            </h1>

            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-lg">
              Your central hub for conservation operations and wildlife protection.
            </p>

            <div 
              className="
                inline-flex items-center gap-4 px-8 py-4 
                rounded-full 
                bg-white/10 backdrop-blur-3xl 
                border border-white/20 
                hover:scale-110 
                transition-all duration-700
                animate-glass-fade
                overflow-hidden
              "
            >
              <div className="relative">
                <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-white text-lg font-bold">All Systems Active</span>
            </div>
          </div>
        </header>

        {/* CARDS */}
        <main className="flex-1 px-6 lg:px-12 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {dashboardCards.map((card, index) => (
                <DashboardCard key={index} {...card} />
              ))}
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="px-6 lg:px-12 pb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 shadow-lg hover:scale-105 transition-all">
              <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">24/7</div>
              <div className="text-slate-200 text-base font-medium">Active Monitoring</div>
            </div>
            <div className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 shadow-lg hover:scale-105 transition-all">
              <div className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">100%</div>
              <div className="text-slate-200 text-base font-medium">Protected Zones</div>
            </div>
            <div className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 shadow-lg hover:scale-105 transition-all">
              <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">Live</div>
              <div className="text-slate-200 text-base font-medium">Data Sync</div>
            </div>
          </div>
        </footer>

      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
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
        @keyframes bounce-slow {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes glassFade {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-glass-fade { animation: glassFade 1.3s ease-out forwards; }
        .animate-float { animation: float 20s infinite ease-in-out; }
        .animate-float-delayed { animation: float-delayed 25s infinite ease-in-out; }
        .animate-float-slow { animation: float-slow 30s infinite ease-in-out; }
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
      `}</style>

    </div>
  );
};

export default AdminDashboard;
