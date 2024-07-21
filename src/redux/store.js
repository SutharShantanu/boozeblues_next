import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import addressSlice from "./slices/addressSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        address: addressSlice,
    },
});
