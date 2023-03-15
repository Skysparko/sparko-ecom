import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils/functions";

export const getAllAddresses = createAsyncThunk(
  "addresses/getAll",
  async () => {
    try {
      const res = await instance.get(
        "http://localhost:8080/api/v1/address/user-addresses"
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
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
