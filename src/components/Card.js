import React from 'react';
import CommentBlock from './CommentBlock';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.closeCardDetails = this.closeCardDetails.bind(this);
    this.openCardDetails = this.openCardDetails.bind(this);
    this.renderCardDetails = this.renderCardDetails.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  closeCardDetails(){
    this.setState({isOpen: false});
  }

  openCardDetails(){
    this.setState({isOpen: true});
  }

  renderCardDetails() {
    return (
      <div className="popup-shim">
        <div className="cardDetails">
          <div onClick={this.closeCardDetails} className="exit-button"></div>
          <h1>{this.props.cardName}</h1>
          <h2>В списке {this.props.columnName}</h2>
          <p>Описание TODO</p>
          <CommentBlock cardId={this.props.cardId} cardName={this.props.cardName}/>
        </div>
      </div>
    );
  }

  renderCard(){
    return (
      <div>
        <div className='card' onClick={this.openCardDetails}>
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