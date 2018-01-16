import { isFSA } from 'flux-standard-action';
import { createAction } from 'redux-actions';
export const SUCCESS = 'SUCCESS';
export const FAILED = 'FAILED';

export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
}

const PromiseMiddleware = store => next => action => {

  const { dispatch } = store


  if (!isFSA(action)) {
    return isPromise(action)
      ? action.then(dispatch)
      : next(action);
  }

  if (isPromise(action.payload)) {
    // dispatch original action.type but without payload (cause its original payload was a promise)
    dispatch(createAction(action.type)());
    return action.payload.then(
      result => dispatch({
        ...action,
        type: `${action.type}_${SUCCESS}`,
        payload: result
      }),
      error => {
        console.error('promise middleware: error: ', action, error)
        dispatch({
          ...action,
          type: `${action.type}_${FAILED}`,
          payload: error,
          error: true
        });
      }
    );
  } else {
    console.log("middleware action: ", action)
    return next(action);
  }
}

export default PromiseMiddleware;
