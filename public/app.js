const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const showExpensesBtn = document.getElementById('show-expenses-btn');
const dateFilter = document.getElementById('date-filter');  // Dropdown for date range
const categoryFilter = document.getElementById('category-filter');  // Dropdown for category

let expenses = []; // Store all expenses for filtering
let expensesVisible = false; // Track visibility state

// Function to load and display expenses with filtering
async function loadExpenses() {
    try {
        const response = await fetch('http://localhost:3000/expenses');
        expenses = await response.json(); // Store all expenses
        applyFilters(); // Apply filters when loading
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

// Function to filter and display expenses
function applyFilters() {
    let filteredExpenses = [...expenses];

    // Filter by date range
    const dateRange = dateFilter.value;
    const currentDate = new Date();
    
    /*if (dateRange !== "all") {
        const months = parseInt(dateRange); 
        const startDate = new Date();
        startDate.setMonth(currentDate.getMonth() - months); */

        if (dateRange !== "all") {
            let startDate = new Date();  // Initialize the startDate as the current date
            
            if (dateRange === "1") {
                // Last 1 month: subtract 1 month from the current date
                startDate.setMonth(currentDate.getMonth() - 1);
            } else if (dateRange === "3") {
                // Last 3 months: subtract 3 months from the current date
                startDate.setMonth(currentDate.getMonth() - 3);
            } else if (dateRange === "6") {
                // Last 6 months: subtract 6 months from the current date
                startDate.setMonth(currentDate.getMonth() - 6);
            } else if (dateRange === "12") {
                // Last 12 months (1 year): subtract 12 months from the current date
                startDate.setFullYear(currentDate.getFullYear() - 1);
            }

        filteredExpenses = filteredExpenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= startDate;
        });
    }

    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== "all") {
        filteredExpenses = filteredExpenses.filter(expense => expense.category === selectedCategory);
    }

    // Display filtered expenses
    displayExpenses(filteredExpenses);
}

// Function to display expenses
function displayExpenses(expenseArray) {
    expenseList.innerHTML = ''; // Clear list

    expenseArray.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="expense-desc">${expense.description}</span>
            <span class="expense-amount">$${expense.amount}</span>
            <span class="expense-category">${expense.category || 'No Category'}</span>
            <span class="expense-date">${expense.date}</span>
        `;
        expenseList.appendChild(li);
    });

    if (expenseArray.length === 0) {
        expenseList.innerHTML = '<li>No expenses found.</li>';
    }
}

// Toggle expense visibility
function toggleExpenses() {
    if (expensesVisible) {
        expenseList.innerHTML = '';
        expenseList.classList.add('hidden');
        showExpensesBtn.textContent = 'Show Expenses';
        expensesVisible = false;
    } else {
      /*  loadExpenses();
        expenseList.classList.remove('hidden');
        showExpensesBtn.textContent = 'Hide Expenses';
        expensesVisible = true; */

        loadExpenses().then(() => {
            applyFilters();  // Apply filters only when showing expenses
            expenseList.classList.remove('hidden');
            showExpensesBtn.textContent = 'Hide Expenses';
            expensesVisible = true; });
    }
}

// Event listeners
showExpensesBtn.addEventListener('click', toggleExpenses);
//dateFilter.addEventListener('change', applyFilters);
//categoryFilter.addEventListener('change', applyFilters);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (!description || !amount || !category || !date) {
        alert('All fields are required.');
        return;
    }

    // Save expense to the database
    await fetch('http://localhost:3000/add-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount, category, date })
    });

    // Reload and apply filters to reflect the newly added expense
    loadExpenses();
    form.reset();
});
