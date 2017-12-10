import React from 'react';
import Card from './Card';

import { connect } from 'react-redux';
import { editTitle } from '../actions/column';
import { addCard } from '../actions/card';

class Column extends React.Component{
  constructor(props){
    super(props);
    this.state = {
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
    var columnName = (this.state.columnName === '') ? "" : this.state.columnName;
    this.props.dispatch(editTitle(this.props.columnId, columnName));
    this.setState({isEditTitle: false});
  }

  edit = () => {
    this.setState({isEditCard: true});
  }

  save = () => {
    var columnId = this.props.columnId;
      if(this.state.cardName.trim() !== ""){
        this.props.dispatch(addCard(columnId, this.state.cardName.trim()));
        this.setState({isEditCard: false, cardName: ''});
      }else{
        this.setState({isEditCard: false});
      }
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
              className="input-column-title input"
              autoFocus="true"
              value={this.state.columnName}
              onKeyDown={(e) => { this.handleKeyPress(e)}}
              onFocus={this.setSelectionInEnd.bind(this)}
              onBlur={(e) =>{this.handleClickColumnTitle(e)}}
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
          (!this.props.cardState) ? null : this.props.cardState.map((e, i) => {
            return (e.columnId === this.props.columnId) ?
            <Card
              cardName={e.name}
              index={i} key={i}
              cardId={e.id}
              cardDescription={e.description}
              columnName={this.props.columnName} /> :
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

const mapStateToProps = (store) => ({
  columnState: store.columnState,
  cardState: store.cardState
})

export default connect(
  mapStateToProps
  )(Column);