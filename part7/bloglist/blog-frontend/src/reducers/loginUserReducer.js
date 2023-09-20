import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

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

export const initializeUsers = () => {
  return async (dispatch) => {
    const allUsers = await userService.getAllUser();
    dispatch(setUser);
  };
};

export default loginUserReducer.reducer;
