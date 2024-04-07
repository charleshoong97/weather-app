import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const historySlice = createSlice({
  name: "history",
  initialState: [],
  reducers: {
    addHistory(state, action) {
      state.push({
        id: moment().unix() + state.length,
        createdDate: moment(),
        location: action.payload,
      });
      state.sort(
        (a, b) => moment(b.createdDate).unix() - moment(a.createdDate).unix()
      );
    },
    removeHistory(state, action) {
      return state.filter((history) => history.id !== action.payload);
    },
  },
});

export const { addHistory, removeHistory } = historySlice.actions;
export default historySlice.reducer;
