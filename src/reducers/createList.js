import { combineReducers } from "redux";

const createList = (filter) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "FETCH_TODO_SUCCESS":
        return action.response.map((todo) => todo.id);
      default:
        return state;
    }
  };

  const error = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "FETCH_TODO_SUCCESS":
        return null;
      case "FETCH_TODO_ERROR":
        return action.error;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "FETCH_TODO":
        return true;
      case "FETCH_TODO_SUCCESS":
      case "FETCH_TODO_ERROR":
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    error
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getError = (state) => state.error;
