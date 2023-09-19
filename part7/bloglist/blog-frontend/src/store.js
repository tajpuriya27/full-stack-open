import { configureStore } from "@reduxjs/toolkit";

import notifyReducer from "./reducers/notifyReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const reducer = {
  notify: notifyReducer,
  blogs: blogReducer,
  user: userReducer,
};

const store = configureStore({ reducer });

export default store;
