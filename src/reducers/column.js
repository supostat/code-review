import C from '../constants/constants';

const initialState = [];

export default function column(state = initialState, action) {
  switch(action.type) {
    case C.ADD_COLUMN:
      return [
        {
          id: 1,
          boardId: 1,
          name: 'TODO'
        },
        {
          id: 2,
          boardId: 1,
          name: 'In Progress'
        },
        {
          id: 3,
          boardId: 1,
          name: 'Testing'
        },
        {
          id: 4,
          boardId: 1,
          name: 'Done'
        }
      ]

    case C.EDIT_COLUMN_TITLE:
      const newState = state.map((e, i) => {
        if(e.id === action.id){
          e.name = action.name;
          return e;
        }else{
          return e;
        }
      });
      return newState

    default:
      return state
  }
}