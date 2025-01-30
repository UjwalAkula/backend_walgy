const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email uniqueness
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Basic email regex validation
    },
    password: {
        type: String,
        required: true,
        minlength:8 // Minimum length for security
    }
});

const Signup = mongoose.model('Signup', customerSchema, 'Customer-Registrations');

module.exports = Signup;
