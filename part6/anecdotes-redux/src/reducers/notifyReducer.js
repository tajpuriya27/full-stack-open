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

export const notifyTimeout = (msgToshow, timeInSec) => {
  return async (dispatch) => {
    dispatch(setNotification(`You voted '${msgToshow}'`));
    setTimeout(() => {
      dispatch(resetNotification());
    }, timeInSec * 1000);
  };
};

export const { setNotification, resetNotification } = notifyReducer.actions;
export default notifyReducer.reducer;
