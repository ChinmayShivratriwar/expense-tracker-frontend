import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import transactionReducer from "../features/transaction/transactionSlice"
import budgetReducer from "../features/budget/budgetSlice"
import adminReducer from "../features/admin/adminSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    budgets: budgetReducer,
    admin: adminReducer,
  },
});


export default store;