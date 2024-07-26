// store.js
import { configureStore } from '@reduxjs/toolkit';
import fetchUserSlice from './fetchUserSlice';
import FetchAdminSlice from './FetchAdminSlice';
import EventSclice from './EventSclice';
import EventOnStatus from './EventOnStatus';
import AdminInfowWithoitToken from './AdminInfowWithoitToken';

const store = configureStore({
  reducer: {
    user: fetchUserSlice,
    admin: FetchAdminSlice,
    event: EventSclice,
    Status: EventOnStatus,
    secondAdmin: AdminInfowWithoitToken
  },

});

export default store;


