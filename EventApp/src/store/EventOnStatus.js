import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:9999';

export const fetchCompletedEvents = createAsyncThunk('events/fetchCompleted', async () => {
  const response = await fetch(`${API_BASE_URL}/events/completed`);
  const data = await response.json();
  return data;
});

export const fetchOngoingEvents = createAsyncThunk('events/fetchOngoing', async () => {
  const response = await fetch(`${API_BASE_URL}/events/ongoing`);
  const data = await response.json();
  return data;
});

export const fetchUpcomingEvents = createAsyncThunk('events/fetchUpcoming', async () => {
  const response = await fetch(`${API_BASE_URL}/events/upcoming`);
  const data = await response.json();
  return data;
});

const eventsSlice = createSlice({
  name: 'Status',
  initialState: {
    upcomingEvents: [],
    ongoingEvents: [],
    completedEvents: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompletedEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.completedEvents = action.payload;
      })
      .addCase(fetchCompletedEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.upcomingEvents = action.payload;
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchOngoingEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOngoingEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ongoingEvents = action.payload;
      })
      .addCase(fetchOngoingEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default eventsSlice.reducer;
