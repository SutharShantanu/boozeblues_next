import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    email: "",
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.fullName = "";
            state.email = "";
            state.token = "";
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
