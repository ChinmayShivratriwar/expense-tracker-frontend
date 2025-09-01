// src/features/budget/budgetSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance"; // keep consistent with your other files

// fetch budgets for a given month/year
export const fetchBudgets = createAsyncThunk(
  "budgets/fetchBudgets",
  async ({ month, year } = {}, { rejectWithValue, getState }) => {
    try {
      const res = await axiosInstance.get("/budgets", {
        params: { month, year },
      });
      // expect backend to return an array of budget objects
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// add a new budget
export const addBudget = createAsyncThunk(
  "budgets/addBudget",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/budgets", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// optionally: endpoint to top-up/spend on a budget (adjust path to your backend)
export const updateBudgetSpend = createAsyncThunk(
  "budgets/updateBudgetSpend",
  async ({ id, amount }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/budgets/${id}/spend`, { amount });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  items: [], // array of budget objects returned by backend
  loading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    // local-only helpers (if needed)
    clearBudgetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(addBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.loading = false;
        // backend returns created budget entity (with id, allocatedAmount, spentAmount, remainingAmount)
        state.items.push(action.payload);
      })
      .addCase(addBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(updateBudgetSpend.fulfilled, (state, action) => {
        // server returns updated budget — replace in list
        const updated = action.payload;
        const idx = state.items.findIndex((b) => b.id === updated.id);
        if (idx !== -1) state.items[idx] = updated;
      })
      .addCase(updateBudgetSpend.rejected, (state, action) => {
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { clearBudgetError } = budgetSlice.actions;
export default budgetSlice.reducer;
