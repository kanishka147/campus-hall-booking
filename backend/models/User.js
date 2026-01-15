const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        required: true
    },

    department: {
        type: String,
        required: function () {
            return this.role === 'student';
        }
    },

    position: {
  type: String,
  enum: ['President', 'Vice President'],
  default: null
}

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
