// routes/auth.js
const express = require("express");
const router = express.Router();
const connection = require("../db"); // Import the database connection pool
const { createResult } = require("../utils");

// Signup endpoint
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  // Check if username or email already exists
  const checkUsernameQuery = "SELECT * FROM Users WHERE Username = ?";
  const checkEmailQuery = "SELECT * FROM Users WHERE Email = ?";

  try {
    const conn = await connection.promise().getConnection(); // Get a connection from the pool

    // Check if username already exists
    let [usernameRows] = await conn.query(checkUsernameQuery, [username]);
    if (usernameRows.length > 0) {
      conn.release(); // Release the connection back to the pool
      return res
        .status(400)
        .json(createResult("Username already exists", null));
    }

    // Check if email already exists
    let [emailRows] = await conn.query(checkEmailQuery, [email]);
    if (emailRows.length > 0) {
      conn.release(); // Release the connection back to the pool
      return res.status(400).json(createResult("Email already exists", null));
    }

    // Insert new user into the database
    const insertUserQuery =
      "INSERT INTO Users (Username, Password, Email) VALUES (?, ?, ?)";
    await conn.query(insertUserQuery, [username, password, email]);
    conn.release(); // Release the connection back to the pool

    res.json(createResult(null, "User registered successfully"));
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json(createResult("Internal server error", null));
  }
});

module.exports = router;
