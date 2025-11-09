import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ensure env variables are loaded

const uri = process.env.ANIMALS_DB_URI;

if (!uri) {
  console.error("❌ ANIMALS_DB_URI is missing from .env");
  process.exit(1);
}

// Create a separate connection for the animals database
const animalsConnection = mongoose.createConnection(uri);

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    population: { type: String, required: true },
  },
  { timestamps: true }
);

const Animal = animalsConnection.model("Animal", animalSchema);

export default Animal;
