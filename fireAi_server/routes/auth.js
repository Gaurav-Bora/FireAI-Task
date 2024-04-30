// routes/auth.js
const express = require("express");
const router = express.Router();
const connection = require("../db.js"); // Import the database connection
const { createResult } = require("../utils.js");

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Incoming login request:", { email, password }); // Log incoming request data

  // Query to check if user credentials are valid
  const sql =
    "SELECT UserID, Username FROM Users WHERE Email = ? AND Password = ?";
  console.log("SQL Query:", sql); // Log SQL query

  connection.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query: " + error.message);
      res.status(500).json(createResult("Internal server error", null));
      return;
    }

    console.log("Query results:", results); // Log query results

    // Check if user exists and credentials are correct
    if (results.length === 0) {
      console.log("No user found with provided credentials");
      res.status(401).json(createResult("Invalid email or password", null));
      return;
    }

    // If authentication succeeds, return success response with user information
    const user = results[0];
    console.log("User logged in:", user);
    res.json(
      createResult(null, { userId: user.UserID, username: user.Username })
    );
  });
});

module.exports = router;
