const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: Number, unique: true, required: true },
  imageProfile: { type: String, default: "/IMG/default.png" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
