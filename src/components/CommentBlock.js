import React from 'react';
import Comment from './Comment';

  const getUsername = () => 
    localStorage.getItem('username');

  const getData = (dataName) =>
    JSON.parse(localStorage.getItem(dataName));

  const setData = function (name, value) {
    (typeof value === "object") ?
      localStorage.setItem(name, JSON.stringify(value)) :
      localStorage.setItem(name, value);
  };

class CommentBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: getUsername(),
      commentData: getData('comment'),
      commentName: '',
      buttonIsActive: false,
      commentButton: true,
      commentTitle: ''
    }
  }

  handleChangeEvent = (e) => {
    (e.target.value) ? this.setState({buttonIsActive: true}) : this.setState({buttonIsActive: false});
    this.setState({commentName: e.target.value});
  }

  handleCommentTitle = (e) => {
    (e.target.value === '') ? this.setState({commentButton: true}) : this.setState({commentButton: false});
    this.setState({commentTitle: e.target.value});
  }

  edit = (index) => {
    var arr = this.state.commentData;
    arr[index].description = this.state.commentContent;
    setData('comment', arr);
    this.setState({commentData: getData('comment')});
  }

  save = () =>{
    var username, commentName, arr, newArr;
        username = this.state.username;
        commentName = this.state.commentName;
        arr = this.state.commentData || [];
        newArr = arr.concat({id: arr.length+1, cardId: this.props.cardId, author: username, description: commentName, editMode: false});
    setData('comment', newArr);
    this.setState({commentData: getData('comment'), commentName: ''});
  }

  remove = (index) => {
    var arr = this.state.commentData;
    arr.splice(index, 1);
    setData('comment', arr);
    this.setState({commentData: getData('comment')});
  }

  editComment = (index, content) => {
    var arr = this.state.commentData;
    arr[index].editMode = true;
    this.setState({commentData : arr, commentTitle: content});
  }

  saveComment = (index) => {
    var arr = this.state.commentData;
    arr[index].description = this.state.commentTitle;
    arr[index].editMode = false;
    setData('comment', arr);
    this.setState({commentData: getData('comment'), commentTitle: ''});
  }

  renderCommentList = () => {
    const {cardId} = this.props;
    const {commentData, username, commentTitle, commentButton} = this.state;
    var remove, edit, handleEvent, save;
    remove = this.remove;
    edit = this.editComment;
    handleEvent = this.handleCommentTitle;
    save = this.saveComment;

    return (!commentData) ? null : commentData.map(function(e, i) {
      if(cardId === e.cardId){
        if(!e.editMode){
          return <Comment
                  key={i}
                  username={username}
                  index={i} description={e.description} 
                  commentId={e.id}
                  removeFn={() => {return remove(i)}}
                  editFn={() => {return edit(i, e.description)}} />
        }else{
          return (<li key={i}>
                    <h1>{username}</h1>
                    <textarea
                      className="textarea edit-comment"
                      value={commentTitle}
                      onChange={handleEvent}>
                    </textarea>
                    <br/>
                    <button
                      className="btn btn-info btn-edit-comment"
                      disabled={commentButton}
                      onClick={() => {return save(i)}}>Save</button>
                  </li>);
        }
      }else{
        return null;
      }
    });
  }

  render() {
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
          onClick={this.save}
          className="btn btn-success add-comment-btn">Save</button>
        <ul className="comment-list">
          {this.renderCommentList()}
        </ul>
      </div>
    );
  }
}

export default CommentBlock;