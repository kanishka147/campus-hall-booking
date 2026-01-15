const express = require('express');
const Hall = require('../models/Hall');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// CREATE hall (admin only)
router.post('/create', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admin can create halls" });
        }

        const hall = new Hall({ name: req.body.name });
        await hall.save();

        res.json({ message: "Hall created successfully", hall });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating hall" });
    }
});

// GET all halls (public)
router.get('/', async (req, res) => {
    try {
        const halls = await Hall.find();
        res.json(halls);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching halls" });
    }
});

// DELETE hall (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // only admin allowed
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete halls" });
    }

    await Hall.findByIdAndDelete(req.params.id);
    res.json({ message: "Hall deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting hall" });
  }
});

module.exports = router;
