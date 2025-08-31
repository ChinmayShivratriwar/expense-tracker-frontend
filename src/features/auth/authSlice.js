import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

// ---- helpers ----
const extractUserFromToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id || decoded.userId || decoded.sub || null,
      username: decoded.username || decoded.name || decoded.preferred_username || null,
      email: decoded.email || null,
    };
  } catch {
    // bad/expired token
    localStorage.removeItem("accessToken");
    return null;
  }
};

// hydrate initial state from storage
const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");
const hydratedUser = extractUserFromToken(storedAccessToken);

// ---- thunks ----
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/register`, userData);

      // If your backend returns tokens on register:
      if (res.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        if (res.data.refreshToken) {
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }
        const user = extractUserFromToken(res.data.accessToken);
        return {
          user,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken || null,
        };
      }

      // If it doesn't, just return a passive payload
      return { user: null, accessToken: null, refreshToken: null };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/login`, credentials);

      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      // persist
      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      // decode user
      const user = extractUserFromToken(accessToken);

      return { user, accessToken, refreshToken: refreshToken || null };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const { refreshToken } = getState().auth;
    try {
      if (refreshToken) {
        await axios.post(
          `${API_URL}/logout`,
          {}, // empty body
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`, // attach refresh token in header
            },
          }
        );
      }
    } catch (err) {
      console.error("Logout API failed", err.response?.data || err.message);
      // we still proceed to clear local state
    }
    return true;
  }
);

// ---- slice ----
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: hydratedUser,
    accessToken: storedAccessToken || null,
    refreshToken: storedRefreshToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload || null;
      state.user = extractUserFromToken(action.payload || null);
      if (action.payload) localStorage.setItem("accessToken", action.payload);
      else localStorage.removeItem("accessToken");
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.accessToken) {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken || null;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
