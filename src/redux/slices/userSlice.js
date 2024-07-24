import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user_id: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user_id = action.payload.user_id;
        },
        logout: (state) => {
            state.token = "";
            state.user_id = "";
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
