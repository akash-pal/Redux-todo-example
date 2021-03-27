import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleTodo, receiveTodos } from "../actions";
import TodoList from "./TodoList";
import { getVisibleTodos } from "../reducers/index";
import { fetchTodos } from "../api/index";

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
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then((todo) => receiveTodos(todo, filter));
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.filter;
  return {
    todos: getVisibleTodos(state, filter),
    filter
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
    receiveTodos
  })(MainView)
);

export default VisibleTodoList;
