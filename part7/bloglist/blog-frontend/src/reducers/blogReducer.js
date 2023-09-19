import { createSlice } from "@reduxjs/toolkit";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log("setBlog hit");
      return action.payload;
    },
  },
});

export const { setBlogs } = blogReducer.actions;
export default blogReducer.reducer;
