import C from '../constants/constants';

const initialState = [];

export default function comment(state = initialState, action) {
  let newState;
  switch(action.type) {

    case C.ADD_COMMENT:
      const newId = (state.length === 0) ? 1 : state[state.length - 1].id + 1;
      return [
        ...state,
        {
          id: newId,
          cardId: action.cardId,
          name: action.name,
          editMode: false
        }
      ]

    case C.REMOVE_COMMENT:
      newState = state.filter((e, i) => {
        return !(e.id === action.id)
      })
      return newState;

    case C.EDIT_COMMENT:
      newState = state.map((e, i) => {
        if(e.id === action.id) {
          e.name = action.name;
        }
        return e;
      })
      return newState;

    case C.SET_COMMENT_EDIT_MODE:
      newState = state.map((e, i) => {
        if(e.id === action.id) {
          e.editMode = !e.editMode;
          return e;
        }else{ /// ??? UP
          return e;
        }
      })
      return newState;

    case C.RESET_COMMENT_EDIT_MODE:
      newState = state.map((e, i) => {
        if(e.editMode === true) {
          e.editMode = false;
          return e;
        }else{
          return e;
        }
      })
      return newState;

    case C.REMOVE_COMMENT_BY_CARD_ID:
      newState = state.filter((e, i) => {
        return e.cardId !== action.cardId;
      })
      return newState;

    default:
      return state
  }
}