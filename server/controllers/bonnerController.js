// server/controllers/bonnerController.js
const Bonners = require("../models/bonner");

// Fetch all Bonners
exports.getBonners = async (req, res) => {
  try {
    const bonners = await Bonners.find({});
    res.json(bonners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a new Bonner
exports.createBonner = async (req, res) => {
  const { Bonner, BonTijdMS, BonTijdSec, Logger, CreatedAt } = req.body;

  try {
    const bon = new Bonners({
      Bonner,
      BonTijdMS,
      BonTijdSec,
      Logger,
      CreatedAt,
    });

    await bon.save();
    console.log(bon);
    res.send("Successfully saved");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save data" });
  }
};
