const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: String,
  password: String, // store hashed in real world
});

module.exports = mongoose.model("Admin", adminSchema);
