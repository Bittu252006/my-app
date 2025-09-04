const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
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

// ✅ Signup route
app.post("/api/signup", async (req, res) => {
  try {
    const { Name, Age, Email, Password, PhoneNo, Gender, Role } = req.body;

    // Check if the user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE Email = $1", [Email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "User with this email already exists." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const query = `
      INSERT INTO users (Name, Age, Email, Password, PhoneNo, Gender, Role)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING Id, Name, Age, Email, Password, PhoneNo, Gender, Role, CreatedDate, UpdatedDate;
    `;
    const values = [Name, Age, Email, hashedPassword, PhoneNo, Gender, Role];

    const result = await pool.query(query, values);
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Signin route
app.post("/api/signin", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    const result = await pool.query("SELECT * FROM users WHERE Email = $1", [Email]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const user = result.rows[0];
    
    // Compare the plain text password with the hashed password
    const isMatch = await bcrypt.compare(Password, user.password);

    if (!isMatch) {
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