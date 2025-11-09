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
    fetchAnimals();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!name || !population) {
      setMessage("Please fill both fields");
      return;
    }

    try {
      if (editingId) {
        // UPDATE
        const res = await fetch(`http://localhost:5001/api/animals/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, population }),
        });
        if (!res.ok) throw new Error("Failed to update");
        setMessage("Animal updated successfully");
      } else {
        // ADD
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
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Animals</h1>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      {/* Add / Edit Form */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Animal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          type="text"
          placeholder="Population"
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* Animals Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Population</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal._id}>
              <td className="border px-4 py-2">{animal.name}</td>
              <td className="border px-4 py-2">{animal.population}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(animal)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(animal._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
