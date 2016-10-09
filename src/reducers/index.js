import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import user from './user';
import diary from './diary';

const rootReducer = combineReducers({
  user,
  diary,
  routing
});

export default rootReducer;
