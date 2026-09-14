let expenses = [];
let monthlyLimit = 0;

// Set monthly expense limit
function setLimit() {

    const limit = Number(
        document.getElementById("monthlyLimit").value
    );

    if (limit <= 0) {
        alert("Please enter a valid monthly limit.");
        return;
    }

    monthlyLimit = limit;

    updateBudget();
}

// Add a new expense
function addExpense() {

    const name = document
        .getElementById("expenseName")
        .value
        .trim();

    const amount = Number(
        document.getElementById("expenseAmount").value
    );

    if (name === "" || amount <= 0) {
        alert("Please enter a valid expense.");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount
    };

    expenses.push(expense);

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";

    displayExpenses();
    updateBudget();
}

// Display expenses
function displayExpenses() {

    const list = document.getElementById("expenseList");

    list.innerHTML = "";

    expenses.forEach(function(expense) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${expense.name} - ₹${expense.amount}
            </span>

            <button
                class="delete-btn"
                onclick="deleteExpense(${expense.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}

// Delete expense
function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    displayExpenses();
    updateBudget();
}


// ==================================================
// NEW FEATURE: MONTHLY EXPENSE LIMIT
// ==================================================

function updateBudget() {

    const total = expenses.reduce(
        function(sum, expense) {
            return sum + expense.amount;
        },
        0
    );

    const remaining = monthlyLimit - total;

    document.getElementById("limitDisplay").textContent =
        monthlyLimit;

    document.getElementById("totalDisplay").textContent =
        total;

    document.getElementById("remainingDisplay").textContent =
        remaining;

    const warning = document.getElementById("warning");

    if (monthlyLimit === 0) {

        warning.textContent =
            "Set a monthly expense limit.";

    } else if (remaining < 0) {

        warning.textContent =
            "⚠️ Monthly expense limit exceeded!";

    } else {

        warning.textContent =
            "✅ You are within your monthly budget.";
    }
}