import {
  Expense,
  Income,
  IncomeTracker,
  ExpenseTracker,
} from "./expense-classes.js";

// Assuming Expense, Income, ExpenseTracker, and IncomeTracker classes are imported or defined above

// Select input elements for expenses
const expenseName = document.querySelector("#expense-name");
const expenseDate = document.querySelector("#expense-date");
const expenseCategory = document.querySelector("#expense-category");
const expenseAmount = document.querySelector("#expense-amount");
const expenseDesc = document.querySelector("#expense-description");
const expenseAddBtn = document.querySelector("#submit-expense-btn");

// Select input elements for incomes
const incomeName = document.querySelector("#income-name");
const incomeDate = document.querySelector("#income-date");
const incomeCategory = document.querySelector("#income-category");
const incomeAmount = document.querySelector("#income-amount");
const incomeDesc = document.querySelector("#income-description");
const incomeAddBtn = document.querySelector("#submit-income-btn");

// Select the table bodies for expenses and incomes
const expenseTableBody = document.querySelector("#expenseTable tbody");
const incomeTableBody = document.querySelector("#incomeTable tbody");

// Initialize trackers
const expenseTracker = new ExpenseTracker();
const incomeTracker = new IncomeTracker();

const deleteExpense = document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-button-id");
    const item = expenseTracker._items.find((expense) => expense.id == id);
    expenseTracker.removeItem(item, Expense);
  }
});
const deleteIncome = document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-button-id");
    const item = expenseTracker._items.find((income) => income.id == id);
    expenseTracker.removeItem(item, Income);
  }
});

// Function to create and add an expense
const addExpense = (e) => {
  e.preventDefault();

  const expense = new Expense(
    expenseName.value,
    expenseDate.value,
    expenseCategory.value,
    parseFloat(expenseAmount.value),
    expenseDesc.value
  );

  // Add expense to tracker
  expenseTracker.addExpense(expense);

  // Update table
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-id", expense.id);
  newRow.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.date.toLocaleDateString()}</td>
      <td>${expense.category}</td>
      <td>£${expense.amount}</td>
      <td class="delete-cell">${
        expense.desc
      } <button class="delete-btn" data-button-id="${
    expense.id
  }">Delete</button></td>`;
  expenseTableBody.appendChild(newRow);
  expenseName.value = "";
  expenseDate.value = "";
  expenseCategory.value = "";
  expenseAmount.value = "";
  expenseDesc.value = "";
};

// Function to create and add an income
const addIncome = (e) => {
  e.preventDefault();

  const income = new Income(
    incomeName.value,
    incomeDate.value,
    incomeCategory.value,
    parseFloat(incomeAmount.value),
    incomeDesc.value
  );

  // Add income to tracker
  incomeTracker.addIncome(income);

  // Update table
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-id", income.id);
  newRow.innerHTML = `
    <td>${income.name}</td>
      <td>${income.date.toLocaleDateString()}</td>
      <td>${income.category}</td>
      <td>£${income.amount}</td>
      <td class="delete-cell">${
        income.desc
      } <button class="delete-btn" data-button-id="${
    income.id
  }">Delete</button></td>
  `;
  incomeTableBody.appendChild(newRow);
  incomeName.value = "";
  incomeDate.value = "";
  incomeCategory.value = "";
  incomeAmount.value = "";
  incomeDesc.value = "";
};

// Add event listeners to the buttons
expenseAddBtn.addEventListener("click", addExpense);
incomeAddBtn.addEventListener("click", addIncome);
document.addEventListener("DOMContentLoaded", () => {
  const expenseTracker = new ExpenseTracker();
  const incomeTracker = new IncomeTracker();

  // Restore the UI with existing expenses and incomes
  expenseTracker._items.forEach((expense) => {
    addExpenseToTable(expense);
  });

  incomeTracker._items.forEach((income) => {
    addIncomeToTable(income);
  });
});
