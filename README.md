# Personal-Expense
Simple web application for tracking personal expenses. 

It allows users to add, view, and filter expenses by categories and date ranges. This app is built using Node.js, Express, SQLite, and basic front-end technologies like HTML, CSS, and JavaScript.

Features

Add Expenses: Users can add new expenses including description, amount, category, and date.
View Expenses: All expenses are displayed in a list format with their respective details.
Filter Expenses: Users can filter expenses based on category and date range (e.g., Last 1 month, Last 3 months, etc.).
Responsive Interface: The front-end is built to be responsive and user-friendly.

Technologies Used:
Backend:
Node.js with Express: To handle the server-side logic and API routes.
SQLite3: A lightweight relational database to store expenses.
Frontend:
HTML: To structure the user interface.
CSS: For styling the page.
JavaScript: For adding interactivity and dynamic content to the page.
Others:
Body-Parser: Middleware for parsing request bodies.
Path: To resolve file paths for serving static files.
Project Setup

To get the project up and running on your local machine, follow these steps:

Prerequisites
Make sure you have the following installed on your machine:

Node.js (version 12.x or later)
npm (Node package manager)

Steps to Run the Project
1. Clone the repository:
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2. Install dependencies:
npm install
3. Set up the database: The app uses an SQLite database to store expenses. You can initialize the database by creating a database/expenses.db file. You may need to create the initial table for expenses in SQLite if it's not created already.
Example SQL to create the expenses table:
CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT,
    date TEXT NOT NULL
);
4. Run the server:
npm start
This will start the server at http://localhost:3000. You can now access the app in your browser.
5. Access the app:
The backend API endpoints are:
GET /expenses: Fetches all expenses.
POST /add-expense: Adds a new expense.
The frontend can be accessed directly by navigating to http://localhost:3000 in your browser.



How to Use the Application

Add an Expense:
Fill out the form with the description, amount, category, and date of the expense.
Click on the "Add Expense" button to add the expense to the database.
View Expenses:
Click the "Show Expenses" button to display all expenses in a list format.
The expenses can be filtered based on the selected date range (e.g., "Last 3 months", "This Month") and category (e.g., "Food", "Transport").
Filter Expenses:
Use the "Filter by Date" dropdown to filter expenses by date range (e.g., "Last 1 Month", "Last 3 Months").
Use the "Filter by Category" dropdown to filter by a specific category of expense.
License

This project is open source and available under the MIT License.

A Few Notes on GitHub:
Replace your-username in the git clone command with your actual GitHub username.
If you haven't yet added your database file (expenses.db) to GitHub, you might want to exclude it in .gitignore since it may contain sensitive or user-specific data.

