import { createReducer } from 'redux-create-reducer';
import * as types from './../actions/actionTypes';
import _ from 'lodash';

const initialState = {
};

export default createReducer(initialState, {
  [types.FETCH_DIARY_DATA](state) {
    return {
      isFetching: true
    }
  },
  [types.FETCH_DIARY_DATA_SUCCESS](state, data) {
    return {
      data: data.payload.entities,
      isFetching: false
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

    return {
      ...state
    };
  }
});