import { createReducer } from 'redux-create-reducer';
import * as types from './../actions/actionTypes';

const initialState = {
};

export default createReducer(initialState, {
  [types.POST_LOGIN_DATA](state) {
    return {
      isFetching: true
    };
  },
  [types.POST_LOGIN_DATA_SUCCESS](state, data) {
    return {
      type: data.payload.type,
      fio: data.payload.fio,
      doctors: data.payload.doctors,
      patients: data.payload.patients,
      devices: data.payload.devices,
      isFetching: false
    };
  },
  [types.FETCH_USER_DATA](state) {
    return {
      isFetching: true
    };
  },
  [types.FETCH_USER_DATA_SUCCESS](state, data) {
    if (data.payload) {
      return {
        type: data.payload.type,
        fio: data.payload.fio,
        doctors: data.payload.doctors,
        patients: data.payload.patients,
        devices: data.payload.devices,
        isFetching: false
      };
    }
    else {
      return {
        isFetching: false
      }
    }
  },
  [types.FETCH_USER_DATA_FAILURE](state, data) {
    return {
      isFetching: false
    }
  }
});
