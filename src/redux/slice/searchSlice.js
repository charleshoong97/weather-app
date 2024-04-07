import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchText: "",
    location: null,
    options: [],
    sync: false,
  },
  reducers: {
    searchTextChange(state, action) {
      state.searchText = action.payload;
    },
    updateLocation(state, action) {
      state.location = action.payload;
    },
    updateOptions(state, action) {
      state.options = action.payload;
    },
    toggleSync(state, action) {
      state.sync = !state.sync;
    },
  },
});

export const { searchTextChange, updateLocation, updateOptions, toggleSync } =
  searchSlice.actions;
export default searchSlice.reducer;
