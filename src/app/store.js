import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import managerReducer from "../features/manager/managerSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        manager:managerReducer,
    },
});