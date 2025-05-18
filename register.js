const express = require('express');
const router = express.Router();
const db = require('../db'); // assume db is your MySQL connection

// Register Route
router.post('/register', async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    pincode,
    city,
    state,
    country,
  } = req.body;

  // Generate a unique account number
  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

  try {
    // Check if the email or phone number already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ? OR phone_number = ?', [email, phoneNumber]);

    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'User already registered.' });
    }

    // Insert new user into the database
    await db.query(`
      INSERT INTO users (full_name, email, phone_number, pincode, city, state, country, account_number)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, email, phoneNumber, pincode, city, state, country, accountNumber]
    );

    // Return success response with account number
    res.json({
      success: true,
      message: 'User registered successfully',
      accountNumber,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

module.exports = router;
