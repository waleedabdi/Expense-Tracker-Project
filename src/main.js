import { fetchExchangeRates } from "../src/api.js";

const currencies = ["USD", "EUR", "GBP", "KES", "NGN", "JPY"];
const categories = ["Food", "Transport", "Shopping", "Bills", "Health", "Other"];
const expenses = [];

const form = document.getElementById("expense-form");
const currencySelect = document.getElementById("currency");
const categorySelect = document.getElementById("category");
const baseCurrencySelect = document.getElementById("base-currency");
const categoryFilter = document.getElementById("filter-category");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");
const rateStatus = document.getElementById("rate-status");
const formError = document.getElementById("form-error");
const emptyMessage = document.getElementById("empty-message");

function addOptions(select, options) {
  options.forEach(function (optionText) {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    select.appendChild(option);
  });
}

function setUpMenus() {
  addOptions(currencySelect, currencies);
  addOptions(categorySelect, categories);

  const allCategoriesOption = document.createElement("option");
  allCategoriesOption.value = "all";
  allCategoriesOption.textContent = "All categories";
  categoryFilter.appendChild(allCategoriesOption);

  addOptions(categoryFilter, categories);
}

function showExpenses() {
  expenseList.innerHTML = "";

  const selectedCategory = categoryFilter.value;

  expenses.forEach(function (expense, index) {
    if (selectedCategory !== "all" && expense.category !== selectedCategory) {
      return;
    }

    const item = document.createElement("li");
    item.className = "expense";

    const description = document.createElement("span");
    description.textContent = expense.description;

    const category = document.createElement("span");
    category.textContent = expense.category;

    const amount = document.createElement("span");
    amount.textContent = `${expense.amount.toFixed(2)} ${expense.currency}`;

    const convertedAmount = document.createElement("span");
    convertedAmount.className = "converted-amount";
    convertedAmount.textContent = "—";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${expense.description}`);
    deleteButton.addEventListener("click", function () {
      expenses.splice(index, 1);
      showExpenses();
      updateTotal();
    });

    item.append(description, category, amount, convertedAmount, deleteButton);
    expenseList.appendChild(item);
  });

  emptyMessage.hidden = expenses.length > 0;
}

async function updateTotal() {
  const baseCurrency = baseCurrencySelect.value;

  totalAmount.textContent = "Loading…";
  rateStatus.textContent = "Loading exchange rates…";

  try {
    const result = await fetchExchangeRates(baseCurrency);
    let total = 0;

    expenses.forEach(function (expense, index) {
      let convertedAmount = expense.amount;

      if (expense.currency !== baseCurrency) {
        const rate = Number(result.rates[expense.currency]);

        if (!Number.isFinite(rate) || rate <= 0) {
          throw new Error(`No exchange rate found for ${expense.currency}.`);
        }

        convertedAmount = expense.amount / rate;
      }

      total += convertedAmount;

      const item = expenseList.children[index];
      if (item) {
        const convertedText = item.querySelector(".converted-amount");
        convertedText.textContent = `${convertedAmount.toFixed(2)} ${baseCurrency}`;
      }
    });

    totalAmount.textContent = `${total.toFixed(2)} ${baseCurrency}`;
    rateStatus.textContent = "Exchange rates loaded.";
  } catch (error) {
    totalAmount.textContent = `Unavailable ${baseCurrency}`;
    rateStatus.textContent = error.message;
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  formError.textContent = "";

  const description = document.getElementById("description").value.trim();
  const amount = Number(document.getElementById("amount").value);

  if (description === "" || !Number.isFinite(amount) || amount <= 0) {
    formError.textContent = "Enter a description and an amount greater than zero.";
    return;
  }

  expenses.push({
    description: description,
    amount: amount,
    currency: currencySelect.value,
    category: categorySelect.value
  });

  form.reset();
  showExpenses();
  updateTotal();
});

categoryFilter.addEventListener("change", showExpenses);
baseCurrencySelect.addEventListener("change", updateTotal);

setUpMenus();
showExpenses();
updateTotal();