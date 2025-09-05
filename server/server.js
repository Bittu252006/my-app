const express = require("express");
const cors = require("cors");
// const bcrypt = require("bcrypt");
const pool = require("./DB.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});


// Contact route
app.get("/api/contact", async (req, res) => {
  try {
    // Example: Fetch admin info (you can adjust WHERE clause as needed)
    const result = await pool.query(
      "SELECT Name, Email, PhoneNo FROM users WHERE Role = 'admin' LIMIT 1"
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No contact info found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// ✅ Signup route
app.post("/api/signup", async (req, res) => {
  try {
    const { Name, Age, Email, Password, PhoneNo, Gender, Role } = req.body;

    if (!Name || !Email || !Password) {
      return res.status(400).json({ message: "Name, Email and Password are required!" });
    }

    // ⚠️ Save password as plain text (not recommended for real apps!)
    const result = await pool.query(
      "INSERT INTO users (name, age, email, password, phoneno, gender, role) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [Name, Age, Email, Password, PhoneNo, Gender, Role]
    );

    res.status(201).json({ message: "User registered successfully!", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/signin", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "Email and Password are required!" });
    }

    const result = await pool.query("SELECT * FROM users WHERE email=$1", [Email]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const user = result.rows[0];

    // ✅ Compare directly (plain text)
    if (user.password !== Password) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    res.json({ message: "Sign in successful!", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// Start server
app.listen(PORT, (err) => {
  if(err) throw err
  console.log(`✅ Server running on http://localhost:${PORT}`);
});