import * as types from '../actionTypes';
import common from '../../config/common.json';
import * as callApi from '../common';
import { Schema, arrayOf } from 'normalizr';

const API_ROOT = common.apiUrl;

const controlBlocksSchema = new Schema('controlBlocks', {idAttribute: () => '0'});
const controlBlockSchema = new Schema('controlBlock');
const paramsSchema = new Schema('params');
const timesSchems = new Schema('times', {idAttribute: 'type'});
const healthBlockSchema = new Schema('healthBlock', {idAttribute: () => '0'});

controlBlocksSchema.define({
  controlBlocks: arrayOf(controlBlockSchema),
  healthBlock: healthBlockSchema
});

controlBlockSchema.define({
  timeParameters: arrayOf(paramsSchema)
});

paramsSchema.define({
  time: arrayOf(timesSchems)
});

function diaryUpdate(diaryData) {
  return {
    type: types.UPDATE_DIARY_DATA,
    data: diaryData
  }
}

export function loadDiary() {
  return (dispatch) => {
    return dispatch(callApi.fetch('GET', API_ROOT + 'diary', types.FETCH_DIARY_DATA, types.FETCH_DIARY_DATA_SUCCESS, types.FETCH_DIARY_DATA_FAILURE, controlBlocksSchema));
  }
}

export function postDiaryParams(postDiaryData) {
  return (dispatch) => {
    return dispatch(callApi.post('POST', API_ROOT + 'diary', types.POST_DIARY_DATA, types.POST_DIARY_DATA_SUCCESS, types.POST_DIARY_DATA_FAILURE, postDiaryData));
  }
}

export function updateDiary(diaryData) {
  return (dispatch) => {
    dispatch(diaryUpdate(diaryData))
  }
}

