import C from '../constants/constants';

export function addCard(columnId, name) {
  return {
    type: C.ADD_CARD,
    columnId,
    name
  }
}

export function removeCard(id) {
  return {
    type: C.REMOVE_CARD,
    id
  }
}

export function editCardName(id, name) {
  return {
    type: C.EDIT_CARD_NAME,
    id,
    name
  }
}

export function editCardDescription(id, description) {
  return {
    type: C.EDIT_CARD_DESCRIPTION,
    id,
    description
  }
}