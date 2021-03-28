import { combineReducers } from "redux";

const byId = (state = {}, action) => {
  switch (action.type) {
    case "RECIEVE_TODO":
      let filterTodos = state[action.filter];
      action.response.forEach(
        (todo) => (filterTodos = { ...filterTodos, [todo.id]: todo })
      );
      return {
        ...state,
        ...filterTodos
      };
    default:
      return state;
  }
};

const all = (state = [], action) => {
  if (action.filter === "all") {
    switch (action.type) {
      case "RECIEVE_TODO":
        return action.response.map((todo) => todo.id);
      default:
        return state;
    }
  }
  return state;
};

const active = (state = [], action) => {
  if (action.filter === "active") {
    switch (action.type) {
      case "RECIEVE_TODO":
        return action.response.map((todo) => todo.id);
      default:
        return state;
    }
  }
  return state;
};

const completed = (state = [], action) => {
  if (action.filter === "completed") {
    switch (action.type) {
      case "RECIEVE_TODO":
        return action.response.map((todo) => todo.id);
      default:
        return state;
    }
  }
  return state;
};

let allIds = combineReducers({
  all,
  active,
  completed
});

const todos = combineReducers({
  byId,
  allIds
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  return state.allIds[filter].map((id) => state.byId[id]);
};
