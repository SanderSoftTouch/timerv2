// server/routes/index.js
const express = require("express");
const router = express.Router();
const path = require("path");

// Import the Bonner routes
const bonnerRoutes = require("./bonner");

// Serve the main HTML file
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// Use the Bonner routes
router.use("/", bonnerRoutes);

module.exports = router;
