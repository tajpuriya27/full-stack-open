import { configureStore } from "@reduxjs/toolkit";

import notifyReducer from "./reducers/notifyReducer";
import userReducer from "./reducers/userReducer";

const reducer = {
  notify: notifyReducer,
  user: userReducer,
};

const store = configureStore({ reducer });

export default store;
