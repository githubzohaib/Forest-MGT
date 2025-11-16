import React, { useEffect, useState } from "react";

interface Animal {
  _id: string;
  name: string;
  population: string;
}

export default function AdminEdit() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [name, setName] = useState("");
  const [population, setPopulation] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const fetchAnimals = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/animals");
      const data = await res.json();
      setAnimals(data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching animals.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
    fetchAnimals();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!name || !population) {
      setMessage("Please fill both fields");
      return;
    }

    try {
      if (editingId) {
        const res = await fetch(`http://localhost:5001/api/animals/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, population }),
        });
        if (!res.ok) throw new Error("Failed to update");
        setMessage("Animal updated successfully");
      } else {
        const res = await fetch("http://localhost:5001/api/animals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, population }),
        });
        if (!res.ok) throw new Error("Failed to add");
        setMessage("Animal added successfully");
      }

      setName("");
      setPopulation("");
      setEditingId(null);
      fetchAnimals();
    } catch (err) {
      console.error(err);
      setMessage("Error saving animal.");
    }
  };

  const handleEdit = (animal: Animal) => {
    setEditingId(animal._id);
    setName(animal.name);
    setPopulation(animal.population);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this animal?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/animals/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setMessage("Animal deleted successfully");
      fetchAnimals();
    } catch (err) {
      console.error(err);
      setMessage("Error deleting animal.");
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/public/background2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen w-full p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 drop-shadow-2xl tracking-tight">
              Wildlife Management
            </h1>
            <p className="text-lg sm:text-xl text-white/90 font-medium drop-shadow-lg">
              Manage and Monitor Animal Species
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 animate-slideDown">
              <div className="max-w-2xl mx-auto px-6 py-4 bg-white/20 backdrop-blur-2xl border-2 border-white/30 rounded-2xl shadow-2xl">
                <p className="text-white text-center font-semibold text-lg">{message}</p>
              </div>
            </div>
          )}

          {/* Add/Edit Form */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="bg-white/10 backdrop-blur-3xl border-2 border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 hover:bg-white/15 transition-all duration-500">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
                {editingId ? "✏️ Edit Animal" : "➕ Add New Animal"}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label className="block text-white/90 font-semibold mb-2 text-sm sm:text-base">
                    Animal Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Bengal Tiger, Giant Panda..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-xl text-white placeholder-white/50 text-base sm:text-lg focus:outline-none focus:border-white/60 focus:bg-white/20 focus:scale-105 transition-all duration-300 shadow-lg"
                  />
                </div>

                <div>
                  <label className="block text-white/90 font-semibold mb-2 text-sm sm:text-base">
                    Population Count
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2,500 or Endangered"
                    value={population}
                    onChange={(e) => setPopulation(e.target.value)}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-xl text-white placeholder-white/50 text-base sm:text-lg focus:outline-none focus:border-white/60 focus:bg-white/20 focus:scale-105 transition-all duration-300 shadow-lg"
                  />
                </div>
              </div>

              <button
                onClick={handleAddOrUpdate}
                className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-base sm:text-lg rounded-xl shadow-2xl hover:scale-105 hover:shadow-emerald-500/50 transition-all duration-300"
              >
                {editingId ? "💾 Update Animal" : "✨ Add Animal"}
              </button>

              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setName("");
                    setPopulation("");
                  }}
                  className="w-full sm:w-auto ml-0 sm:ml-4 mt-3 sm:mt-0 px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300"
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </div>

          {/* Animals Grid */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center drop-shadow-lg">
              🦁 Animal Database ({animals.length} Species)
            </h2>

            {animals.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <div className="bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-3xl p-10 sm:p-12 max-w-md mx-auto shadow-2xl">
                  <div className="text-6xl sm:text-7xl mb-4">🌿</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">No Animals Yet</h3>
                  <p className="text-white/80 text-base sm:text-lg">Start by adding your first animal species</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {animals.map((animal, index) => (
                  <div
                    key={animal._id}
                    className="group bg-white/10 backdrop-blur-3xl border-2 border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:shadow-emerald-500/30 transition-all duration-500 cursor-pointer"
                    style={{
                      animation: `cardSlide 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {index % 4 === 0 ? "🦁" : index % 4 === 1 ? "🐼" : index % 4 === 2 ? "🦅" : "🐘"}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                      {animal.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/30 backdrop-blur-xl rounded-full border border-emerald-400/50 mb-6">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                      <span className="text-white font-bold text-sm">{animal.population}</span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(animal)}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:scale-110 hover:shadow-xl hover:shadow-amber-500/50 transition-all duration-300 text-sm sm:text-base"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(animal._id)}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-xl hover:scale-110 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 text-sm sm:text-base"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Stats */}
          <div className="max-w-5xl mx-auto mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-3xl shadow-xl hover:bg-white/15 hover:scale-105 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">{animals.length}</div>
              <div className="text-white/80 font-semibold text-sm sm:text-base">Total Species</div>
            </div>

            <div className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-3xl shadow-xl hover:bg-white/15 hover:scale-105 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">🌍</div>
              <div className="text-white/80 font-semibold text-sm sm:text-base">Global Database</div>
            </div>

            <div className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-3xl shadow-xl hover:bg-white/15 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="text-4xl sm:text-5xl font-black text-white">Live</div>
              </div>
              <div className="text-white/80 font-semibold text-sm sm:text-base">Real-time Sync</div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardSlide {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.5s ease-out; }
      `}</style>
    </div>
  );
}
