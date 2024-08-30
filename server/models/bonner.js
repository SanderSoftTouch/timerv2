// server/models/bonner.js
const mongoose = require("mongoose");

const bonSchema = new mongoose.Schema({
  Bonner: String,
  BonTijdMS: String,
  BonTijdSec: Number,
  Logger: String,
  CreatedAt: String,
});

const Bonners = mongoose.model("Timer", bonSchema);

module.exports = Bonners;