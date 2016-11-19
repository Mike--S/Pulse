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
      type: data.payload.role,
      fio: data.payload.first_name + ' ' + data.payload.last_name,
      doctors: data.payload.doctors,
      patients: data.payload.patients,
      devices: data.payload.devices,
      isFetching: false,
      success: true,
      sessionToken: data.payload.session_token
    };
  },
  [types.POST_LOGIN_DATA_FAILURE](state, data) {
    return {
      isFetching: false,
      errorMessage: _.get(data, 'payload.response.error.message', 'ошибка')
    }
  },
  [types.FETCH_USER_DATA](state) {
    return {
      isFetching: true
    };
  },
  [types.FETCH_USER_DATA_SUCCESS](state, data) {
    if (data.payload) {
      return {
        type: data.payload.role,
        fio: data.payload.first_name + ' ' + data.payload.last_name,
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
