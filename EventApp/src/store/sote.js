// store.js
import { configureStore } from '@reduxjs/toolkit';
import fetchUserSlice from './fetchUserSlice';

const store = configureStore({
  reducer: {
    user: fetchUserSlice,
  },
});

export default store;


