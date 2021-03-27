//import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import configureStore from "./configureStore";
import { RootProvider } from "./components/RootProvider";

const store = configureStore();

render(<RootProvider store={store} />, document.getElementById("root"));
