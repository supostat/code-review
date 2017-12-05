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
    this.handleChangeEvent  = this.handleChangeEvent.bind(this);
    this.handleColumnTitle  = this.handleColumnTitle.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.editColumnTitle = this.editColumnTitle.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderRegular = this.renderRegular.bind(this);
    this.updateCard = this.updateCard.bind(this);
  }

  handleChangeEvent(e) {
    this.setState({cardName: e.target.value});
  }

  handleColumnTitle(e) {
    this.setState({columnName: e.target.value});
  }

  edit() {
    this.setState({isEditCard: true});
  }

  save() {
    var newArr, columnId, arr, id;
    columnId = this.props.columnId;
    arr = getData('card') || [];
    id = (arr.length > 0) ? (arr[arr.length - 1].id + 1) : 1;
    console.log(arr);
      if(this.state.cardName.trim() !== ""){
        newArr = arr.concat({id: id, columnId: columnId, name: this.state.cardName.trim(), description: ''});
        setData('card', newArr);
        this.setState({cardData: getData('card'), isEditCard: false, cardName: ''});
      }else{
        this.setState({isEditCard: false});
      }
    }

  editColumnTitle(index) {
    var arr = this.state.columnData;
    arr[index].editMode = true;
    this.setState({columnData: getData('column')});
  }

  renderEdit() {
    return (
      <div className="add-card-contaner">
        <textarea
          className="add-card-area"
          onChange={this.handleChangeEvent}
          value={this.state.cardName}>
        </textarea>
        <button
          className="btn btn-success add-card"
          onClick={this.save}>Добавить карточку</button>
      </div>
    );
  }

  renderRegular() {
    return (
      <a href="#" onClick={this.edit} className="btn btn-success add-card">Добавить карточку</a>
    );
  }

  updateCard(cardFn, cardId){
    cardFn(cardId);
    this.setState({cardData: getData('card')});
  }

  render() {
    return (
      <div className="column">
        <h1>{this.props.columnName}</h1>
        {
          (!this.state.cardData) ? null : this.state.cardData.map((e, i) => {
            return (e.columnId === this.props.columnId) ?
            <Card
              cardName={e.name}
              index={i} key={i}
              cardId={e.id}
              columnName={this.props.columnName}
              updateCard={this.updateCard}/> :
            null;
          })
        }
        <div>
          {(this.state.isEditCard) ? this.renderEdit() : this.renderRegular()}
        </div>
      </div>
    );
  }
}

export default Column;