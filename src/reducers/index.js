import { combineReducers } from "redux";
import byId, * as fromById from "./byId";
import createList, * as fromList from "./createList";

let allIds = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed")
});

const todoApp = combineReducers({
  byId,
  allIds
});

export default todoApp;

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.allIds[filter]);
  return ids.map((id) => fromById.getTodo(state.byId, id));
};
