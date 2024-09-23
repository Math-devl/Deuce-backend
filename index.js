require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("process.env.MONGODB_URI");

const clubRoutes = require("./routes/club");
const userRoutes = require("./routes/user");
app.use(clubRoutes);
app.use(userRoutes);

app.all("*", () => {
  res.status(404).json({ message: "Page not found !" });
});

app.listen(process.env.PORT, () => {
  console.log("server dans la place");
});
