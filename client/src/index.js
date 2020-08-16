import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

// first argument is a reducer. Note that () => [] is just a dummy reducer
// store is a redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// provider is a library that helps react and redux interact
// the provider tag is a react component. It informs React that the redux store has had a change.
// The provider informs all of its children components that a new state is available and updates its children components accordingly
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// Will print out from .env files
// console.log("STRIPE KEY IS", process.env.REACT_APP_STRIPE_KEY);
// console.log("Environment is", process.env.NODE_ENV);
