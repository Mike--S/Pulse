import { CALL_API } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import _ from 'lodash';
import config from '../config/common.json';

export function fetch(method, endpoint, requestType, successType, failureType, schema, sessionToken) {
  var headers = {
    "X-DreamFactory-API-Key": config.apiKey
  };
  if(sessionToken) {
    headers["X-DreamFactory-Session-Token"] = sessionToken;
  }

  return {
    [CALL_API]: {
      endpoint: endpoint,
      method: method,
      headers,
      types: [
        {
          type: requestType
        },
        {
          type: successType,
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type');
            if (contentType && ~contentType.indexOf('json')) {
              if(schema) {
                return res.json().then((json) => {
                  if(json && !_.isEmpty(json)) {
                    return normalize(json, schema);
                  }
                  else {
                    return {};
                  }
                })
              }
              else {
                return res.json();
              }
            }
          }
        },
        {
          type: failureType
        }
      ]
    }
  }
}

export function post(method, endpoint, requestType, successType, failureType, postData, sessionToken) {
  var headers = {
    "content-type": "application/json; charset=utf-8",
    "X-DreamFactory-API-Key": config.apiKey
  };
  if(sessionToken) {
    headers["X-DreamFactory-Session-Token"] = sessionToken
  }
  return {
    [CALL_API]: {
      endpoint: endpoint,
      method: method,
      body: JSON.stringify(postData),
      headers,
      types: [
        {
          type: requestType
        },
        {
          type: successType,
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type');
            if (contentType && ~contentType.indexOf('json')) {
              return res.json();
            }
          }
        },
        {
          type: failureType
        }
      ]
    }
  }
}
