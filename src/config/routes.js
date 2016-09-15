import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {isLoggedIn} from '../actions/auth';

import App from '../containers/App';
import AnotherPage from '../containers/AnotherPage';
import NotFoundPage from '../containers/NotFoundPage';
import SignIn from '../containers/SignIn/SignIn';
import Diary from '../containers/Diary/Diary';

const requireAuth = (nextState, replace) => {
  if(!isLoggedIn()) {
    return replace(null, '/signIn');
  }
};

const onIndex = (nextState, replace) => {
  if(!isLoggedIn()) {
    return replace(null, '/signIn');
  }
  else {
    return replace(null, '/diary');
  }
};

export default (
  <Route path="/" component={App}>
    <IndexRoute onEnter={onIndex}/>
    <Route path="/signIn" component={SignIn}/>
    <Route path="/diary" component={Diary} onEnter={requireAuth}/>
    <Route path="/another" component={AnotherPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
