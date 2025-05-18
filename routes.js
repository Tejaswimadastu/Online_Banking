//routes.js
const express = require("express");
const router = express.Router();
const db = require("./db");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  try {
    const [result] = await db.query(
      "INSERT INTO users (name, email, phone, password, account_number) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, password, accountNumber]
    );
    res.json({ success: true, accountNumber });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
    if (user.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    res.json({ success: true, user: user[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// Transaction (Deposit/Withdraw/Transfer)
router.post("/transaction", async (req, res) => {
  const { userId, amount, type } = req.body;
  try {
    if (type === "withdraw") {
      await db.query("UPDATE users SET balance = balance - ? WHERE id = ?", [amount, userId]);
    } else {
      await db.query("UPDATE users SET balance = balance + ? WHERE id = ?", [amount, userId]);
    }
    res.json({ success: true, message: "Transaction successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Transaction failed" });
  }
});

module.exports = router;