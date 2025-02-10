const express = require('express'); //for backend API
const sqlite3 = require('sqlite3').verbose(); //for DB Interaction
const bodyParser = require('body-parser');
const path = require('path'); // Import the 'path' module


const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public')); // Serve static files like index.html, style.css, etc.

const db = new sqlite3.Database('./database/expenses.db');

// Endpoint to fetch all expenses (for displaying expenses)
app.get('/expenses', (req, res) => {
    console.log('Received request for expenses...'); 
    const sql = `SELECT * FROM expenses`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// API Endpoint to add an expense
app.post('/add-expense', (req, res) => {
    console.log('POST request for expenses...');
    const { description, amount, category, date } = req.body;

    const sql = `INSERT INTO expenses (description, amount, category, date) VALUES (?, ?, ?, ?)`;
    db.run(sql, [description, amount, category, date], function (err) {
        if (err) {
            console.error(err.message); // Log the error to the console
            return res.status(500).json({ error: err.message }); //500 (Internal Server Error), indicating something went wrong.
        }
        res.status(201).json({ id: this.lastID }); //201 ndicating a new resource was successfully created.
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
