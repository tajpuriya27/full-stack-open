import { createSlice } from "@reduxjs/toolkit";

const notifyReducer = createSlice({
  name: "notification",
  initialState: "Notification goes here",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification(state, action) {
      return "Notification goes here";
    },
  },
});

export const { setNotification, resetNotification } = notifyReducer.actions;
export default notifyReducer.reducer;
