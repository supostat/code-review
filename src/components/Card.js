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
      cardData: getData('card')
    }
    this.closeCardDetails = this.closeCardDetails.bind(this);
    this.openCardDetails = this.openCardDetails.bind(this);
    this.renderCardDetails = this.renderCardDetails.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  closeCardDetails() {
    this.setState({isOpen: false});
  }

  openCardDetails(event) {
    if(!((event.target).getAttribute('class') === "card-delete-button")){
      this.setState({isOpen: true});
    }
  }

  renderCardDetails() {
      return (
        <div className="popup-shim">
          <div className="cardDetails">
            <div onClick={this.closeCardDetails} className="exit-button"></div>
            <h1>{this.props.cardName}</h1>
            <h2>In column {this.props.columnName}</h2>
            <p>Description TODO</p>
            <CommentBlock cardId={this.props.cardId} cardName={this.props.cardName}/>
          </div>
        </div>
      );
  }

  removeCard(cardId) {
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

  renderCard(){
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

  render() {
    return this.renderCard();
  }
}

export default Card;