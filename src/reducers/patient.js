import { createReducer } from 'redux-create-reducer';
import * as types from './../actions/actionTypes';

const initialState = {
  patient: {
    doctors: {}
  }
};

export default createReducer(initialState, {
  [types.FETCH_PATIENT_DATA](state) {
    return Object.assign({}, state, {
      patient: {
        isFetching: true
      }
    });
  },
  [types.FETCH_PATIENT_DATA_SUCCESS](state, data) {
    return Object.assign({}, state, {
      patient: {
        fio: data.payload.fio,
        doctors: data.payload.doctors,
        devices: data.payload.devices,
        isFetching: false
      }
    });
  }
});
