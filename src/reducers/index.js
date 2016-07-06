import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import counter from './counter';
import patient from './patient';

const rootReducer = combineReducers({
  counter,
  patient,
  routing
});

export default rootReducer;
