import { v4 } from "node-uuid";
import * as api from "../api/index";

//object expression
export const addTodo = (text) => ({
  type: "ADD_TODO",
  id: v4(),
  text
});

const requestTodo = (filter) => ({
  type: "REQUEST_TODO",
  filter
});

export const receiveTodos = (todo, filter) => ({
  type: "RECIEVE_TODO",
  response: todo,
  filter
});

export const toggleTodo = (id) => ({
  type: "TOGGLE_TODO",
  id
});

export const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodo(filter));
  return api
    .fetchTodos(filter)
    .then((todos) => dispatch(receiveTodos(todos, filter)));
};
