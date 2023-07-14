import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function ExpenseForm() {
  const { addExpense, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Expense Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name={"amount"}
          placeholder={"Expense Amount"}
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="salary">Salary</option>
          <option value="Electricsity">Electricsity</option>
          <option value="mashineparts">Mashine Parts</option>
          <option value="stocks">Stocks</option>
          <option value="orders">Orders</option>
          <option value="payments">Payments</option>
          {/* <option value="youtube">Youtube</option> */}
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name={"Add Expense"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"red"}
          color={"#fff"}
        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
display: flex;
flex-direction: column;
gap: 2rem;

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
  padding: 0.5rem 1rem;
  border: 2px solid #fff;
  border-radius: 5px;
  background: #2f2f3d;
  outline: none;
  resize: none;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  color: white;

  &::placeholder {
    color: white;
  }
}

.input-control {
 
  input {
    width: 100%;
    
  }
}

.selects {
  display: flex;
  justify-content: flex-end;

  select {
    

    &:focus,
    &:active {
      color: color: white;;
    }
  }
}

.submit-btn {
  button {
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

    &:hover {
      background: var(--color-green) !important;
    }
  }
}
`;
export default ExpenseForm;
