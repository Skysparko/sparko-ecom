import { fetchAllCartItems } from "./../utils/cart.functions";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils/functions";
import { fetchAllOrders } from "../utils/order.functions";

//calling api to get all CartItems of the authorized user
export const getAllOrders = createAsyncThunk("order/getAll", fetchAllOrders);

export interface orderType {
  _id: string;
  userID: string;
  productID: string;
  quantity: number;
  payment: string;
  addressID: string;
  contact: string;
}

const orderSlice = createSlice({
  name: "order",
  //initial state of the order
  initialState: {
    value: [],
    loading: false,
  },
  reducers: {},
  // these extra reducers work on the case example pending or fulfilled
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default orderSlice.reducer;
