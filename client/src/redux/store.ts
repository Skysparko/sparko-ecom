import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import addressSlice from "./address.slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    address: addressSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
