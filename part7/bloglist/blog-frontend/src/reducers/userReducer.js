import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const userReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = userReducer.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const allUsers = await userService.getAllUser();
    dispatch(setUsers(allUsers));
  };
};

export default userReducer.reducer;
