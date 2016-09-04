import { createReducer } from 'redux-create-reducer';
import * as types from './../actions/actionTypes';
import _ from 'lodash';

const initialState = {
  data: {

  },
  date: new Date()
};

export default createReducer(initialState, {
  [types.FETCH_DIARY_DATA](state) {
    return {
      ...state,
      isFetching: true
    }
  },
  [types.FETCH_DIARY_DATA_SUCCESS](state, data) {
    return {
      ...state,
      data: data.payload.entities,
      isFetching: false
    };
  },
  [types.FETCH_PARAMETERS](state) {
    return {
      ...state,
      parameters: {
        isFetching: true
      }
    }
  },
  [types.FETCH_PARAMETERS_SUCCESS](state, data) {
    return {
      ...state,
      parameters: {
        isFetching: false,
        data: data.payload,
        names: data.payload.map(param => param.name)
      }
    };
  },
  [types.POST_DIARY_DATA](state) {
    return {
      ...state,
      isPosting: true
    };
  },
  [types.POST_DIARY_DATA_SUCCESS](state, data) {
    return {
      ...state,
      isPosting: false
    };
  },
  [types.UPDATE_DIARY_DATA](state, data) {
    state.data.times[data.name].value = data.value;

    return {
      ...state
    }
  },
  [types.UPDATE_DIARY_DATA_SELF](state, data) {
    state.data.selfTimes[data.name].value = data.value;

    return {
      ...state
    }
  },
  [types.UPDATE_HEALTH_BLOCK](state, data) {
    state.data.healthBlock[0].text = data.text;

    return {
      ...state
    }
  },
  [types.UPDATE_DATE](state, data) {
    return {
      ...state,
      date: data.date
    }
  }
});
