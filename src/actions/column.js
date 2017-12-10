import C from '../constants/constants';

export function addColumn() {
  return {
    type: C.ADD_COLUMN
  };
}

export function editTitle(id, name){
  return {
    type: C.EDIT_COLUMN_TITLE,
    id,
    name
  };
}