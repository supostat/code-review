import C from '../constants/constants';

const initialState = [];

export default function card(state = initialState, action) {
  let newState;
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
      newState = state.filter((e, i) => {
        return !(e.id === action.id);
      })
      return newState;

    case C.EDIT_CARD_NAME:
      newState = state.map((e, i) => {
        if(e.id === action.id){
          e.name = action.name;
          return e;
        }else{
          return e;
        }
      })
      return newState;

    case C.EDIT_CARD_DESCRIPTION:
      newState = state.map((e, i) => {
        if(e.description === action.description){
          e.description = action.description;
          return e;
        }else{
          return e;
        }
      })
      return newState;

    default:
      return state
  }
}