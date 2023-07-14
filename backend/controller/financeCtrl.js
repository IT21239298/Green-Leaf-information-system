const { Incomes, Expenses } = require("../models/financeModel");
// const ExpenseSchema = require("../models/financeModel");
// const IncomeSchema = require("../models/financeModel");

////////////////////! Expenses
exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = Expenses({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

exports.getExpense = async (req, res) => {
  try {
    const incomes = await Expenses.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  Expenses.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};

////////////////////! Incomes

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = Incomes({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Incomes.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  Incomes.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
