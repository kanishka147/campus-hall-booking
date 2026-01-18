// server.js
const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Loads .env variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
const authMiddleware = require("./middlewares/authMiddleware");
const authRoutes = require('./routes/authRoutes');
const hallRoutes = require('./routes/hallRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/halls', hallRoutes);
// ================= SERVE FRONTEND =================
const clientPath = path.join(__dirname, "client", "build");

app.use(express.static(clientPath));

// React router fallback (Express 5 safe)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});



// Test route
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
