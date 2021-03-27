import { combineReducers } from "redux";
import todos, * as todoItems from "./todos";

const todoApp = combineReducers({
  todos
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  todoItems.getVisibleTodos(state.todos, filter);
