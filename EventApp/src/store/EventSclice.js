import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9999';

// fetch event by adminid
export const fetchEventsById = createAsyncThunk(
    'fetchEventsById',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/events`, {
                headers: {
                    authToken: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//post evemnt
export const postEvent = createAsyncThunk(
    'postEvent',
    async (eventData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            for (const key in eventData) {
                formData.append(key, eventData[key]);
            }
            
            const response = await axios.post(`${API_BASE_URL}/postevent`, formData, {
                headers: {
                    'authToken': `Bearer ${localStorage.getItem('authToken')}`
                },
                data:{formData}
            });
            console.log(formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


//find event by eventdate
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:9999/events'); // Adjust the URL to your API endpoint
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

//fetch event with updating 
export const updateEvent = createAsyncThunk(
    'updateEvent',
    async ({ id, eventData }, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        for (const key in eventData) {
          formData.append(key, eventData[key]);
        }
  
        const response = await axios.put(`${API_BASE_URL}/events/update/${id}`, formData, {
          headers: {
            'authToken': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// Slice
const eventSlice = createSlice({
    name: 'events',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Events
            .addCase(fetchEventsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventsById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(fetchEventsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Post Event
            .addCase(postEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events.push(action.payload);
            })
            .addCase(postEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //updatingEvent
            .addCase(updateEvent.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(event => event._id === action.payload._id);
                if (index !== -1) {
                  state.data[index] = action.payload;
                }
              })
            .addCase(updateEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              });
    }
});

export default eventSlice.reducer;
