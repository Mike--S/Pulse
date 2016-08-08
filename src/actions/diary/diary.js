import * as types from '../actionTypes';
import common from '../../config/common.json';
import * as callApi from '../common';
import { Schema, arrayOf } from 'normalizr';

const API_ROOT = common.apiUrl;

const controlBlocksSchema = new Schema('controlBlocks', {idAttribute: () => '0'});
const controlBlockSchema = new Schema('controlBlock');
const selfControlBlockSchema = new Schema('selfControlBlock', {idAttribute: () => '0'});
const paramsSchema = new Schema('params');
const selfParamsSchema = new Schema('selfParams');
const timesSchems = new Schema('times');
const selfTimesSchems = new Schema('selfTimes');
const healthBlockSchema = new Schema('healthBlock', {idAttribute: () => '0'});
const recommendationsBlockSchema = new Schema('recommendations', {idAttribute: () => '0'});

controlBlocksSchema.define({
  controlBlocks: arrayOf(controlBlockSchema),
  healthBlock: healthBlockSchema,
  recommendations: recommendationsBlockSchema,
  selfControlBlock: selfControlBlockSchema
});

controlBlockSchema.define({
  parameters: arrayOf(paramsSchema)
});

selfControlBlockSchema.define({
  parameters: arrayOf(selfParamsSchema)
});

paramsSchema.define({
  time: arrayOf(timesSchems)
});

selfParamsSchema.define({
  time: arrayOf(selfTimesSchems)
});

function diaryUpdate(name, value) {
  return {
    type: types.UPDATE_DIARY_DATA,
    name: name,
    value: value
  }
}

function diarySelfUpdate(name, value) {
  return {
    type: types.UPDATE_DIARY_DATA_SELF,
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

function dateUpdate(date) {
  return {
    type: types.UPDATE_DATE,
    date: date
  }
}

export function loadDiary(getParams) {
  var memo = '?';
  if (typeof getParams == 'object') {
    for(let param in getParams) {
      let value = getParams[param];
      memo += param + '=' + value + '&';
    }
  }
  return (dispatch) => {
    return dispatch(callApi.fetch('GET', API_ROOT + 'diary' + memo, types.FETCH_DIARY_DATA, types.FETCH_DIARY_DATA_SUCCESS, types.FETCH_DIARY_DATA_FAILURE, controlBlocksSchema));
  }
}

export function postDiaryParams(postDiaryData) {
  return (dispatch) => {
    return dispatch(callApi.post('POST', API_ROOT + 'control', types.POST_DIARY_DATA, types.POST_DIARY_DATA_SUCCESS, types.POST_DIARY_DATA_FAILURE, postDiaryData));
  }
}

export function postDiaryParamsSelf(postDiaryData) {
  return (dispatch) => {
    return dispatch(callApi.post('POST', API_ROOT + 'selfControl', types.POST_DIARY_DATA, types.POST_DIARY_DATA_SUCCESS, types.POST_DIARY_DATA_FAILURE, postDiaryData));
  }
}

export function postHealthBlock(postHealthBlock) {
  return (dispatch) => {
    return dispatch(callApi.post('POST', API_ROOT + 'health', types.POST_DIARY_DATA, types.POST_DIARY_DATA_SUCCESS, types.POST_DIARY_DATA_FAILURE, postHealthBlock));
  }
}

export function updateDiary(name, value, self) {
  return (dispatch) => {
    dispatch(self ? diarySelfUpdate(name, value) : diaryUpdate(name, value))
  }
}

export function updateHealthBlock(text) {
  return (dispatch) => {
    dispatch(healthBlockUpdate(text))
  }
}

export function updateDate(date) {
  return (dispatch) => {
    dispatch(dateUpdate(date))
  }
}


