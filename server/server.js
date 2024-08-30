// server/server.js
const express = require("express");
const path = require("path");
const db = require("./config/database");
const routes = require("./routes/index");
const port = 3019;

const app = express();

// Middleware for serving static files
app.use(express.static(path.join(__dirname, "../public")));

// Middleware for parsing JSON and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
