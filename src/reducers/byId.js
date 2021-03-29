const byId = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_TODO_SUCCESS":
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

export default byId;

export const getTodo = (state, id) => state[id];
