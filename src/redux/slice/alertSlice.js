import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: "",
    type: "",
  },
  reducers: {
    showWarning(state, action) {
      state.message = action.payload;
      state.type = "error";
    },
    showSuccess(state, action) {
      state.message = action.payload;
      state.type = "success";
    },
    hideAlert(state, action) {
      state.message = "";
      state.type = "";
    },
  },
});

export const { showSuccess, showWarning, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
