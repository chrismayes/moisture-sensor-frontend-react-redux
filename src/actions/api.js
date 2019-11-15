// import {connection} from "../apiConnection";
import connection from '../components/containers/apiConnection';


//action handlers for api calls (must be located in this file, not imported)

export function actionWaterLevel(json) {
  return {
    type: 'WATER_LEVEL',
    data: json
  };
}

// THUNKS
export function apiCall(
  auth, // Required, Authentication data for the API
  method, // Required, Request method
  endpoint, // Required, REST endpoint
  action, // Required, Action to handle the API call's return data
  body, // Optional, POST data
  reset, // Optional, Action to be run before the api call is made in order to reset the store data prior to population
  loadingFlag, // Optional, The name of the Loading flag
  next, // Optional, Function to run after the apiCall is complete and the data is handled
  nextParams, // Optional, The param name(s) to be passed into the next api call when apiCalls are chained together
  callType // Optional, if the api call is a different type from a standard api call (eg, download - blob)
) {
  return dispatch => {
    if (loadingFlag) {
      dispatch(actionSetLoadingFlag(loadingFlag, true));
    }
    connection(
      auth,
      method,
      endpoint,
      data => dispatch(eval(action + '(data)')),
      body,
      (reset || '').split(/\s*,\s*/).map((r) => () => r != '' ? dispatch(eval(`${r  }()`)) : undefined),
      loadingFlag
        ? () => dispatch(actionSetLoadingFlag(loadingFlag, false))
        : undefined,
      next,
      nextParams,
      callType
    );
  };
}
