import * as types from './actionTypes';
import common from '../config/common.json';
import * as callApi from './common';

const API_ROOT = common.apiUrl;

export function isLoggedIn() {
  return localStorage.getItem('session_token') || "";
}

export function logout() {
  localStorage.removeItem('session_token');
}

export function postLoginData(loginData) {
  return (dispatch) => {
    return dispatch(callApi.post('POST', API_ROOT + 'user/session', types.POST_LOGIN_DATA, types.POST_LOGIN_DATA_SUCCESS, types.POST_LOGIN_DATA_FAILURE, loginData));
  }
}

export function postRegistrationData(registrationData) {
  return (dispatch) => {
    return dispatch(callApi.post('POST', API_ROOT + 'user/register', types.POST_REGISTRATION_DATA, types.POST_REGISTRATION_DATA_SUCCESS, types.POST_REGISTRATION_DATA_FAILURE, registrationData));
  }
}

export function login(data) {
  return (dispatch) => {
    localStorage.setItem('session_token', data.sessionToken);
  };
}

export function dropRegistrationData() {
  return (dispatch) => {
    return dispatch({type: types.DROP_REGISTRATION_DATA});
  };
}

