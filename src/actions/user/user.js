import * as types from '../actionTypes';
import common from '../../config/common.json';
import * as callApi from '../common';

const API_ROOT = common.apiUrl;

export function loadUser(getParams) {
  var memo = '?';
  if (typeof getParams == 'object') {
    for (let param in getParams) {
      let value = getParams[param];
      memo += value ? param + '=' + value + '&' : '';
    }
  }
    return (dispatch) => {
    return dispatch(callApi.fetch('GET', API_ROOT + 'userData' + memo, types.FETCH_USER_DATA, types.FETCH_USER_DATA_SUCCESS, types.FETCH_USER_DATA_FAILURE));
  }
}
