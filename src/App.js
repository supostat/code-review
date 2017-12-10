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
      columnTitleIsEdit: false,
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

  requestUsername = () => {
    const columnData = this.props.columnState;
    const username = this.props.userState;
    if (username.length !== 0) {
      return (
        <div className="container-fluid">
          <div className="first-screen col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <Board />
          </div>
          <div className="second-screen col-xs-9 col-sm-9 col-md-9 col-lg-9">
            {columnData.map((e, i) => {
              return (<Column columnName={e.name} key={i} columnId={e.id} index={i} updateColumnTitle={this.updateColumnTitle}/>);
            })}
          </div>
        </div>
      );
    }else {
      return (
        <div className="popup-shim">
          <form className="name-form" onSubmit={(e) => {e.preventDefault()}}>
            <p>Please input your username:</p> <input className="input-name-field" type="text" onChange={this.handleChangeEvent} />
            <br/>
            <input type="submit" value="Save" onClick={(e) => {this.add(this.state.username)}} disabled={!this.state.buttonIsActive} className="btn btn-info name-submit-button" />
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
  userState: store.userState,
  columnState: store.columnState
})

export default connect(
  mapStateToProps
)(App);