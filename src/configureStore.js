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

  const addLoggingToDispatch = () => {
    return (next) => {
      if (!console.group) {
        return next;
      }

      return (action) => {
        console.group(action.type);
        console.log("%c prev state", "color: grey", store.getState());
        console.log("%c prev action", "color: blue", action);
        const returnValue = next(action);
        console.log("%c next state", "color: green", store.getState());
        console.groupEnd(action.type);
        return returnValue;
      };
    };
  };

  const addPromiseSupportToDispatch = () => {
    return (next) => {
      return (action) => {
        if (typeof action.then === "function") {
          return action.then(next);
        }
        return next(action);
      };
    };
  };

  const wrapMiddlewaresToDispatch = (middlewares, store) => {
    middlewares.forEach((middleware) => {
      store.dispatch = middleware(store)(store.dispatch);
    });
  };

  //initial state from storage
  //const persistedStore = loadState();

  const middlewares = [];

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
    middlewares.push(addLoggingToDispatch);
    //store.dispatch = addLoggingToDispatch(store);
  }
  middlewares.push(addPromiseSupportToDispatch);
  //store.dispatch = addPromiseSupportToDispatch(store);

  wrapMiddlewaresToDispatch(middlewares, store);

  return store;
};

export default configureStore;
