import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9999';

// Get user info from localStorage
const AdminInfoFromLocalStorage = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null;

const initialState = {
  adminInfo: AdminInfoFromLocalStorage,
  loading: false,
  error: null,
  authToken: localStorage.getItem('authToken') || null,
  adminId: localStorage.getItem('adminId') || null, // Add adminId to initialState
};

// Async thunk for second admin login
export const loginAdmin = createAsyncThunk('loginAdmin', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin-Login`, credentials);
    const data = response.data;

    // Save authToken, adminId, and adminInfo to localStorage
    localStorage.setItem('authToken', data.authToken);
    localStorage.setItem('adminId', data.id);
    localStorage.setItem('adminInfo', JSON.stringify(data));

    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
    return rejectWithValue(errorMessage);
  }
});







const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.adminInfo = null;
      state.authToken = null;
      state.adminId = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminId');
      localStorage.removeItem('adminInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInfo = action.payload;
        state.authToken = action.payload.authToken;
        state.adminId = action.payload.id;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;
