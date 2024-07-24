import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import userReducer from "./slices/userSlice";
import addressReducer from "./slices/addressSlice";

const rootReducer = combineReducers({
    user: userReducer,
    address: addressReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "address"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
