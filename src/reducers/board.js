import C from '../constants/constants';

const initialState = [];

export default function board(state = initialState, action) {
  switch(action.type) {
    case C.ADD_BOARD:
      return [
        {
          id: 1,
          name: 'Welcome Board'
        }
      ]

    default:
      return state
  }
}