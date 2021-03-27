import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";

const history = createBrowserHistory();

export const RootProvider = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/:filter?" component={App} />
      </Router>
    </Provider>
  );
};
