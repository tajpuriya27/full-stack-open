import { createSlice } from "@reduxjs/toolkit";

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

export default userReducer.reducer;
