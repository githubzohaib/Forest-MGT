import express from "express";
import http from "http"; // ✅ Needed for socket.io
import { Server } from "socket.io"; // ✅ Socket.IO server
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import Message from "./models/Message.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/messages", messageRoutes);

// Connect DB
connectDB();

// Create HTTP server for socket.io
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // in production, replace "*" with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("chat:broadcast", (msg) => {
    io.emit("chat:broadcast", { ...msg, isBroadcast: true });
  });

  socket.on("chat:private", (msg) => {
    socket.broadcast.emit("chat:private", { ...msg, isBroadcast: false });
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
