const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Console to database" + config.database);
});

mongoose.connection.on("error", () => {
  console.log("Database error" + config.database);
});

const app = express();

const users = require("./routes/users");

// PORT Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);

// Index Route
app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

// Start server
app.listen(port, () => {
  console.log("Server started on port" + port);
});
