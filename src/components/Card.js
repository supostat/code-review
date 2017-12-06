import React from 'react';
import CommentBlock from './CommentBlock';

  const getData = (dataName) =>
    JSON.parse(localStorage.getItem(dataName));

  const setData = function (name, value) {
    (typeof value === "object") ?
      localStorage.setItem(name, JSON.stringify(value)) :
      localStorage.setItem(name, value);
  };

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isEditCardTitle: false,
      isEditCardDescription: false,
      cardData: getData('card'),
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
        return this.props.updateCard(this.setCardDescription, this.props.cardId);
    }
    if(!inputCardTitle && e.keyCode === 27){
      this.setState({isOpen: false});
    }else if(inputCardTitle && (e.keyCode === 27 || e.keyCode === 13)){
      this.props.updateCard(this.setCardTitle, this.props.cardId);
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

  setCardTitle = () => {
    var arr, newArr, cardId;
    cardId = this.props.cardId;
    arr = getData('card');
    newArr = arr.map((e, i) => {
      if(e.id === cardId){
        e.name = this.state.cardName.trim();
        return e;
      }else{
        return e;
      }
    });
    setData('card', newArr);
    this.setState({isEditCardTitle: false});
  }

  setCardDescription = () => {
    var arr, newArr, cardId;
    cardId = this.props.cardId;
    arr = getData('card');
    newArr = arr.map((e, i) => {
      if(e.id === cardId){
        e.description = this.state.description.trim();
        return e;
      }else{
        return e;
      }
    });
    setData('card', newArr);
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
          onBlur={(e) => {this.props.updateCard(this.setCardTitle, this.props.cardId)}}
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
            onClick={() => {return this.props.updateCard(this.setCardDescription, this.props.cardId)}}>Save</button>
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
          <p className="card-regular-description">{this.props.cardDescription}</p>
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
    var updateCard = this.props.updateCard;
    return (
      <div>
        <div className='card' onClick={(e) => {this.openCardDetails(e)}}>
          <div 
            className='card-delete-button'
            onClick={() => {return updateCard(this.removeCard, this.props.cardId)}}>
          </div>
          <h1>{this.props.cardName}</h1>
        </div>
        {(!this.state.isOpen) ? null : this.renderCardDetails()}
      </div>
    );
  }

  removeCard = (cardId) => {
    var cardArr, commentArr, newCardArr, newCommentArr;
        cardArr = getData('card');
        newCardArr = cardArr.filter((e, i) => {return (!(e.id === cardId))});
        cardId = this.props.cardId;
        commentArr = getData('comment') || [];
    setData('card', newCardArr);
    if(commentArr.length !== 0) {
      newCommentArr = commentArr.filter((e, i) => {return (!(e.cardId === cardId))});
      setData('comment', newCommentArr);
    }
  }

  render() {
    return this.renderCard();
  }
}

export default Card;