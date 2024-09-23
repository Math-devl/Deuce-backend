const express = require("express");
const router = express.Router();

const User = require("../models/User");

// require des packages pour crypter le mot de passe
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// ROUTE SIGNUP

router.post("/signup", async (req, res) => {
  try {
    //console.log(req.body);
    const { firstName, name, birthDate, email, password, newsletter } =
      req.body;

    if (name && firstName && birthDate && email && password) {
      // on regarde si l'email n'est pas déjà en BDD
      const user = await User.findOne({ email: email }); // return l'utilisateur avec l'email qui correspond à la requête ou NULL
      //console.log(user);
      if (!user) {
        // on s'occupe du mot de passe
        const salt = uid2(64);
        const token = uid2(64);
        const hash = SHA256(password + salt).toString(encBase64);

        const newUser = new User({
          firstName: firstName,
          name: name,
          birthDate: birthDate,
          email: email,
          newsletter: newsletter,
          token: token,
          hash: hash,
        });
        //console.log(newUser);
        await newUser.save();
        res.status(201).json({
          id: newUser._id,
          email: newUser.email,
          token: token,
        });
      } else {
        res.status(409).json({ message: "email already registered" });
      }
    } else {
      res.status(400).json({ message: "missing parameters" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
