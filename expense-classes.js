export class Expense {
  constructor(name, date, category, amount, desc) {
    this._id = Date.now();
    this._name = name;
    this._date = new Date(date);
    this._category = category;
    this._amount = amount;
    this._desc = desc || "";
  }
  get id() {
    return this._id;
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

export class Income extends Expense {
  constructor(name, date, category, amount, desc) {
    super(name, date, category, amount, desc);
  }
}

// Base Tracker class
export class Tracker {
  constructor() {
    this._items = [];
  }

  addItem(item, type) {
    if (item instanceof type) {
      this._items.push(item);
      this.saveItemsToStorage();
    } else {
      throw new Error(`${type.name} not found`);
    }
  }

  removeItem(item, type) {
    if (!(item instanceof type)) {
      throw new Error(`Invalid item type. Expected ${type.name}.`);
    }
    const index = this._items.indexOf(item);
    if (index !== -1) {
      this._items.splice(index, 1);
      this.saveItemsToStorage();
    } else {
      throw new Error("Item not found in tracker.");
    }
    const row = document.querySelector(`[data-id="${item.id}"]`);
    if (row) {
      row.remove();
    } else {
      throw new Error(`${type.name} not found in the tracker`);
    }
  }

  saveItemsToStorage() {
    localStorage.setItem("trackerItems", JSON.stringify(this._items));
  }
  loadItemsFromStorage() {
    const items = localStorage.getItem("trackerItems");
    return items ? JSON.parse(items) : [];
  }

  filterByCategory(category) {
    return this._items.filter(
      (item) => category.toLowerCase() === item.category.toLowerCase()
    );
  }

  filterByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this._items.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });
  }

  sortByAmountAscending() {
    return this._items.sort((itemA, itemB) => itemA.amount - itemB.amount);
  }

  sortByAmountDescending() {
    return this._items.sort((itemA, itemB) => itemB.amount - itemA.amount);
  }

  calculateTotal() {
    return this._items.reduce((total, current) => (total += current.amount), 0);
  }
}

// ExpenseTracker class
export class ExpenseTracker extends Tracker {
  constructor() {
    super();
  }

  addExpense(expense) {
    this.addItem(expense, Expense);
  }
  removeExpense(expense) {
    this.removeItem(expense, Expense);
  }
}

// IncomeTracker class
export class IncomeTracker extends Tracker {
  constructor() {
    super();
  }

  addIncome(income) {
    this.addItem(income, Income);
  }
  removeIncome(income) {
    this.removeItem(income, Income);
  }
}
