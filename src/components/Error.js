import React from "react";

class Error extends React.Component {
  // retry = () => {
  //   const { fetchTodos, filter } = this.props;
  //   fetchTodos(filter);
  // };

  render() {
    const { error, fetchTodos, filter } = this.props;
    return (
      <div>
        <div>Error : {error}</div>
        <button onClick={() => fetchTodos(filter)}>Retry</button>
      </div>
    );
  }
}

export default Error;
