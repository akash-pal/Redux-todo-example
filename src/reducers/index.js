import { combineReducers } from "redux";
import byId, * as fromById from "./byId";
import createList, * as fromList from "./createList";

let filterByIds = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed")
});

const todoApp = combineReducers({
  byId,
  filterByIds
});

export default todoApp;

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.filterByIds[filter]);
  return ids.map((id) => fromById.getTodo(state.byId, id));
};

export const getisFetching = (state, filter) =>
  fromList.getIsFetching(state.filterByIds[filter]);

export const getError = (state, filter) =>
  fromList.getError(state.filterByIds[filter]);
