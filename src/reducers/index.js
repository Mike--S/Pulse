import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import patient from './patient';
import diary from './diary';

const rootReducer = combineReducers({
  patient,
  diary,
  routing
});

export default rootReducer;
