import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import patient from './patient';

const rootReducer = combineReducers({
  patient,
  routing
});

export default rootReducer;
