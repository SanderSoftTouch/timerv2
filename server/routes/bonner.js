// server/routes/bonner.js
const express = require("express");
const router = express.Router();
const bonnerController = require("../controllers/bonnerController");

// Route to get all Bonners
router.get("/get", bonnerController.getBonners);

// Route to create a new Bonner
router.post("/post", bonnerController.createBonner);

module.exports = router;
