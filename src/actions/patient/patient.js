import * as types from '../actionTypes';
import common from '../../config/common.json';
import * as callApi from '../common';

const API_ROOT = common.apiUrl;

export function loadPatient(getParams) {
  var memo = '?';
  if (typeof getParams == 'object') {
    for (let param in getParams) {
      let value = getParams[param];
      memo += param + '=' + value + '&';
    }
  }
    return (dispatch) => {
    return dispatch(callApi.fetch('GET', API_ROOT + 'userData' + memo, types.FETCH_PATIENT_DATA, types.FETCH_PATIENT_DATA_SUCCESS, types.FETCH_PATIENT_DATA_FAILURE));
  }
}
