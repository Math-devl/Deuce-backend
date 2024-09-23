const express = require("express");
const router = express.Router();

const Club = require("../models/Club");

router.post("/create", async (req, res) => {
  //console.log(req.body);
  const { name, address, phoneNumber, website, googleMapLink } = req.body;
  try {
    newClub = new Club({
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      website: website,
      googleMapLink: googleMapLink,
    });
    // console.log(newClub);
    await newClub.save();

    res.status(200).json({ message: "Club bien enregistré" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
