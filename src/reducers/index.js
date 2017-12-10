import { combineReducers } from 'redux';

import user from './user';
import board from './board';
import column from './column';

const allReducers = combineReducers({
  userState: user,
  boardState: board,
  columnState: column
});

export default allReducers;