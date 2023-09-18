import { configureStore } from "@reduxjs/toolkit";

import notifyReducer from "./reducers/notifyReducer";

// const store = configureStore({ reducer: { notify: notifyReducer } });

const reducer = {
  notify: notifyReducer,
};

const store = configureStore({ reducer });

export default store;
