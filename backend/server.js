const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? undefined : "./.env",
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "todo_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    setTimeout(connectDB, 2000); // Retry after 2 seconds
    return;
  }
  console.log("Connected to MySQL database");
});

// Create tasks table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createTableQuery, (err) => {
  if (err) console.error("Error creating table:", err);
});

// API Routes
app.get("/api/tasks", (req, res) => {
  const query = "SELECT * FROM tasks ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/api/tasks", (req, res) => {
  const { text, completed } = req.body;
  const query = "INSERT INTO tasks (text, completed) VALUES (?, ?)";
  db.query(query, [text, completed], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, text, completed });
  });
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const query = "UPDATE tasks SET text = ?, completed = ? WHERE id = ?";
  db.query(query, [text, completed, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Task not found" });
    res.json({ id, text, completed });
  });
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tasks WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Task not found" });
    res.status(204).send();
  });
});

app.get("/health", (req, res) => {
  if (db && db._protocol._handshakePacket) {
    res.status(200).json({ status: "OK", database: "connected" });
  } else {
    res.status(500).json({ status: "ERROR", database: "disconnected" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
