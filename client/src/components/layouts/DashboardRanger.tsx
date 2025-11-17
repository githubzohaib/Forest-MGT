// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Leaf, Bell, Award, MapPin, Shield, MessageCircle } from 'lucide-react';
// import Chat from "./Chat";   // <-- MAKE SURE PATH IS CORRECT

// const RangerDashboard = () => {
//   const navigate = useNavigate();

//   const [notifications, setNotifications] = useState([
//     { id: 1, message: 'New animal added: Bengal Tiger spotted in Zone A', time: '2 hours ago', isNew: true },
//     { id: 2, message: 'Ranger Sarah Mitchell joined the team', time: '5 hours ago', isNew: true },
//     { id: 3, message: 'Monthly patrol report due tomorrow', time: '1 day ago', isNew: false },
//   ]);

//   const rangerProfile = {
//     name: 'John Anderson',
//     id: 'RNG-2025-047',
//     designation: 'Senior Forest Ranger',
//     profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
//     email: "ranger@gmail.com"     // <-- SET YOUR RANGER EMAIL HERE
//   };

//   const assignedTasks = [
//     { id: 1, area: 'North Sector - Zone A', type: 'Patrol', priority: 'High', time: '08:00 AM - 02:00 PM', status: 'Active' },
//     { id: 2, area: 'Wildlife Checkpoint 3', type: 'Monitoring', priority: 'Medium', time: '03:00 PM - 06:00 PM', status: 'Pending' },
//     { id: 3, area: 'River Trail Section', type: 'Inspection', priority: 'Low', time: 'Tomorrow 09:00 AM', status: 'Scheduled' },
//   ];

//   const badges = [
//     { name: 'Wildlife Protector', icon: '🦌', earned: '2024' },
//     { name: 'Quick Responder', icon: '⚡', earned: '2025' },
//     { name: '100 Patrols', icon: '🎖️', earned: '2024' },
//     { name: 'Safety Champion', icon: '🛡️', earned: '2025' },
//   ];

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'High': return 'text-red-400 bg-red-500/20';
//       case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
//       case 'Low': return 'text-green-400 bg-green-500/20';
//       default: return 'text-gray-400 bg-gray-500/20';
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Active': return 'text-green-400 bg-green-500/20';
//       case 'Pending': return 'text-yellow-400 bg-yellow-500/20';
//       case 'Scheduled': return 'text-blue-400 bg-blue-500/20';
//       default: return 'text-gray-400 bg-gray-500/20';
//     }
//   };

//   return (
//     <div className="min-h-screen w-full relative overflow-x-hidden">
//       {/* Background */}
//       <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background2.jpg')" }}>
//         <div className="absolute inset-0 bg-black/30"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 min-h-screen">
        
//         {/* HEADER SECTION SAME - NO UI MODIFIED */}
//         {/* ---------------------------------------- */}

//         <header className="px-6 lg:px-12 py-12">
//           <div className="max-w-[1600px] mx-auto">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-500">
//                   <Leaf className="w-8 h-8 text-white drop-shadow-2xl" />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-xl">
//                     <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
//                       EcoGuard
//                     </span>
//                   </h1>
//                   <p className="text-lg text-emerald-300 font-medium">Ranger Command Center</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20">
//                 <div className="relative">
//                   <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
//                   <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
//                 </div>
//                 <span className="text-white text-sm font-bold">On Duty</span>
//               </div>
//             </div>

//             {/* Profile Card section unchanged */}
//           </div>
//         </header>

//         {/* GRID CONTENT */}
//         <main className="px-6 lg:px-12 pb-16">
//           <div className="max-w-[1600px] mx-auto">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//               {/* LEFT SECTION */}
//               <div className="lg:col-span-2 space-y-8">

//                 {/* TASKS SECTION — unchanged */}

//                 {/* CHAT SECTION — replaced with Chat.tsx embed */}
//                 <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-lg transition-all duration-700">

//                   <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
//                     <MessageCircle className="w-6 h-6 text-white" />
//                     Command Chat
//                   </h3>

//                   {/* Here Chat Component is placed */}
//                   <Chat userEmail={rangerProfile.email} userRole="ranger" />

//                 </div>
//               </div>

