import C from '../constants/constants';

const initialState = [];

function user(state = initialState, action){
  switch(action.type) {

    case C.ADD_USER:
      const newId = (state.length === 0) ? 1 : state[state.length - 1].id + 1;
      return [
        ...state,
        {
          id: newId,
          name: action.name
        }
      ]

    case C.EDIT_USER:
      return state

    case C.REMOVE_USER:
      return state

    default:
      return state
  }
}

export default user;