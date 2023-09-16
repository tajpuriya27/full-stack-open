import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notifyReducer from "./reducers/notifyReducer";

const reducer = {
  anecdote: anecdoteReducer,
  filter: filterReducer,
  notify: notifyReducer,
};

const store = configureStore({ reducer });

export default store;
