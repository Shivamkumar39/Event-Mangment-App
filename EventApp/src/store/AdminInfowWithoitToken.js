import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const  API_BASE_URL = 'http://localhost:9999';// replace with your actual base URL

// Async thunk for fetching second admin profiles
export const fetchAdminProfilesWithoutAuthtoken = createAsyncThunk(
  'fetchProfiles',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/getAdminProfile`)
    console.log(response.data);
    
    return response.data;
  }
);

const fetchSecondAdminSlice = createSlice({
  name: 'secondAdmin',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProfilesWithoutAuthtoken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminProfilesWithoutAuthtoken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAdminProfilesWithoutAuthtoken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default fetchSecondAdminSlice.reducer;
