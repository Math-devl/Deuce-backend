const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  firstname: String,
  birthDate: String,
  email: { type: String, unique: true },
  newletter: Boolean,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
