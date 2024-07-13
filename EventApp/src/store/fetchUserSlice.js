import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9999';  // Replace with your actual API base URL

// Async thunk to register user
export const registerUser = createAsyncThunk(
  'register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      const authToken = response.data.authToken; // Assuming authToken is returned in the response data

      return { ...response.data, authToken };
    } catch (error) {
      console.error('Error registering user:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to login user
export const loginUser = createAsyncThunk(
  'login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, userData);
      const { authToken, userInfo } = response.data; 
      console.log("🚀 ~ user:", userInfo)
      console.log("🚀 ~ response.data:", response.data)

      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      return { userInfo: userInfo, authToken };
    } catch (error) {
      console.error('Error logging in user:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Auth token not found');
      }

      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          'authToken': `Bearer ${authToken}`,
        }
      });

      console.log(response.data); // Assuming response structure is { userInfo }
      return response.data; // Adjust this line based on your actual response structure
      
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  'updateProfile',
  async (profileData, { rejectWithValue }) => {


  
    try {
      const formData = new FormData();
      formData.append('id', profileData.id);
      formData.append('username', profileData.username);
      formData.append('email', profileData.email);
      formData.append('mobile', profileData.mobile);
      if (profileData.image) {
        formData.append('image', profileData.image);
      }

      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Auth token not found');
      }

      const response = await axios.post(`${API_BASE_URL}/updateProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authToken: authToken
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get user info from localStorage
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userInfo: userInfoFromLocalStorage,
  loading: false,
  error: null,
  authToken: localStorage.getItem('authToken') || null,
};

// Create user slice with initial state
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null;
      state.authToken = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
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
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
        state.authToken = action.payload.authToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || 'Error fetching profile';
      })
      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
