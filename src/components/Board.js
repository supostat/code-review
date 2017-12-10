import React from 'react';

import { connect } from 'react-redux';

class Board extends React.Component {

  render() {
    return (
      <div className="board">
        <h1>{!(this.props.boardState.length === 0) ? this.props.boardState[0].name : null}</h1>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  boardState: store.boardState
})

export default connect(
  mapStateToProps
)(Board);