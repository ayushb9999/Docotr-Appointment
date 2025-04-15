const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ["doctor", "patient"],
    required: true,
  },
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  doctorName: String,
  specialist: String,
  location: String,
  experience: String,
  about: String,
  image: String,
  bloodGroup: String,
  gender: String,
});

module.exports = mongoose.model("User", userSchema);
