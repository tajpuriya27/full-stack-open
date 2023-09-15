import { createSlice } from "@reduxjs/toolkit";

const notifyReducer = createSlice({
  name: "notification",
  initialState: "Notification goes here",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notifyReducer.actions;
export default notifyReducer.reducer;
