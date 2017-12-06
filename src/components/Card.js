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
      cardName: ''
    }
  }

  closeCardDetails = () => {
    this.setState({isOpen: false});
  }

  closeCardDetailsByKey = (e) => {
    var inputCardTitle = document.getElementById('input-card-title');
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
    var inputCardTitle = document.getElementById('input-card-title');
    var focusContainer = document.getElementById('popupShim');
    if(!inputCardTitle && focusContainer) focusContainer.focus();
  }

  setEditCardTitle = () => {
    this.setState({isEditCardTitle: true, cardName: this.props.cardName});
  }

  setCardTitle = () => {
    var arr, newArr, cardId;
    cardId = this.props.cardId;
    arr = getData('card');
    newArr = arr.map((e, i) => {
      if(e.id === cardId){
        e.name = this.state.cardName;
        return e;
      }else{
        return e;
      }
    });
    setData('card', newArr);
    this.setState({isEditCardTitle: false});
  }

  handleChangeEvent = (e) => {
    this.setState({cardName: e.target.value});
  }

  setSelectionInEnd = (e) => {
    console.log('Selection function is invoked');
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
        <div>TODO</div>
      );
    }else{
      return(
        <div>TODO</div>
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
              <h2>In column {this.props.columnName}</h2>
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