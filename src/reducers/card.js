import C from '../constants/constants';

const initialState = [];

export default function card(state = initialState, action) {
  switch(action.type) {

    case C.ADD_CARD:
      const newId = (state.length === 0) ? 1 : state[state.length - 1].id + 1;
      return [
        ...state,
        {
           id: newId,
           columnId: action.columnId,
           name: action.name,
           description: ''
        }
      ]

    case C.REMOVE_CARD:
      const newState = state.filter((e, i) => {
        return !(e.id === action.id);
      })
      return newState;

    case C.EDIT_CARD_NAME:
      return state //TODO

    case C.EDIT_CARD_DESCRIPTION:
      return state //TODO

    default:
      return state
  }
}