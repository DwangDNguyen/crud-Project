import { createSlice } from "@reduxjs/toolkit";

const personSlice = createSlice({
    name: "person",
    initialState: {
        person: null,
        error: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.person = action.payload;
            state.error = false;
        },
        loginFailure: (state, action) => {
            state.error = true;
        },
        logout: (state, action) => {
            state.person = null;
        },
    },
});

export const { loginSuccess, loginFailure, logout } = personSlice.actions;
export default personSlice.reducer;
