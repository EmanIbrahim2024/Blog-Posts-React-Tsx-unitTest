import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSliceAndtest/authSlice';
import postReducer from './PostSliceAndtest/postSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
   
  },
});