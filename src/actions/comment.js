import C from '../constants/constants';

export function addComment(cardId, name) {
  return {
    type: C.ADD_COMMENT,
    cardId,
    name
  }
}

export function removeComment(id) {
  return {
    type: C.REMOVE_COMMENT,
    id
  }
}

export function editComment(id, name) {
  return {
    type: C.EDIT_COMMENT,
    id,
    name
  }
}

export function setCommentEditMode(id) {
  return {
    type: C.SET_COMMENT_EDIT_MODE,
    id
  }
}

export function removeCommentByCardId(cardId) {
  return {
    type: C.REMOVE_COMMENT_BY_CARD_ID,
    cardId
  }
}

export function resetCommentEditMode() {
  return {
    type: C.RESET_COMMENT_EDIT_MODE
  }
}