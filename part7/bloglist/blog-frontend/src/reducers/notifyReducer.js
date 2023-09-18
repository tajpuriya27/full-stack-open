import { createSlice } from "@reduxjs/toolkit";

const initialState = { notification: null, err: null };

const notifyReducer = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotifyMessage(state, action) {
      console.log(action.payload);

      return { state, notification: action.payload };
    },
    setErrMessage(state, action) {
      return { state, err: action.payload };
    },
    resetNotify(state, action) {
      return initialState;
    },
  },
});

export const setNotification = (notify, notifyTime) => {
  return async (dispatch) => {
    dispatch(setNotifyMessage(notify));
    setTimeout(() => {
      dispatch(resetNotify());
    }, notifyTime);
  };
};

export const setError = (notify, notifyTime) => {
  return async (dispatch) => {
    dispatch(setErrMessage(notify));
    setTimeout(() => {
      dispatch(resetNotify());
    }, notifyTime);
  };
};

export const { setNotifyMessage, setErrMessage, resetNotify } =
  notifyReducer.actions;
export default notifyReducer.reducer;
