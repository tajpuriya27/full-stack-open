import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "./reducers/notifyReducer";
import blogReducer from "./reducers/blogReducer";
import loginUserReducer from "./reducers/loginUserReducer";
import userReducer from "./reducers/userReducer";

const reducer = {
  notify: notifyReducer,
  blogs: blogReducer,
  logedUser: loginUserReducer,
  users: userReducer,
};

const store = configureStore({ reducer });

export default store;
