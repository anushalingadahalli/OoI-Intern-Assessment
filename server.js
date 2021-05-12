const express = require("express");
const app = express();
const connectDB = require("./lib/db/index");

const PORT = process.env.PORT || 9000;

// Connect to the database
connectDB();

// Init Body-Parser Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/register", require("./lib/api/register"));
app.use("/api/login", require("./lib/api/auth"));
app.use("/api/user", require("./lib/api/auth"));

app.listen(PORT, err => {
  if (err) console.error(err.message);
  console.log(`Server Running on port ${PORT}... Press Ctrl + C to terminate.`);
});
// set up routes
app.use("/users", require("./lib/api/users"));