import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: "",
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = "";
            state.token = "";
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
