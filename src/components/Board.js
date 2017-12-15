import React from 'react';

class Board extends React.Component {

  render() {
    return (
      <div className="board">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default Board;