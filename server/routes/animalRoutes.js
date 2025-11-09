import express from "express";
import Animal from "../models/Animal.js";

const router = express.Router();

// GET all animals
router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD new animal
router.post("/", async (req, res) => {
  try {
    const { name, population } = req.body;
    const animal = new Animal({ name, population });
    const saved = await animal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE animal by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, population } = req.body;
    const updated = await Animal.findByIdAndUpdate(
      id,
      { name, population },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE animal by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Animal.findByIdAndDelete(id);
    res.json({ message: "Animal deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
