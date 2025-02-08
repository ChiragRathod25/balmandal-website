import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../slices/userSlice/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
  },
});

export default store;
