import React from 'react';

  const getUsername = () => 
    localStorage.getItem('username');

  const getData = (dataName) =>
    JSON.parse(localStorage.getItem(dataName));

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: getData('board'),
      username: getUsername()
    }
  }

  render() {
    return (
      <div className="board">
        <h1>{this.state.board[0].name}</h1>
      </div>
    );
  }
}

export default Board