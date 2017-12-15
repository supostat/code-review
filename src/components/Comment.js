import React from 'react'

import { connect } from 'react-redux';
import { setCommentEditMode, editComment, removeComment } from '../actions/comment';

class Comment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      commentEditButton: false,
      commentName: ''
    }
  }

  handleEvent = (e) => {
    (e.target.value === '') ? this.setState({commentEditButton: true}) : this.setState({commentEditButton: false});
    this.setState({commentName: e.target.value});
  }

  setSelectionInEnd = (e) => {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  }

  save = (id, content) => {
    this.props.dispatch(editComment(id, content.trim()));
    this.props.dispatch(setCommentEditMode(id));
  }

  setEditMode = (id, description) => {
    this.setState({commentName: description});
    this.props.dispatch(setCommentEditMode(id));
  }

  remove = (id) => {
    this.props.dispatch(removeComment(id));
  }

  render() {
    const {commentName, commentEditButton} = this.state;
    const username = this.props.userState[0].name;
    const {commentId, description} = this.props;

    if(!this.props.editMode){
      return (
              <li className="comment-item">
              <h1>{username}</h1>
              <p>{this.props.description}</p>
              <div className="comment-action">
                <a href="#" onClick={() => {this.setEditMode(commentId, description)}}>Edit</a>
                <a href="#" onClick={() => {this.remove(commentId)}}>Remove</a>
              </div>
              </li>
             );
    }else{
     return (
             <li>
             <h1>{username}</h1>
             <textarea
               autoFocus="true"
               onFocus={this.setSelectionInEnd.bind(this)}
               className="textarea edit-comment"
               value={commentName}
               onChange={this.handleEvent}>
             </textarea>
             <br/>
             <button
               className="btn btn-info btn-edit-comment"
               disabled={commentEditButton}
               onClick={() => this.save(commentId, commentName)}>Save</button>
             </li>
            );
    }
  }

}

const mapStateToProps = (store) => ({
  commentState: store.commentState,
  userState: store.userState
})

export default connect(
  mapStateToProps
)(Comment);