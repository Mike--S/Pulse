import * as types from '../actionTypes';
import common from '../../config/common.json';
import * as callApi from '../common';
import { Schema, arrayOf } from 'normalizr';

const API_ROOT = common.apiUrl;

const controlBlocksSchema = new Schema('controlBlocks', {idAttribute: () => '0'});
const controlBlockSchema = new Schema('controlBlock');
const paramsSchema = new Schema('params');
const timesSchems = new Schema('times');
const healthBlockSchema = new Schema('healthBlock', {idAttribute: () => '0'});

controlBlocksSchema.define({
  controlBlocks: arrayOf(controlBlockSchema),
  healthBlock: healthBlockSchema
});

controlBlockSchema.define({
  parameters: arrayOf(paramsSchema)
});

paramsSchema.define({
  time: arrayOf(timesSchems)
});

function diaryUpdate(name, value) {
  return {
    type: types.UPDATE_DIARY_DATA,
    name: name,
    value: value
  }
}
function healthBlockUpdate(text) {
  return {
    type: types.UPDATE_HEALTH_BLOCK,
    text: text
  }
}

export function loadDiary() {
  return (dispatch) => {
    return dispatch(callApi.fetch('GET', API_ROOT + 'diary', types.FETCH_DIARY_DATA, types.FETCH_DIARY_DATA_SUCCESS, types.FETCH_DIARY_DATA_FAILURE, controlBlocksSchema));
  }
}

export function postDiaryParams(postDiaryData) {
  return (dispatch) => {
    return dispatch(callApi.post('POST', API_ROOT + 'control', types.POST_DIARY_DATA, types.POST_DIARY_DATA_SUCCESS, types.POST_DIARY_DATA_FAILURE, postDiaryData));
  }
}

export function postHealthBlock(postHealthBlock) {
  return (dispatch) => {
    return dispatch(callApi.post('POST', API_ROOT + 'health', types.POST_DIARY_DATA, types.POST_DIARY_DATA_SUCCESS, types.POST_DIARY_DATA_FAILURE, postHealthBlock));
  }
}

export function updateDiary(name, value) {
  return (dispatch) => {
    dispatch(diaryUpdate(name, value))
  }
}

export function updateHealthBlock(text) {
  return (dispatch) => {
    dispatch(healthBlockUpdate(text))
  }
}


