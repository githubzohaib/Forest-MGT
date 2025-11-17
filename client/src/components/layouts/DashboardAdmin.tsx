// import React, { useState, useEffect } from 'react';
// import { Users, Clipboard, Cloud, Eye, PawPrint, ArrowRight } from 'lucide-react';
// import { useNavigate } from "react-router-dom";
// import FloatingChatWidget from "./FloatingChatWidget";

// interface DashboardCardProps {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   route: string;
//   gradient: string;
//   delay: number;
// }

// const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, route, gradient, delay }) => {
//   const [isClicked, setIsClicked] = useState(false);
//   const navigate = useNavigate();

//   const handleClick = () => {
//     setIsClicked(true);
//     setTimeout(() => setIsClicked(false), 600);
//     setTimeout(() => {
//       navigate(route);
//     }, 300);
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className={`
//         group relative overflow-hidden rounded-3xl 
//         bg-white/10 backdrop-blur-2xl 
//         border border-white/20 
//         p-6 cursor-pointer transition-all duration-700 
//         hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.15)] hover:border-white/40 hover:z-50
//         shadow-[0_8px_32px_rgba(31,38,135,0.37)]
//         ${isClicked ? 'scale-95 brightness-150' : ''}`}
//       style={{ animation: `slideUp 0.8s ease-out ${delay}s both` }}
//     >
//       <div className={`absolute inset-0 opacity-0 group-hover:opacity-50 transition-all duration-700 bg-gradient-to-br ${gradient} blur-3xl scale-150`}></div>

//       {isClicked && (
//         <>
//           <div className="absolute inset-0 rounded-3xl bg-white animate-ping opacity-30"></div>
//           <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-transparent animate-pulse opacity-20"></div>
//         </>
//       )}

//       <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//         <div className="absolute inset-0 rounded-3xl border-2 border-white/50 animate-pulse"></div>
//       </div>

//       <div className="relative z-10">
//         <div className={`mb-6 inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${gradient} 
//         shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 
//         group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]`}>
//           <div className="transform group-hover:scale-105 transition-transform duration-500">
//             {React.cloneElement(icon as any, { className: "w-10 h-10 text-white drop-shadow-2xl" })}
//           </div>
//         </div>

//         <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-3 group-hover:text-3xl transition-all duration-500 leading-tight">
//           {title}
//         </h3>

//         <p className="text-white/80 text-base leading-relaxed group-hover:text-white group-hover:text-lg transition-all duration-500 mb-4">
//           {description}
//         </p>

//         <div className="flex items-center gap-3 text-white/70 text-sm font-semibold group-hover:text-white transition-all duration-500">
//           <span className="group-hover:translate-x-2 transition-transform duration-500">Access Module</span>
//           <ArrowRight className="w-5 h-5 group-hover:translate-x-4 group-hover:scale-110 transition-all duration-500" />
//         </div>
//       </div>

//       <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white/0 group-hover:border-white/60 rounded-tl-3xl transition-all duration-500"></div>
//       <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white/0 group-hover:border-white/60 rounded-br-3xl transition-all duration-500"></div>
//     </div>
//   );
// };

// const AdminDashboard: React.FC = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const dashboardCards: DashboardCardProps[] = [
//     {
//       title: "Ranger Registry",
//       description: "Manage field ranger profiles, certifications, and deployment zones.",
//       icon: <Users />,
//       route: "/rangers",
//       gradient: "from-blue-500 via-blue-600 to-cyan-500",
//       delay: 0.1
//     },
//     {
//       title: "Mission Control",
//       description: "Assign patrol routes and coordinate operations.",
//       icon: <Clipboard />,
//       route: "/assign-work",
//       gradient: "from-purple-500 via-purple-600 to-pink-500",
//       delay: 0.2
//     },
//     {
//       title: "Weather Station",
//       description: "Access real-time meteorological data.",
//       icon: <Cloud />,
//       route: "/weather",
//       gradient: "from-amber-500 via-orange-500 to-orange-600",
//       delay: 0.3
//     },
//     {
//       title: "Wildlife Observatory",
//       description: "Species database, sightings, and analytics.",
//       icon: <Eye />,
//       route: "/animals",
//       gradient: "from-green-500 via-emerald-500 to-teal-500",
//       delay: 0.4
//     },
//     {
//       title: "Species Manager",
//       description: "Update animals records and classifications.",
//       icon: <PawPrint />,
//       route: "/adminedit",
//       gradient: "from-teal-500 via-cyan-500 to-blue-500",
//       delay: 0.5
//     }
//   ];

