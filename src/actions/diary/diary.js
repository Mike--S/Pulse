import * as types from '../actionTypes';
import common from '../../config/common.json';
import * as callApi from '../common';

const API_ROOT = common.apiUrl;

export function loadDiary() {
  return (dispatch) => {
    return dispatch(callApi.fetch('GET', API_ROOT + 'diary', types.FETCH_DIARY_DATA, types.FETCH_DIARY_DATA_SUCCESS, types.FETCH_DIARY_DATA_FAILURE));
  }
}


function postDiaryData(action, state) {
  console.log(state);
}

export function postDiaryParams() {
  return (dispatch) => {
    return dispatch(callApi.post('POST', API_ROOT + 'diary', types.POST_DIARY_DATA, types.POST_DIARY_DATA_SUCCESS, types.FETCH_DIARY_DATA_FAILURE, postDiaryData));
  }
}


