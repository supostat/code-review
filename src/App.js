import React from 'react';
import Board from './components/Board';
import Column from './components/Column';

import { connect } from 'react-redux';
import addUser from './actions/user';
import { addBoard } from './actions/board';
import { addColumn } from './actions/column';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      buttonIsActive: false
    }
  }

  handleChangeEvent = (e) => {
    (e.target.value) ? this.setState({buttonIsActive: true}) : this.setState({buttonIsActive: false});
    this.setState({username: e.target.value});
  }

  add = (username) => {
    this.props.dispatch(addUser(username));
    this.props.dispatch(addBoard());
    this.props.dispatch(addColumn());
  }

  renderColumns(columnData) {
    return columnData.map((column, index) => {
      return (<Column columnName={column.name} key={index} columnId={column.id} index={index}/>);
    })
  }

  requestUsername = () => {
    const {columnData, userData} = this.props;
    if (userData.length !== 0) {
      return (
        <div className="container-fluid">
          <div className="first-screen col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <Board title="Board title" />
          </div>
          <div className="second-screen col-xs-9 col-sm-9 col-md-9 col-lg-9">
            {this.renderColumns(columnData)}
          </div>
        </div>
      );
    } else {
      return (
        <div className="popup-shim">
          <form className="name-form">
            <p>Please type your username:</p> <input className="input-name-field" type="text" onChange={this.handleChangeEvent} />
            <br/>
            <button
              onClick={() => this.add(this.state.username)}
              disabled={!this.state.buttonIsActive}
              className="btn btn-info name-submit-button"
            >Save</button>
          </form>
        </div>
        );
    }
  }

  render() {
    return this.requestUsername();
  }
}

const mapStateToProps = (store) => ({
  userData: store.userState,
  columnData: store.columnState
})

export default connect(
  mapStateToProps
)(App);