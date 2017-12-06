import React from 'react';
import Card from './Card';

  const getData = (dataName) =>
    JSON.parse(localStorage.getItem(dataName));

  const setData = function (name, value) {
    (typeof value === "object") ?
      localStorage.setItem(name, JSON.stringify(value)) :
      localStorage.setItem(name, value);
  };

class Column extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      columnData: getData('column'),
      cardData: getData('card'),
      isEditCard: false,
      isEditTitle: false,
      cardName: '',
      columnName: ''
    }
  }

  handleChangeEvent = (e) => {
    this.setState({cardName: e.target.value});
  }

  handleColumnTitle = (e) => {
    this.setState({columnName: e.target.value});
  }

  switchToEditColumnTitle = (name) => {
    this.setState({isEditTitle: true, columnName: name});
  }

  handleKeyPress = (event) => {
    if(event.keyCode === 27 || event.keyCode === 13){
      this.setColumnTitle();
    }
  }

  handleClickColumnTitle = (event) => {
      this.setColumnTitle();
  }

  setColumnTitle = () => {
    var columnName, arr, newArr;
    columnName = (this.state.columnName === '') ? "" : this.state.columnName;
    arr = getData('column');
      newArr = arr.map((e, i) => {
        if(this.props.index === i){
          e.name = columnName;
          return e;
        }else{
          return e;
        }
      });
      setData('column', newArr);
      this.setState({isEditTitle: false, columnData: getData('column')});
  }

  edit = () => {
    this.setState({isEditCard: true});
  }

  save = () => {
    var newArr, columnId, arr, id;
    columnId = this.props.columnId;
    arr = getData('card') || [];
    id = (arr.length > 0) ? (arr[arr.length - 1].id + 1) : 1;
      if(this.state.cardName.trim() !== ""){
        newArr = arr.concat({id: id, columnId: columnId, name: this.state.cardName.trim(), description: ''});
        setData('card', newArr);
        this.setState({cardData: getData('card'), isEditCard: false, cardName: ''});
      }else{
        this.setState({isEditCard: false});
      }
    }

  editColumnTitle = (index) => {
    var arr = getData('column');
    arr[index].editMode = true;
    this.setState({columnData: getData('column')});
  }

  renderEdit = () => {
    return (
      <div className="add-card-contaner">
        <textarea
          className="add-card-area"
          onChange={this.handleChangeEvent}
          value={this.state.cardName}>
        </textarea>
        <button
          className="btn btn-success add-card"
          onClick={this.save}>Add Card</button>
      </div>
    );
  }

  renderRegular = () => {
    return (
      <a href="#" onClick={this.edit} className="btn btn-success add-card">Add Card</a>
    );
  }

  updateCard = (cardFn, cardId) => {
    cardFn(cardId);
    this.setState({cardData: getData('card')});
  }

  setSelectionInEnd = (e) => {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  }

  renderTitle = () => {
    if(!this.state.isEditTitle){
      return (
        <h1 className="column-title" onClick={() => {this.switchToEditColumnTitle(this.props.columnName)}}>{this.props.columnName}</h1>
      );
    }else{
      return(
        <input type="text"
              ref="inputColumnTitle"
              className="input-column-title input"
              autoFocus="true"
              value={this.state.columnName}
              onKeyDown={(e) => {this.props.updateColumnTitle(this.handleKeyPress, e)}}
              onFocus={this.setSelectionInEnd.bind(this)}
              onBlur={(e) =>{this.props.updateColumnTitle(this.handleClickColumnTitle, e)}}
              onChange={this.handleColumnTitle}/>
      );
    }
  }

  render() {
    return (
      <div className="column">
        <div className="column-title-container">
        {
          this.renderTitle()
        }
        </div>
        <div className="card-container">
        {
          (!this.state.cardData) ? null : this.state.cardData.map((e, i) => {
            return (e.columnId === this.props.columnId) ?
            <Card
              cardName={e.name}
              index={i} key={i}
              cardId={e.id}
              cardDescription={e.description}
              columnName={this.props.columnName}
              updateCard={this.updateCard}/> :
            null;
          })
        }
        </div>
        <div>
          {(this.state.isEditCard) ? this.renderEdit() : this.renderRegular()}
        </div>
      </div>
    );
  }
}

export default Column;