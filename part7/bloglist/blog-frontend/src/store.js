import { configureStore } from "@reduxjs/toolkit";

import notifyReducer from "./reducers/notifyReducer";
import blogReducer from "./reducers/blogReducer";

// const store = configureStore({ reducer: { notify: notifyReducer } });

const reducer = {
  notify: notifyReducer,
  blogs: blogReducer,
};

const store = configureStore({ reducer });

export default store;
