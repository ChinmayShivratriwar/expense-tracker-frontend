// src/store/transactionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api"; // change to your backend

// Async thunk for fetching transactions with pagination
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async ({ page = 0, size = 8 }, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth;
      const response = await axios.get(`${API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { page, size },
      });
      return response.data; // backend returns { content, page, size, totalItems, totalPages }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch transactions");
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    content: [], // transactions list
    page: 0,
    size: 8,
    totalItems: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetTransactions: (state) => {
      state.content = [];
      state.page = 0;
      state.size = 8;
      state.totalItems = 0;
      state.totalPages = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.content;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
