// store.js
import { configureStore } from '@reduxjs/toolkit';
import fetchUserSlice from './fetchUserSlice';
import FetchAdminSlice from './FetchAdminSlice';

const store = configureStore({
  reducer: {
    user: fetchUserSlice,
    admin: FetchAdminSlice,
  },

});

export default store;


