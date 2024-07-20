const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validRoles = ["client", "admin", "livreur"];

const Role = new Schema({
    role: {
        type: String,
        enum: validRoles,
    }
});

module.exports = mongoose.model("role", Role);