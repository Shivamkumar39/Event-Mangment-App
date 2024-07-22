import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9999';

// Get user info from localStorage
const AdminInfoFromLocalStorage = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null;

// const initialState = {
//   adminInfo: AdminInfoFromLocalStorage,
//   loading: false,
//   error: null
// };

// export const loginAdmin = createAsyncThunk('loginAdmin', async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/admin-Login`, credentials);
//     const { authToken, adminInfo } = response.data;

//     // Save authToken and adminInfo to localStorage
//     localStorage.setItem('authToken', authToken);
//     localStorage.setItem('adminId', adminInfo.id);
//     localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
//       console.log(adminInfo);
//     return {adminInfo, authToken};
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
//     return rejectWithValue(errorMessage);
//   }
// });

export const loginAdmin = createAsyncThunk('loginAdmin', async (credentials, { rejectWithValue }) => {
  try {

    const response = await axios.post(`${API_BASE_URL}/admin-Login`, credentials);
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
    return rejectWithValue(errorMessage);
  }
})


// Async thunk for fetching all admins
export const FetchAdminProfile = createAsyncThunk('adminprofileFrontent', async (_, { rejectWithValue }) => {
  try {

    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      throw new Error('Auth token not found');
    }

    const response = await axios.get(`${API_BASE_URL}/adminprofileFrontent`, {
      headers: {
        'authToken': `Bearer ${authToken}`,
      }
    });

    //const adminInfo = response.data.adminInfo; // Parse the response body as JSON
    // if (!response.ok) {
    //   throw new Error('Failed to fetch admin profile');
    // }
    // const adminInfo = response.data;
    // console.log(response);
    // return adminInfo // Assuming response.data contains the admin profile
    return response.data;
  } catch (error) {
    const errorMessage = error.message || 'Failed to fetch admin profile. Please try again.';
    return rejectWithValue(errorMessage);
  }
});


export const updateAdminProfile = createAsyncThunk(
  'updateAdminProfile',
  async (adminData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('username', adminData.username);
      formData.append('email', adminData.email);
      formData.append('mobile', adminData.mobile);
      formData.append('linkedIn', adminData.linkedIn);
      formData.append('website', adminData.website);
      formData.append('github', adminData.github);
      formData.append('instagram', adminData.instagram);
      if (adminData.image) {
        formData.append('image', adminData.image);
      }


      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Auth token not found');
      }


      const response = await axios.post(`${API_BASE_URL}/updateadminProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authToken: authToken
        }
      });

      return response.data;
    } catch (error) {
      console.log("not abaivale to update", error);
      return rejectWithValue(error.response.data);
    }
  }
);



const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminInfo: AdminInfoFromLocalStorage,
    loading: false,
    error: null,
    authToken:null
  },
  reducers: {
    logoutAdmin: (state) => {
      state.adminInfo = null;
      state.authToken = null;
      state.adminId = null;
      // localStorage.removeItem('authToken');
      // localStorage.removeItem('adminId');
      // localStorage.removeItem('adminInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.adminInfo = null;
        state.authToken = null;

      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInfo = action.payload.adminInfo
        state.authToken = action.payload.authToken
       // console.log(action.payload);        // state.adminInfo = action.payload.adminInfo;
        // state.authToken = action.payload.authToken;
        // state.adminId = action.payload.adminInfo.id;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user profile
      .addCase(FetchAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInfo = action.payload.data;
        console.log(action.payload);
      })
      .addCase(FetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //updaingadminprofile
      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInfo = action.payload;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;
