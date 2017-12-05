import React from 'react'

class Comment extends React.Component {
  render() {
      return (
        <li key={this.props.index} className="comment-item">
          <h1>{this.props.username}</h1>
          <p>{this.props.description}</p>
          <div className="comment-action">
            <a href="#" onClick={this.props.editFn}>Изменить</a>
            <a href="#" onClick={this.props.removeFn}>Удалить</a>
          </div>
        </li>
      );
  }
}

export default Comment;