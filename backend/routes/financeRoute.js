const {
  addExpense,
  getExpense,
  deleteExpense,
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controller/financeCtrl");

const router = require("express").Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .delete("/delete-expense/:id", deleteExpense);

module.exports = router;
