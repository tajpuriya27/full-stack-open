import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notifyReducer from "./reducers/notifyReducer";

const reducer = {
  anecdote: anecdoteReducer,
  filter: filterReducer,
  notify: notifyReducer,
};
const store = configureStore({ reducer });

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
