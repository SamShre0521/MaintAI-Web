import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingFeedbacks: [],
  approvedFeedbacks: [],
  isLoading: false,
  error: null,
};

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    managerStart(state) {
      state.isLoading = true;
      state.error = null;
    },

    managerSuccess(state, action) {
      state.isLoading = false;
      state.pendingFeedbacks = action.payload.pendingFeedbacks;
      state.approvedFeedbacks = action.payload.approvedFeedbacks;
    },

    managerFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { managerStart, managerSuccess, managerFailure } =
  managerSlice.actions;

export default managerSlice.reducer;