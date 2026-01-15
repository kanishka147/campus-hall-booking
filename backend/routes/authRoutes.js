const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

/* ===================== LOGIN ===================== */
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.role !== role) {
      return res.status(403).json({ message: `This account is not a ${role}` });
    }

    // Student restriction
    if (role === "student") {
      if (user.position !== "President" && user.position !== "Vice President") {
        return res.status(403).json({ message: "Only Presidents or VPs can login" });
      }
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        department: user.department,
        position: user.position
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        position: user.position
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================== ADMIN ===================== */

// Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const { name, email, role, department, position } = req.body;

    const updateData = { name, email, role };

    if (role === "student") {
      updateData.department = department;
      updateData.position = position;
    } else {
      updateData.department = undefined;
      updateData.position = undefined;
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: "User updated", user: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

/* ===================== CREATE USER (FIXED) ===================== */
router.post("/create-user", async (req, res) => {
  try {
    const { name, email, password, role, department, position } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      passwordHash,
      role
    };

    // ✅ ONLY students get department & position
    if (role === "student") {
      userData.department = department;
      userData.position = position || null;
    }

    const newUser = new User(userData);
    await newUser.save();

    res.json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = router;