//   return (
//     <div className="min-h-screen w-full relative overflow-x-hidden">

//       {/* STATIC UI (UNCHANGED) — your original code remains fully intact */}

//       {/* CARDS */}
//       <main className="flex-1 px-6 lg:px-12 pb-20">
//         <div className="max-w-[1600px] mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
//             {dashboardCards.map((card, index) => (
//               <DashboardCard key={index} {...card} />
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* FLOATING CHAT ADDED HERE */}
//       <FloatingChatWidget userEmail="admin@gmail.com" userRole="admin" />

//     </div>
//   );
// };

// export default AdminDashboard;

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
import FloatingChatWidget from "./FloatingChatWidget";

/* ---------------------------------------------------------
   EXTRA — DSA STRUCTURE + BUBBLE SORT + BINARY SEARCH
------------------------------------------------------------ */
const cardTitles = ["Ranger Registry", "Mission Control", "Weather Station", "Wildlife Observatory", "Species Manager"];

// Bubble Sort
function bubbleSort(arr: string[]) {
  let a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}

// Binary Search
function binarySearch(arr: string[], target: string) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

const sortedTitles = bubbleSort(cardTitles);
binarySearch(sortedTitles, "Species Manager");

/* ---------------------------------------------------------
   DASHBOARD CARD COMPONENT
------------------------------------------------------------ */
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
  route,
  gradient,
  delay,
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
      className={`
        group relative overflow-hidden rounded-3xl
        bg-white/10 backdrop-blur-2xl 
        border border-white/20 p-6 cursor-pointer
        transition-all duration-700 
        hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.15)]
        hover:border-white/40 hover:z-50
        shadow-[0_8px_32px_rgba(31,38,135,0.37)]
        ${isClicked ? "scale-95 brightness-150" : ""}
      `}
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

/* ---------------------------------------------------------
   MAIN ADMIN DASHBOARD
------------------------------------------------------------ */
const AdminDashboard: React.FC = () => {
  
  const dashboardCards: DashboardCardProps[] = [
    {
      title: "Ranger Registry",
      description: "Manage field ranger profiles, certifications, and deployment zones.",
      icon: <Users />,
      route: "/rangers",
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      delay: 0.1,
    },
    {
      title: "Mission Control",
      description: "Assign patrol routes and coordinate operations.",
      icon: <Clipboard />,
      route: "/assign-work",
      gradient: "from-purple-500 via-purple-600 to-pink-500",
      delay: 0.2,
    },
    {
      title: "Weather Station",
      description: "Access real-time meteorological data.",
      icon: <Cloud />,
      route: "/weather",
      gradient: "from-amber-500 via-orange-500 to-orange-600",
      delay: 0.3,
    },
    {
      title: "Wildlife Observatory",
      description: "Species database, sightings, and analytics.",
      icon: <Eye />,
      route: "/animals",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      delay: 0.4,
    },
    {
      title: "Species Manager",
      description: "Update animal records and classifications.",
      icon: <PawPrint />,
      route: "/adminedit",
      gradient: "from-teal-500 via-cyan-500 to-blue-500",
      delay: 0.5,
    },
  ];

  return (
     <div
  className="min-h-screen h-screen w-full relative overflow-x-hidden bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/background2.jpg')" }}
>

      {/* HEADER */}
      <header className="text-center pt-28 pb-16">
        <h1 className="text-6xl font-extrabold text-teal-400 drop-shadow-lg tracking-wide">
          Wildlife Command
        </h1>
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg -mt-3">
          Center
        </h1>

        <p className="text-white/90 text-xl mt-6 tracking-wide">
          Your central hub for conservation operations and wildlife protection.
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
            {dashboardCards.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>
        </div>
      </main>

      {/* FLOATING CHAT */}
      <FloatingChatWidget userEmail="admin@gmail.com" userRole="admin" />
    </div>
  );
};

export default AdminDashboard;
