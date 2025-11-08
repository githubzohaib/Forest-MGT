import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Leaf } from "lucide-react";

// Type Definitions
interface Stat {
  label: string;
  value: string;
}

interface Card {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  gradient: string;
  path: string;
  stats: Stat[];
}

// 🌿 Binary Search Tree (DSA)
class CardBST {
  root: any = null;
  insert(value: string) {
    const node = { value, left: null, right: null };
    if (!this.root) this.root = node;
    else this._insert(this.root, node);
  }
  _insert(node: any, newNode: any) {
    if (newNode.value < node.value)
      node.left ? this._insert(node.left, newNode) : (node.left = newNode);
    else node.right ? this._insert(node.right, newNode) : (node.right = newNode);
  }
  search(node: any, value: string): boolean {
    if (!node) return false;
    if (node.value === value) return true;
    return value < node.value
      ? this.search(node.left, value)
      : this.search(node.right, value);
  }
}

export default function RangerDashboard(): JSX.Element {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 🧠 DSA: Array traversal for data
  const cards: Card[] = [
    {
      id: "animals",
      title: "Animal Tracking",
      subtitle: "Monitor real-time animal locations",
      color: "from-emerald-500 to-green-600",
      gradient: "from-emerald-900 via-green-900 to-teal-950",
      path: "/animals",
      stats: [
        { label: "Active Tags", value: "42" },
        { label: "Alerts", value: "2" },
        { label: "Species", value: "8" },
      ],
    },
    {
      id: "weather",
      title: "Weather Monitor",
      subtitle: "Track live forest weather updates",
      color: "from-green-600 to-emerald-700",
      gradient: "from-green-950 via-emerald-900 to-teal-950",
      path: "/weather",
      stats: [
        { label: "Temp (°C)", value: "27°C" },
        { label: "Humidity", value: "65%" },
        { label: "Wind", value: "12 km/h" },
      ],
    },
    {
      id: "reports",
      title: "Incident Reports",
      subtitle: "Submit and review field incidents",
      color: "from-teal-600 to-green-700",
      gradient: "from-teal-950 via-green-900 to-emerald-950",
      path: "/reports",
      stats: [
        { label: "Pending", value: "4" },
        { label: "Resolved", value: "19" },
        { label: "Total", value: "23" },
      ],
    },
  ];

  // ⚡ HashMap for O(1) route lookup
  const cardRouteMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of cards) map.set(c.id, c.path);
    return map;
  }, [cards]);

  // 🌳 Binary Search Tree for efficient lookup
  const cardBST = useMemo(() => {
    const bst = new CardBST();
    cards.forEach((c) => bst.insert(c.id));
    return bst;
  }, [cards]);

  const handleCardClick = (cardId: string) => {
    if (cardBST.search(cardBST.root, cardId)) {
      const path = cardRouteMap.get(cardId);
      if (path) navigate(path);
    }
  };

  // 📏 Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    };
    const node = scrollRef.current;
    node?.addEventListener("scroll", handleScroll);
    return () => node?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden text-white">
      {/* 🌈 Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              #064e3b 0%, #022c22 3.33%, #000000 6.66%, #0a3d2e 10%, 
              #022c22 13.33%, #14532d 16.66%, #052e16 20%, #000000 23.33%, 
              #064e3b 26.66%, #111827 30%, #000000 33.33%, #022c22 36.66%, 
              #064e3b 40%, #052e16 43.33%, #000000 46.66%, #0a3d2e 50%, 
              #064e3b 53.33%, #022c22 56.66%, #14532d 60%, #000000 63.33%, 
              #064e3b 66.66%, #052e16 70%, #000000 73.33%, #022c22 76.66%, 
              #14532d 80%, #064e3b 83.33%, #000000 86.66%, #0a3d2e 90%, 
              #000000 93.33%, #022c22 96.66%, #064e3b 100%)`,
            backgroundSize: "400% 400%",
            animation: "slowerDeepFlow 16s ease-in-out infinite",
          }}
        ></div>
      </div>

      {/* 🪶 Particle Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-900/30 rounded-full blur-3xl animate-[particle1_14s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-green-950/35 rounded-full blur-3xl animate-[particle2_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-black/50 rounded-full blur-3xl animate-[particle3_18s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes slowerDeepFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes particle1 {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.3; }
          50% { transform: translate(30px,-60px) scale(0.9); opacity: 0.4; }
        }
        @keyframes particle2 {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.35; }
          66% { transform: translate(-80px,50px) scale(0.85); opacity: 0.4; }
        }
        @keyframes particle3 {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.5; }
          50% { transform: translate(-40px,-90px) scale(1.4); opacity: 0.6; }
        }
      `}</style>

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-emerald-950/30 z-50">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Content Scroll */}
      <div
  ref={scrollRef}
  className="relative z-10 min-h-screen overflow-y-auto scrollbar-hide"
>

"

        <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

        {/* 🌿 Logo Section */}
        <div className="flex flex-col items-center justify-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl mb-4 animate-pulse">
            <Leaf className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">EcoGuard</h1>
          <p className="text-emerald-300 text-sm sm:text-base mt-2">
            Ranger Dashboard
          </p>
        </div>

        {/* 🌲 Cards Section */}
        <div className="flex flex-col items-center gap-8 sm:gap-12 px-4 sm:px-6 pb-16">
          {cards.map((card, index) => {
            const isHovered = hoveredCard === card.id;
            return (
              <div
                key={card.id}
                className={`relative w-full max-w-3xl bg-gradient-to-br ${card.gradient} rounded-2xl border border-emerald-500/20 shadow-xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer`}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-2xl transition-transform duration-500 ${
                        isHovered ? "scale-110 rotate-6" : ""
                      }`}
                    >
                      <Leaf className="text-white w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div
                      className={`transition-all duration-300 ${
                        isHovered
                          ? "translate-x-0 opacity-100"
                          : "translate-x-4 opacity-0"
                      }`}
                    >
                      <ChevronRight className="text-emerald-300 w-6 h-6" />
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {card.title}
                  </h2>
                  <p className="text-emerald-300 text-sm sm:text-base mb-6">
                    {card.subtitle}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {card.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-white/10 p-3 sm:p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
                      >
                        <p className="text-emerald-200 text-xs sm:text-sm mb-1">
                          {stat.label}
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-white">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`mt-4 flex items-center justify-center gap-2 text-emerald-300 text-xs sm:text-sm transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    <span>Click to explore</span>
                    <ChevronRight className="w-4 h-4 animate-pulse" />
                  </div>
                </div>

                {/* Card number */}
                <div className="absolute top-4 right-4 bg-white/10 w-8 h-8 rounded-full flex items-center justify-center border border-emerald-400/30">
                  <span className="text-emerald-300 text-sm font-semibold">
                    {index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-emerald-200 text-xs sm:text-sm py-6">
          © 2025 EcoGuard System. All rights reserved.
        </div>
      </div>
    </div>
  );
}