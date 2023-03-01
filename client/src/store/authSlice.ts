import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// interface State {
//     name: string
// }

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: ""
    },
    reducers: {
        setName(state, { payload }: PayloadAction<string>) {
            state.name = payload
        },
    },
});

export const { setName } = authSlice.actions;
export default authSlice.reducer;