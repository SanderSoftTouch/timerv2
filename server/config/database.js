// server/config/database.js
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://BonAdmin:W758D64duwqAhlZY@bondb.27kxa.mongodb.net/BonDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connection successful");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

module.exports = db;