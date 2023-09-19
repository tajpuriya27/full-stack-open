import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification, setError } from "./notifyReducer";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    updateBlog(state, action) {
      console.log("updated", action.payload);
      return state.map((n) =>
        n.id !== action.payload.id ? n : action.payload
      );
    },
    filterBlog(state, action) {
      return state.filter((n) => n.id !== action.payload.id);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, filterBlog } =
  blogReducer.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll();
    dispatch(setBlogs(allBlogs));
  };
};

export const createUpdateBlog = (newBlog) => {
  return async (dispatch) => {
    const response = await blogService.create(newBlog);
    dispatch(appendBlog(response));
  };
};

export const updateLikeOfBlog = (blogToUpdate) => {
  return async (disptach) => {
    const response = await blogService.update(blogToUpdate.id, blogToUpdate);
    if (response) {
      disptach(updateBlog(blogToUpdate));
    }
  };
};

export const delBlog = (blogToDelete) => {
  return async (dispatch) => {
    const response = await blogService.deleteBlog(blogToDelete.id);
    switch (response.status) {
      case 204: {
        dispatch(
          setNotification(
            `A blog, "${blogToDelete.title}" by ${blogToDelete.author} is deleted!!!`,
            1500
          )
        );
        dispatch(filterBlog(blogToDelete));
        break;
      }
      case 401: {
        dispatch(
          setError(
            `Authentication Error: A blog, "${blogToDelete.title}" by ${blogToDelete.author} cannot be deleted!!!`,
            3000
          )
        );
        break;
      }
      default: {
        dispatch(setNotification("Unknown Error!!", 1500));
        break;
      }
    }
  };
};
export default blogReducer.reducer;
