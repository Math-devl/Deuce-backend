const mongoose = require("mongoose");

const Club = mongoose.model("Club", {
  name: String,
  address: String,
  phoneNumber: String,
  website: String,
  googleMapLink: String,
});

module.exports = Club;
