import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {isLoggedIn, logout} from '../actions/auth';

import Main from '../containers/Main';
import AnotherPage from '../containers/AnotherPage';
import NotFoundPage from '../containers/NotFoundPage';
import SignIn from '../containers/Auth/SignIn';
import Registration from '../containers/Auth/Registration';
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

const onLogout = (nextState, replace) => {
  logout();
  return replace(null, '/signIn');
};

export default (
  <Route path="/" component={Main}>
    <IndexRoute onEnter={onIndex}/>
    <Route path="/signIn" component={SignIn}/>
    <Route path="/Registration" component={Registration}/>
    <Route path="/diary" component={Diary} onEnter={requireAuth}/>
    <Route path="/another" component={AnotherPage} />
    <Route path="/logout" onEnter={onLogout} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
