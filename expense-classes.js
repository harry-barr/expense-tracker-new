class Expense {
  constructor(name, date, category, amount, desc) {
    this._name = name;
    this._date = date;
    this._category = category;
    this._amount = amount;
    this._desc = desc;
  }
  get name() {
    return this._name;
  }
  get date() {
    return this._date;
  }
  get category() {
    return this._category;
  }
  get amount() {
    return this._amount;
  }
  get desc() {
    return this._desc;
  }
  set amount(newAmount) {
    if (typeof newAmount === "number" && newAmount > 0) {
      this._amount = newAmount;
    } else {
      throw new Error("New amount must be a positive number");
    }
  }
}

class Income extends Expense {
  constructor(name, date, category, amount, desc) {
    super(name, date, category, amount, desc);
  }
}

class ExpenseTracker {
  constructor() {
    this._expenses = [];
  }
  addExpense(expense) {
    if (expense instanceof Expense) {
      this._expenses.push(expense);
    } else {
      throw new Error("Expense not found");
    }
  }
}

class Incometracker {
  constructor() {
    this._incomes = [];
  }
  addIncome(income) {
    if (income instanceof Income) {
      this._incomes.push(income);
    } else {
      throw new Error("Income not found");
    }
  }
}
