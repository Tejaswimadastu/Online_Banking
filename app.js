const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes"); // Import API routes
const db = require("./db"); // Import database connection

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/public")));

// Routes
app.use("/api", routes); // This should handle all /api routes

// Serve HTML files for the client
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/signup.html"));
});

app.get("/transaction", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/transaction.html"));
});

// Example Route for handling a transaction (integrating database)
app.post("/api/transaction", (req, res) => {
  const { userId, type, amount, recipient_account } = req.body;

  // Transaction SQL query to insert into database
  const query = 'INSERT INTO transactions (user_id, type, amount, recipient_account) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, type, amount, recipient_account], (err, result) => {
    if (err) {
      console.error("Error executing transaction:", err);
      return res.status(500).json({ success: false, message: 'Transaction failed' });
    }

    // Optionally update user balance or perform other actions here

    res.json({ success: true, message: 'Transaction successful' });
  });
});

// Example Route for fetching transaction history (integrating database)
app.post("/api/transactions", (req, res) => {
  const { userId } = req.body;

  const query = 'SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).json({ success: false, message: 'Could not load transactions' });
    }

    res.json({ success: true, transactions: results });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
