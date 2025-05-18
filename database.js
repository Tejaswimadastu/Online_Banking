// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'msgoud1978', // Replace with your MySQL password
    database: 'bank' // The name of your database
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Export the database connection for use in other parts of the app
module.exports = db;
