const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    studentName: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    position: {
        type: String,
        enum: ["President", "Vice President"],
        required: true
    },

    hallId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hall",
        required: true
    },

    hallName: {
        type: String,
        required: true
    },

    date: {
        type: String, // YYYY-MM-DD
        required: true
    },

    startTime: {
        type: String, // "HH:mm"
        required: true
    },

    endTime: {
        type: String,
        required: true
    },

    reason: {
        type: String,
        required: true
    },

    notes: {
        type: String
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    requestedAt: {
        type: Date,
        default: Date.now
    },

    actionedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    actionedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
