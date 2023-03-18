import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import addressSlice from "./address.slice";

//configuration of the store
const store = configureStore({
  reducer: {
    user: userSlice,
    address: addressSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
