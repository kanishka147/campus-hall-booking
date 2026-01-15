const express = require("express");
const Booking = require("../models/Booking");
const Hall = require("../models/Hall");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Convert time to minutes
function timeToMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

/* ===========================================================
   STUDENT: CREATE BOOKING
=========================================================== */
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const user = req.user;

        if (user.role !== "student") {
            return res.status(403).json({ message: "Only students can book halls" });
        }

        if (user.position !== "President" && user.position !== "Vice President") {
            return res.status(403).json({ message: "Only Presidents or Vice Presidents can book halls" });
        }

        const { hallId, date, startTime, endTime, reason, notes } = req.body;

        const hall = await Hall.findById(hallId);
        if (!hall) return res.status(404).json({ message: "Hall not found" });

        // Validate time
        const start = timeToMinutes(startTime);
        const end = timeToMinutes(endTime);

        if (end <= start) {
            return res.status(400).json({ message: "End time must be after start time" });
        }

        // Conflict check
        const existing = await Booking.find({
            hallId,
            date,
            status: { $in: ["pending", "approved"] }
        });

        for (let b of existing) {
            const es = timeToMinutes(b.startTime);
            const ee = timeToMinutes(b.endTime);

            if (!(end <= es || start >= ee)) {
                return res.status(409).json({
                    message: "Selected time slot is already booked or pending"
                });
            }
        }

        // Create booking
        const newBooking = new Booking({
            hallId,
            hallName: hall.name,

            studentId: user.id,
            studentName: user.name,
            department: user.department,
            position: user.position,

            date,
            startTime,
            endTime,
            reason,
            notes,
            status: "pending"
        });

        await newBooking.save();

        res.json({ message: "Booking request sent", booking: newBooking });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

/* ===========================================================
   STUDENT: MY BOOKINGS
=========================================================== */
router.get("/my", authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const bookings = await Booking.find({ studentId: user.id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* ===========================================================
   FACULTY: PENDING REQUESTS
=========================================================== */
router.get("/pending", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "faculty") {
            return res.status(403).json({ message: "Only faculty can view pending requests" });
        }

        const bookings = await Booking.find({ status: "pending" }).sort({ createdAt: -1 });
        res.json(bookings);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* ===========================================================
   GET BOOKING DETAILS (faculty/admin)
=========================================================== */
router.get("/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.json(booking);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching booking" });
    }
});

/* ===========================================================
   FACULTY: APPROVE REQUEST
=========================================================== */
router.post("/:id/approve", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "faculty") {
            return res.status(403).json({ message: "Only faculty can approve requests" });
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // Conflict check
        const existing = await Booking.find({
            hallId: booking.hallId,
            date: booking.date,
            status: "approved"
        });

        const start = timeToMinutes(booking.startTime);
        const end = timeToMinutes(booking.endTime);

        for (let b of existing) {
            const es = timeToMinutes(b.startTime);
            const ee = timeToMinutes(b.endTime);

            if (!(end <= es || start >= ee)) {
                return res.status(409).json({
                    message: "Conflict detected with another approved booking"
                });
            }
        }

        booking.status = "approved";
        booking.actionedBy = req.user.id;
        booking.actionedAt = new Date();

        await booking.save();

        res.json({ message: "Booking approved", booking });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

/* ===========================================================
   FACULTY: REJECT REQUEST
=========================================================== */
router.post("/:id/reject", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "faculty") {
            return res.status(403).json({ message: "Only faculty can reject requests" });
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        booking.status = "rejected";
        booking.actionedBy = req.user.id;
        booking.actionedAt = new Date();

        await booking.save();

        res.json({ message: "Booking rejected", booking });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

/* ===========================================================
   FIXED: STUDENT CALENDAR BOOKINGS (THIS WAS YOUR BUG!!)
=========================================================== */
router.get("/hall/:hallId", async (req, res) => {
  try {
    const bookings = await Booking.find({ hallId: req.params.hallId })
      .sort({ createdAt: -1 });

    // REMOVE older duplicates (keep latest for each student for each slot)
    const unique = {};
    const filtered = [];

    for (let b of bookings) {
      const key = `${b.date}_${b.startTime}_${b.endTime}_${b.studentId}`;

      if (!unique[key]) {
        unique[key] = true;
        filtered.push(b);
      }
    }

    res.json(filtered);

  } catch (error) {
    res.status(500).json({ message: "Error loading bookings" });
  }
});

/* ===========================================================
   ADMIN: FILTER ALL BOOKINGS
=========================================================== */
router.get("/", async (req, res) => {
    try {
        const { hall, status, date, sort } = req.query;

        let query = {};

        if (hall) query.hallName = hall;
        if (status) query.status = status;
        if (date) query.date = date;

        const sortOption = sort === "latest"
            ? { createdAt: -1 }
            : { createdAt: 1 };

        const bookings = await Booking.find(query).sort(sortOption);

        res.json(bookings);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error loading bookings" });
    }
});

module.exports = router;
