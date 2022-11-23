const mongoose = require("mongoose");

// Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    }
});

// collection

const Register = new mongoose.model("register", personSchema);

module.exports = Register;