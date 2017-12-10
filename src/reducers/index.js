import { combineReducers } from 'redux';

import user from './user';
import board from './board';
import column from './column';
import card from './card';

const allReducers = combineReducers({
  userState: user,
  boardState: board,
  columnState: column,
  cardState: card,
  columnEditMode: []
});

export default allReducers;