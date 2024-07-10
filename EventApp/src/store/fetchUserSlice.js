import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Assuming MongoDB URL
const API_BASE_URL = 'http://localhost:9999';

export const registerUser = createAsyncThunk(
  'register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      const authToken = response.data.authToken; // Assuming authToken is returned in the response data

      return { ...response.data, authToken };
    } catch (error) {
      console.error('Error registering user:', error.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'login',
  async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, userData
      );
      // const authToken = response.data.authToken; // Assuming authToken is returned in the response data

      return response.data;
    } catch (error) {
      console.error('Error logging in user:', error);
      //return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const fetchUserSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    authToken: null,
  },
  reducers: {
    // Additional reducers if needed
    logoutUser: (state) => {
      state.userInfo = null;
      state.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.authToken = action.payload.authToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.authToken = action.payload.authToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = fetchUserSlice.actions;

export default fetchUserSlice.reducer;
