const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');

// Get from local storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add transaction
form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter description and amount');
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    updateLocalStorage();
    init();

    text.value = '';
    amount.value = '';
});

// Init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
    const item = document.createElement('li');

    item.innerHTML = `
        ${transaction.text}
        <span>${transaction.amount < 0 ? '-' : '+'}₹${Math.abs(transaction.amount)}</span>
        <button onclick="removeTransaction(${transaction.id})">❌</button>
    `;

    list.appendChild(item);
}

// Update balance, income & expense
function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, val) => acc + val, 0);
    const incomeTotal = amounts
        .filter(val => val > 0)
        .reduce((acc, val) => acc + val, 0);
    const expenseTotal = amounts
        .filter(val => val < 0)
        .reduce((acc, val) => acc + val, 0);

    balance.innerText = `₹${total}`;
    income.innerText = `₹${incomeTotal}`;
    expense.innerText = `₹${Math.abs(expenseTotal)}`;
}

// Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Run app
init();
