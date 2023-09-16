import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const btnClick = (e) => {
    console.log(e.target.name.toUpperCase());
    const dispatchType = e.target.name.toUpperCase();
    store.dispatch({
      type: dispatchType,
    });
  };

  return (
    <div>
      <button onClick={(e) => btnClick(e)} name="good">
        good
      </button>
      <button onClick={(e) => btnClick(e)} name="ok">
        ok
      </button>
      <button onClick={(e) => btnClick(e)} name="bad">
        bad
      </button>
      <button onClick={(e) => btnClick(e)} name="zero">
        reset stats
      </button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
