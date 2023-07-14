import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  transaction: [],
  machine: [],
  matirial: [],
  matirialcategories: [],
  product: [],
  productcategories: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    getTransactions: (state) => {
      // get code
    },
    getMatirials: (state) => {},
    getProduct: (state) => {},
  },
});

export const { getTransactions } = expenseSlice.actions;
export const { getMatirials } = expenseSlice.actions;
export const { getProduct } = expenseSlice.actions;
export default expenseSlice.reducer;
