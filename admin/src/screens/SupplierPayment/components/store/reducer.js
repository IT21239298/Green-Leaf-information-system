import { createSlice } from "@reduxjs/toolkit";

const initialState = {


  payment: [],
  
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    getTransactions: (state) => {
      // get code
    },
    getMatirials: (state) => {},
  },
});

export const { getTransactions } = expenseSlice.actions;
export const { getMatirials } = expenseSlice.actions;
export default expenseSlice.reducer;
