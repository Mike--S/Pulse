import { createReducer } from 'redux-create-reducer';
import * as types from './../actions/actionTypes';

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
      data: data.payload.diary,
      isFetching: false
    };
  },
  [types.POST_DIARY_DATA](state) {
    return {
      isPosting: true
    };
  },
  [types.POST_DIARY_DATA_SUCCESS](state, data) {
    return {
      isPosting: false
    };
  }
});
