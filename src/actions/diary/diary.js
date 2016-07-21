import { CALL_API } from 'redux-api-middleware';
import * as types from '../actionTypes';
import common from '../../config/common.json';

const API_ROOT = common.apiUrl;

function fetchDiaryData() {
  return {
    [CALL_API]: {
      endpoint: API_ROOT + 'diary',
      method: 'GET',
      types: [
        {
          type: types.FETCH_DIARY_DATA
        },
        {
          type: types.FETCH_DIARY_DATA_SUCCESS,
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type');
            if (contentType && ~contentType.indexOf('json')) {
              return res.json();
            }
          }
        },
        {
          type: types.FETCH_DIARY_DATA_FAILURE
        }
      ]
    }
  }
}

export function loadDiary() {
  return (dispatch, getState) => {
    return dispatch(fetchDiaryData());
  }
}

function postDiaryData() {
  return {
    [CALL_API]: {
      endpoint: API_ROOT + 'diary',
      method: 'POST',
      types: [
        {
          type: types.POST_DIARY_DATA
        },
        {
          type: types.POST_DIARY_DATA_SUCCESS,
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type');
            if (contentType && ~contentType.indexOf('json')) {
              return res.json();
            }
          }
        },
        {
          type: types.POST_DIARY_DATA_FAILURE
        }
      ]
    }
  }
}

export function postDiaryParams() {
  return (dispatch) => {
    return dispatch(postDiaryData());
  }
}


