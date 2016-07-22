import * as types from '../actionTypes';
import common from '../../config/common.json';
import * as callApi from '../common';

const API_ROOT = common.apiUrl;

export function loadPatient() {
  return (dispatch) => {
    return dispatch(callApi.fetch('GET', API_ROOT + 'login', types.FETCH_PATIENT_DATA, types.FETCH_PATIENT_DATA_SUCCESS, types.FETCH_PATIENT_DATA_FAILURE));
  }
}


