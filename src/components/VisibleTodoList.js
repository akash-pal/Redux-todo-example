import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchTodos, toggleTodo } from "../actions";
import TodoList from "./TodoList";
import { getVisibleTodos, getisFetching, getError } from "../reducers";
import Error from './Error';

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
    const { isFetching, todos, error } = this.props;
    if (isFetching && !todos.length) {
      return <div>Loading...</div>;
    } else if (error) {
      return <Error {...this.props}/>
    }
    return <TodoList {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.filter;
  return {
    todos: getVisibleTodos(state, filter),
    filter,
    isFetching: getisFetching(state, filter),
    error: getError(state, filter)
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