//               {/* RIGHT SIDEBAR (unchanged) */}
//               <div className="space-y-8">
//                 {/* Notifications */}
//                 {/* Badges */}
//               </div>
//             </div>
//           </div>
//         </main>

//       </div>
//     </div>
//   );
// };

// export default RangerDashboard;


import React, { useState, useEffect } from "react";
import {
  Users,
  Clipboard,
  Cloud,
  Eye,
  PawPrint,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat"; // <-- Ranger chat widget

/* -----------------------------------------------
   LINKED LIST STRUCTURE FOR CARDS
----------------------------------------------- */
class CardNode {
  data: any;
  next: CardNode | null;
  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}

class CardLinkedList {
  head: CardNode | null;
  constructor() {
    this.head = null;
  }
  append(data: any) {
    const node = new CardNode(data);
    if (!this.head) {
      this.head = node;
      return;
    }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }
  toArray() {
    const arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.data);
      curr = curr.next;
    }
    return arr;
  }
}

/* -----------------------------------------------
   DASHBOARD CARD COMPONENT
----------------------------------------------- */
interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
  route: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  gradient,
  delay,
  route,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    setTimeout(() => navigate(route), 300);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-3xl
      bg-white/10 backdrop-blur-2xl 
      border border-white/20 p-6 cursor-pointer
      transition-all duration-700 
      hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.15)]
      hover:border-white/40 hover:z-50
      shadow-[0_8px_32px_rgba(31,38,135,0.37)]
      ${isClicked ? "scale-95 brightness-150" : ""}`}
      style={{ animation: `slideUp 0.8s ease-out ${delay}s both` }}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-50 transition-all duration-700 bg-gradient-to-br ${gradient} blur-3xl scale-150`}
      ></div>

      {isClicked && (
        <>
          <div className="absolute inset-0 rounded-3xl bg-white animate-ping opacity-30"></div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-transparent animate-pulse opacity-20"></div>
        </>
      )}

      <div className="relative z-10">
        <div
          className={`mb-6 inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${gradient}
          shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}
        >
          {React.cloneElement(icon as any, {
            className: "w-10 h-10 text-white drop-shadow-2xl",
          })}
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-3xl transition-all duration-500">
          {title}
        </h3>

        <p className="text-white/80 leading-relaxed group-hover:text-white transition-all duration-500 mb-4">
          {description}
        </p>

        <div className="flex items-center gap-3 text-white/70 group-hover:text-white transition-all duration-500">
          <span className="group-hover:translate-x-2 transition-transform duration-500">
            Access Module
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-4 group-hover:scale-110 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
};

/* -----------------------------------------------
   MAIN DASHBOARD
----------------------------------------------- */
const RangerDashboard: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  // DSA: Two-pointer approach to sort modules by delay
  const cardData = [
    {
      title: "Wildlife Observatory",
      description: "Species database, sightings, and analytics.",
      icon: <Eye />,
      route: "/animals",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      delay: 0.1,
    },
    {
      title: "Weather Station",
      description: "Access real-time meteorological data.",
      icon: <Cloud />,
      route: "/weather",
      gradient: "from-amber-500 via-orange-500 to-orange-600",
      delay: 0.2,
    },
  ];

  // Using linked list to store and manipulate cards
  const cardList = new CardLinkedList();
  cardData.forEach((c) => cardList.append(c));

  // Two-pointer swap if delays are out of order (smallest first)
  const arr = cardList.toArray();
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    if (arr[left].delay > arr[right].delay) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
    }
    left++;
    right--;
  }

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/background2.jpg')" }}
    >
      {/* HEADER */}
      <header className="text-center pt-28 pb-16">
        <h1 className="text-6xl font-extrabold text-teal-400 drop-shadow-lg tracking-wide">
          Ranger Command
        </h1>
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg -mt-3">
          Center
        </h1>

        <p className="text-white/90 text-xl mt-6 tracking-wide">
          Your hub for wildlife observation and conservation operations.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-full border border-white/20 text-white font-semibold shadow-lg">
          <CheckCircle className="text-green-400" />
          All Systems Active
        </div>
      </header>

      {/* GRID */}
      <main className="flex-1 px-6 lg:px-12 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {arr.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>

          {/* Chat Section */}
          <div className="mt-10">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-lg transition-all duration-700">
              <Chat userEmail="ranger@gmail.com" userRole="ranger" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RangerDashboard;

