import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        loginStart(state) {
            state.isLoading = true;
            state.error = null;
        },

        loginSuccess(state, action) {

            state.isLoading = false;

            state.user = action.payload.user;

            state.token = action.payload.token;

            localStorage.setItem("token", action.payload.token);

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload.user)
            );
        },

        loginFailure(state, action) {

            state.isLoading = false;

            state.error = action.payload;
        },

        logout(state) {

            state.user = null;

            state.token = null;

            localStorage.removeItem("token");

            localStorage.removeItem("user");
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;