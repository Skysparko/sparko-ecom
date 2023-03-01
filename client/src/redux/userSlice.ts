import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface user {
  email: string;
  isAuthenticated: boolean;
  name: string;
  gender: string;
  role: string;
  id: string;
  pfp: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    isAuthenticated: false,
    name: "",
    gender: "",
    role: "",
    id: "",
    pfp: "",
  },
  reducers: {
    addUserData(state, { payload }: PayloadAction<user>) {
      state.name = payload.name;
      state.isAuthenticated = payload.isAuthenticated;
      state.email = payload.email;
      state.gender = payload.gender;
      state.role = payload.role;
      state.id = payload.id;
      state.pfp = payload.pfp;
    },
    removeUserData(state, { payload }: PayloadAction<user>) {
      state.name = "";
      state.isAuthenticated = false;
      state.email = "";
      state.gender = "";
      state.role = "";
      state.id = "";
      state.pfp = "";
    },
  },
});

export const { addUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
