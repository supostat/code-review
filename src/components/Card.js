import React from 'react';
import CommentBlock from './CommentBlock';

import { connect } from 'react-redux';
import { removeCard, editCardName, editCardDescription } from '../actions/card';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isEditCardTitle: false,
      isEditCardDescription: false,
      cardName: '',
      description: ''
    }
  }

  closeCardDetails = () => {
    this.setState({isOpen: false});
  }

  closeCardDetailsByKey = (e) => {
    var inputCardTitle = document.getElementById('input-card-title');
    var inputCardDescription = document.getElementById('input-card-description');
    if(inputCardDescription === document.activeElement){
      if(e.keyCode === 27 || e.keyCode === 13)
        this.setCardDescription(this.props.cardId);
    }
    if(!inputCardTitle && !inputCardDescription && e.keyCode === 27){
      this.setState({isOpen: false});
    }else if(inputCardTitle && (e.keyCode === 27 || e.keyCode === 13)){
      this.setCardTitle(this.props.cardId);
    }
  }

  openCardDetails = (event) => {
    if(!((event.target).getAttribute('class') === "card-delete-button")){
      this.setState({isOpen: true});
    }
  }

  componentDidUpdate = () => {
    var inputCardDescription = document.getElementById('input-card-description');
    var inputCardTitle = document.getElementById('input-card-title');
    var focusContainer = document.getElementById('popupShim');
    if(inputCardDescription === document.activeElement){
      return inputCardDescription.focus();
    }
    if(!inputCardTitle && focusContainer){
      focusContainer.focus();
    }
  }

  setEditCardTitle = () => {
    this.setState({isEditCardTitle: true, cardName: this.props.cardName});
  }

  setEditCardDescription = () => {
    this.setState({isEditCardDescription: true, description: this.props.cardDescription});
  }

  setRegularCardDescription = () => {
    this.setState({isEditCardDescription: false});
  }

  setCardTitle = (cardId) => {
    this.props.dispatch(editCardName(cardId, this.state.cardName.trim()));
    this.setState({isEditCardTitle: false});
  }

  setCardDescription = (cardId) => {
    this.props.dispatch(editCardDescription(cardId, this.state.description.trim()));
    this.setState({isEditCardDescription: false});
  }

  handleChangeEvent = (e) => {
    this.setState({cardName: e.target.value});
  }

  handleChangeDescription = (e) => {
    this.setState({description: e.target.value});
  }

  setSelectionInEnd = (e) => {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  }

  removeCard = (cardId) => {
    this.props.dispatch(removeCard(cardId)); //TODO remove comment with cardId
  }

  renderCardTitle = () => {
    if(this.state.isEditCardTitle){
      return (
        <input type="text"
          id="input-card-title"
          className="input"
          autoFocus="true"
          value={this.state.cardName}
          onChange={this.handleChangeEvent}
          onFocus={this.setSelectionInEnd.bind(this)}
          onBlur={(e) => {this.setCardTitle(this.props.cardId)}}
          />
      );
    }else{
      return (
        <h1 id="normal-card-title" onClick={this.setEditCardTitle}>{this.props.cardName}</h1>
      );
    }
  }

  renderCardDescription = () => {
    if(this.state.isEditCardDescription){
      return (
        <div id="card-description-container">
          <textarea id="input-card-description" autoFocus="true" placeholder="Add more detail description..."
            onChange={this.handleChangeDescription}
            value={this.state.description}></textarea>
          <button className="btn btn-primary"
            onClick={() => {this.setCardDescription(this.props.cardId)}}>Save</button>
          <div className="exit-button"
               id="exit-button-description"
            onClick={this.setRegularCardDescription}></div>
        </div>
      );
    }else{
      return(
        <div className="card-regular-description-container">
          <a href="#"
            id="card-description-link"
            onClick={this.setEditCardDescription}>Change description...</a>
          <p className="card-regular-description" onClick={this.setEditCardDescription}>{this.props.cardDescription}</p>
        </div>
      );
    }
  }

  renderCardDetails = () => {
      return (
        <div id="popupShim" className="popup-shim"
          onKeyUp={(e) => {this.closeCardDetailsByKey(e)}}
          tabIndex="0">
          <div className="cardDetails"
            data-backdrop="static"
            data-keyboard="false">
              <div onClick={this.closeCardDetails}
                className="exit-button"></div>
              {this.renderCardTitle()}
              <h2>In column "{this.props.columnName}"</h2>
              {this.renderCardDescription()}
              <CommentBlock cardId={this.props.cardId} cardName={this.props.cardName}/>
          </div>
        </div>
      );
  }

  renderCard = () => {
    return (
      <div>
        <div className='card' onClick={(e) => {this.openCardDetails(e)}}>
          <div 
            className='card-delete-button'
            onClick={() => {this.removeCard(this.props.cardId)}}>
          </div>
          <h1>{this.props.cardName}</h1>
        </div>
        {(!this.state.isOpen) ? null : this.renderCardDetails()}
      </div>
    );
  }

  render() {
    return this.renderCard();
  }
}

const mapStateToProps = (store) => ({
  cardState: store.cardState
})

export default connect(
  mapStateToProps
  )(Card);