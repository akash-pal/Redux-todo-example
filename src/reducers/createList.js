import { combineReducers } from "redux";

const createList = (filter) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "RECIEVE_TODO":
        return action.response.map((todo) => todo.id);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "REQUEST_TODO":
        return true;
      case "RECIEVE_TODO":
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
