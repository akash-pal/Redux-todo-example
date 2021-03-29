import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchTodos, toggleTodo, requestTodo } from "../actions";
import TodoList from "./TodoList";
import { getVisibleTodos, getisFetching } from "../reducers/index";

class MainView extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    if (this.props.isFetching && !this.props.todos.length) {
      return <div>Loading...</div>;
    }
    return <TodoList {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.filter;
  return {
    todos: getVisibleTodos(state, filter),
    filter,
    isFetching: getisFetching(state, filter)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};
// mapDispatchToProps shorthand
const VisibleTodoList = withRouter(
  connect(mapStateToProps, {
    onTodoClick: toggleTodo,
    fetchTodos
  })(MainView)
);

export default VisibleTodoList;
