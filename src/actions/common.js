import { CALL_API } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import _ from 'lodash';

export function fetch(method, endpoint, requestType, successType, failureType, schema) {
  return {
    [CALL_API]: {
      endpoint: endpoint,
      method: method,
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

export function post(method, endpoint, requestType, successType, failureType, postData) {
  return {
    [CALL_API]: {
      endpoint: endpoint,
      method: method,
      body: JSON.stringify(postData),
      headers: {
        "content-type": "application/json"
      },
      types: [
        {
          type: requestType,
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
