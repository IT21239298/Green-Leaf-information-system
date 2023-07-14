import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import ExpenseForm from "./ExpenseForm";
import jsPDF from "jspdf";
import Button from "../Button/Button";
import { book } from "../../utils/Icons";

function Expenses() {
  const { addIncome, expenses, getExpenses, deleteExpense, totalExpenses } =
    useGlobalContext();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getExpenses();
  }, []);

  function generateReport() {
    const doc = new jsPDF();
    // ||
    // expense.amount.toString().includes(searchTerm.toString())
    // Add content to the PDF document
    doc.text("Expense Report", 10, 10);
    expenses.forEach((expense, index) => {
      const { title, amount, date, category, description, type } = expense;
      const y = 20 + index * 10;
      doc.text(
        `Title: ${title}, Amount: ${amount}, Date: ${date}, Category: ${category}, Description: ${description}, Type: ${type}`,
        10,
        y
      );
    });

    // Download the PDF document
    doc.save("expense_report.pdf");
  }
  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1 className="top-expense">Expenses</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <h2 className="total-income">
          Total Expense: <span>${totalExpenses()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {filteredExpenses.map((expense) => {
              const { _id, title, amount, date, category, description, type } =
                expense;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                />
              );
            })}

            <div className="submit-btn">
              <Button
                name={"Genarate Report"}
                // icon={plus}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"red"}
                color={"#fff"}
                onClick={generateReport}
              />
            </div>
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2f2f3d;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2.5rem;
    color: white;
    gap: 0.5rem;
    font-family: "arvo";
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: red;
      font-family: "arvo";
    }
  }
  .top-expense {
    color: #fff;
    font-family: "arvo";
  }
  .income-content {
    color: #fff;
    display: flex;

    gap: 2rem;
    .incomes {
      flex: 1;
      background: #2f2f3d;
      border-radius: 20px;
      border: 1px solid #ffffff;
      font-family: "arvo";
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2f2f3d;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    color: white;
    gap: 0.5rem;
    input {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-green);
      background: none;
      border: none;
      outline: none;
      width:100%
      font-family: "arvo";
    }
  button {
    background: red;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    
  }
`;

export default Expenses;
