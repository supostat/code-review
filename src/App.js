import React from 'react';
import Board from './components/Board';
import Column from './components/Column';

  const getUsername = () => 
    localStorage.getItem('username');

  const getData = (dataName) =>
    JSON.parse(localStorage.getItem(dataName));

  const setData = function (name, value) {
    (typeof value === "object") ?
      localStorage.setItem(name, JSON.stringify(value)) :
      localStorage.setItem(name, value);
  };

  const setDefaultDashboardAndColumn = function () {
    localStorage.setItem('board', JSON.stringify([{id: 1, name: 'Welcome Board'}]));
    localStorage.setItem('column', JSON.stringify([
      {id: 1, boardId: 1, name: 'TODO', editMode: false},
      {id: 2, boardId: 1, name: 'In Progress', editMode: false},
      {id: 3, boardId: 1, name: 'Testing', editMode: false},
      {id: 4, boardId: 1, name: 'Done', editMode: false}
    ]));
  };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: getUsername(),
      columnData: getData('column'),
      cardData: getData('card'),
      columnTitleIsEdit: false,
      buttonIsActive: false
    }
  }

  handleChangeEvent = (e) => {
    (e.target.value) ? this.setState({buttonIsActive: true}) : this.setState({buttonIsActive: false});
    this.setState({username: e.target.value});
  }

  add = () => {
    setData('username', this.state.username);
    setDefaultDashboardAndColumn();
    this.setState({username: getUsername(), columnData: getData('column')});
  }

  updateColumnTitle = (callBack, e) => {
    callBack(e);
    this.setState({columnData: getData('column')});
  }

  requestUsername = () => {
    var columnData = this.state.columnData;
    if (columnData) {
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
            <input type="submit" value="Save" onClick={this.add} disabled={!this.state.buttonIsActive} className="btn btn-info name-submit-button" />
            </form>
          </div>
        );
    }
  }

  render() {
    return this.requestUsername();
  }
}

export default App;