import { createStore } from "redux";
import todoApp from "./reducers";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash.throttle";

const configureStore = () => {
  // supplying initial state
  const initialState = {
    todos: [
      {
        id: 0,
        text: "Test",
        completed: false
      }
    ]
  };

  const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    if (!console.group) {
      return rawDispatch;
    }

    return (action) => {
      console.group(action.type);
      console.log("%c prev state", "color: grey", store.getState());
      console.log("%c prev action", "color: blue", action);
      const returnValue = rawDispatch(action);
      console.log("%c next state", "color: green", store.getState());
      console.groupEnd(action.type);
      return returnValue;
    };
  };

  const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    return (action) => {
      if (typeof action.then === "function") {
        return action.then(rawDispatch);
      }
      return rawDispatch(action);
    };
  };

  //initial state from storage
  //const persistedStore = loadState();

  const store = createStore(
    todoApp,
    //persistedStore,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  // store.subscribe(
  //   throttle(() => {
  //     saveState({ todos: store.getState().todos });
  //   }, 1000)
  // );

  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch = addPromiseSupportToDispatch(store);

  return store;
};

export default configureStore;
