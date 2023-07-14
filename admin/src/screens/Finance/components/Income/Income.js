import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import jsPDF from "jspdf";
import Button from "../Button/Button";
import { book } from "../../utils/Icons";

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } =
    useGlobalContext();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getIncomes();
  }, []);

  function generateReport() {
    const doc = new jsPDF();

    // Add content to the PDF document
    doc.text("Income Report", 10, 10);
    incomes.forEach((income, index) => {
      const { title, amount, date, category, description, type } = income;
      const y = 20 + index * 10;
      doc.text(
        `Title: ${title}, Amount: ${amount}, Date: ${date}, Category: ${category}, Description: ${description}, Type: ${type}`,
        10,
        y
      );
    });
    // ||
    // income.amount.toString().includes(searchTerm.toString())
    // Download the PDF document
    doc.save("income_report.pdf");
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  const filteredIncomes = incomes.filter((income) =>
    income.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1 className="top-income">Incomes</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <h2 className="total-income">
          Total Income: <span>${totalIncome()}</span>
        </h2>

        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {filteredIncomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
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
                  deleteItem={deleteIncome}
                />
              );
            })}

            <div className="submit-btn">
              <Button
                name={"Genarate Report"}
                // icon={plus}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"green"}
                color={"#fff"}
                onClick={generateReport}
              />
            </div>
            {/* <button className="button" onClick={generateReport}>
              Generate Report
            </button> */}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
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
      color: var(--color-green);
      font-family: "arvo";
    }
  }
  .top-income {
    color: #fff;
    font-family: "arvo";
  }
  .income-content {
    color: #fff;
    background: #2f2f3d;
    display: flex;
    font-family: "arvo";

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
    background: green;
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
    background: var(--color-green);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    
  }
`;

export default Income;
