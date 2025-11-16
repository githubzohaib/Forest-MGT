// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// ========================
// ✅ AUTO CREATE ADMIN ON SERVER START
// ========================
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10); // Default password
      const admin = await User.create({
        name: "Super Admin",
        email: "admin@gmail.com",
        phone: "0000000000",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Default admin created:", admin.email);
    } else {
      console.log("Admin already exists:", existingAdmin.email);
    }
  } catch (err) {
    console.error("Error creating default admin:", err);
  }
};

// Call it once on server start
createDefaultAdmin();

// ========================
// ✅ SIGNUP ROUTE (Rangers only)
// ========================
router.post("/signup", async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (role === "admin") {
      return res.status(403).json({ message: "Admin cannot signup manually." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// ========================
// ✅ LOGIN ROUTE
// ========================
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (user.role !== role)
      return res.status(403).json({ message: "Role mismatch" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

// ========================
// ✅ FORGOT PASSWORD (Mock)
// ========================
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ message: "Password reset link sent to email (mock)." });
});

export default router;
