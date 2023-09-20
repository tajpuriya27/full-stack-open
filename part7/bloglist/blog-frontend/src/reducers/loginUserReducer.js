import { createSlice } from "@reduxjs/toolkit";

const loginUserReducer = createSlice({
  name: "loginUser",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = loginUserReducer.actions;

export default loginUserReducer.reducer;
