import { v4 } from "node-uuid";

//object expression
export const addTodo = (text) => ({
  type: "ADD_TODO",
  id: v4(),
  text
});

export const receiveTodos = (todo, filter) => ({
  type: "RECIEVE_TODO",
  todo,
  filter
});

export const toggleTodo = (id) => ({
  type: "TOGGLE_TODO",
  id
});
