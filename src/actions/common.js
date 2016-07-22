import { CALL_API } from 'redux-api-middleware';

export function fetch(method, endpoint, requestType, successType, failureType, requestFunc) {
  return {
    [CALL_API]: {
      endpoint: endpoint,
      method: method,
      types: [
        {
          type: requestType,
          payload: requestFunc
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
