import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import addressSlice from "./address.slice";
import productSlice from "./product.slice";
import categorySlice from "./category.slice";

//configuration of the store
const store = configureStore({
  reducer: {
    user: userSlice,
    address: addressSlice,
    product: productSlice,
    category: categorySlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
