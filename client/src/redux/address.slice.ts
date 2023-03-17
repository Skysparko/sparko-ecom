import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils/functions";
import { fetchUserAddress } from "../utils/address.function";

export const getAllAddresses = createAsyncThunk(
  "addresses/getAll",
  fetchUserAddress
);

export interface addressType {
  _id: string;
  userID: string;
  country: string;
  state: string;
  mobileNumber: string;
  fullName: string;
  pinCode: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
}

const addressSlice = createSlice({
  name: "address",
  initialState: {
    value: [],
    loading: false,
  },
  reducers: {
    // getAll(state, { payload }: PayloadAction<addressType>) {
    // },
    // removeUserData(state, { payload }: PayloadAction<addressType>) {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAddresses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAddresses.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default addressSlice.reducer;
