import { createReducer } from 'redux-create-reducer';
import * as types from './../actions/actionTypes';

const initialState = {
  diary: {

  }
};

export default createReducer(initialState, {
  [types.FETCH_DIARY_DATA](state) {
    return Object.assign({}, state, {
      diary: {
        isFetching: true
      }
    });
  },
  [types.FETCH_DIARY_DATA_SUCCESS](state, data) {
    return Object.assign({}, state, {
      diary: {
        data: data.payload.diary,
        isFetching: false
      }
    });
  },
  [types.POST_DIARY_DATA](state) {
    return Object.assign({}, state, {
      diary: {
        ...state.diary,
        isPosting: true
      }
    });
  },
  [types.POST_DIARY_DATA_SUCCESS](state, data) {
    return Object.assign({}, state, {
      diary: {
        ...state.diary,
        isPosting: false
      }
    });
  }
});
