import { CALL_API } from 'redux-api-middleware';
import * as types from '../actionTypes';

//const API_ROOT = 'https://localhost:8080/api/';
const API_ROOT = 'https://rocky-dawn-46322.herokuapp.com/api/';

function fetchPatientData() {
  return {
    [CALL_API]: {
      endpoint: API_ROOT + 'patient',
      method: 'GET',
      types: [
        {
          type: types.FETCH_PATIENT_DATA
        },
        {
          type: types.FETCH_PATIENT_DATA_SUCCESS,
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type');
            if (contentType && ~contentType.indexOf('json')) {
              return res.json();
            }
          }
        },
        {
          type: types.FETCH_PATIENT_DATA_FAILURE
        }
      ]
    }
  }
}

export function loadPatient() {
  return (dispatch, getState) => {
    return dispatch(fetchPatientData());
  }
}


