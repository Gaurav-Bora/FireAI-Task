const express = require("express");
const router = express.Router();
const connection = require("../db"); // Import the database connection pool
const { createResult } = require("../utils");

router.post("/addTask", async (req, res) => {
  const { taskName, description, dueDate, completed, userId } = req.body;
  try {
    const conn = await connection.promise().getConnection();
    await conn.query(
      "INSERT INTO Tasks (TaskName, Description, DueDate, Completed, UserID) VALUES (?, ?, ?, ?, ?)",
      [taskName, description, dueDate, completed, userId]
    );
    conn.release();
    res.json(createResult(null, "Todo item created successfully"));
  } catch (error) {
    console.error("Error creating todo item:", error);
    res.status(500).json(createResult("Internal server error", null));
  }
});

// Get all tasks for a specific user ID
router.get("/getTasksById/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const conn = await connection.promise().getConnection();
    const [rows] = await conn.query("SELECT * FROM Tasks WHERE UserID = ?", [
      userId,
    ]);
    conn.release();
    res.json(createResult(null, rows));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json(createResult("Internal server error", null));
  }
});

router.put("editTask/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const { taskName, description, dueDate, completed } = req.body;
  try {
    const conn = await connection.promise().getConnection();
    await conn.query(
      "UPDATE Tasks SET TaskName=?, Description=?, DueDate=?, Completed=? WHERE TaskID=?",
      [taskName, description, dueDate, completed, taskId]
    );
    conn.release();
    res.json(createResult(null, "Todo item updated successfully"));
  } catch (error) {
    console.error("Error updating todo item:", error);
    res.status(500).json(createResult("Internal server error", null));
  }
});

// Delete a todo item
router.delete("/deleteTask/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const conn = await connection.promise().getConnection();
    await conn.query("DELETE FROM Tasks WHERE TaskID=?", [taskId]);
    conn.release();
    res.json(createResult(null, "Todo item deleted successfully"));
  } catch (error) {
    console.error("Error deleting todo item:", error);
    res.status(500).json(createResult("Internal server error", null));
  }
});

module.exports = router;
