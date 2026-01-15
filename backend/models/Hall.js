const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        default: "hall"
    },
    location: {
        type: String,
        default: "Main Block"
    },
}, { timestamps: true });

module.exports = mongoose.model('Hall', hallSchema);
