import * as types from './actionTypes';
import common from '../config/common.json';
import * as callApi from './common';

const API_ROOT = common.apiUrl;

export function isLoggedIn() {
  return localStorage.getItem('userName') || "";
}

export function logout() {
  localStorage.removeItem('userName');
}

export function postLoginData(loginData) {
  return (dispatch) => {
    return dispatch(callApi.post('POST', API_ROOT + 'login', types.POST_LOGIN_DATA, types.POST_LOGIN_DATA_SUCCESS, types.POST_LOGIN_DATA_FAILURE, loginData));
  }
}

