import React from 'react';
import Comment from './Comment';

import { connect } from 'react-redux';
import { addComment } from '../actions/comment';

class CommentBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      commentName: '',
      buttonIsActive: false,
    }
  }

  handleChangeEvent = (e) => {
    (e.target.value) ? this.setState({buttonIsActive: true}) : this.setState({buttonIsActive: false});
    this.setState({commentName: e.target.value});
  }

  save = (cardId, commentName) => {
    this.props.dispatch(addComment(cardId, commentName));
    this.setState({commentName: '', buttonIsActive: !this.state.buttonIsActive});
  }

  render() {
    const cardId = this.props.cardId;
    return (
      <div className="comment">
        <h1>Add Comment</h1>
        <textarea
          placeholder="Write your comment..."
          value={this.state.commentName}
          onChange={this.handleChangeEvent}
          className="textarea add-comment">
        </textarea>
        <br/>
        <button
          disabled={!this.state.buttonIsActive}
          onClick={() => {this.save(cardId, this.state.commentName)}}
          className="btn btn-success add-comment-btn">Save</button>
        <ul className="comment-list">
          {this.props.commentState.map((e, i) => {
            if(e.cardId === cardId) {
              return <Comment key={i}
                        editMode={e.editMode}
                        description={e.name}
                        commentId={e.id}/>
            }else{
              return null
            }
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  commentState: store.commentState
})

export default connect(
  mapStateToProps
  )(CommentBlock);