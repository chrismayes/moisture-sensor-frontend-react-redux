import FileSaver from 'file-saver';

const connection = (auth, endpoint, body) => {
  // Build request headers for API call
  const requestHeaders = new Headers();
  requestHeaders.append('Accept', 'application/vnd.api+json');
  const postRequestHeaders = requestHeaders;
  postRequestHeaders.append('Content-Type', 'application/json');
  const apiUrl = API_SETTINGS.url;

  // Configuration settings for the various request methods
  return {
    apiUrl,
    requestSetup: {
      get: {
        method: 'GET',
        mode: API_SETTINGS.api_mode,
        headers: requestHeaders,
      },
      post: {
        method: 'POST',
        mode: API_SETTINGS.api_mode,
        headers: postRequestHeaders,
        body: JSON.stringify(body),
      },
      put: {
        method: 'PUT',
        mode: API_SETTINGS.api_mode,
        headers: postRequestHeaders,
        body: JSON.stringify(body),
      },
    },
  };
};

/**
 * API calls made to remote data sources
 * @param {class} auth The 'auth' object (Okta-auth)
 * @param {string} method Request method
 * @param {string} endpoint REST endpoint path
 * @param {function} dispatch The action to be dispatched in this function's promise
 * @param {string} body Data object for post and put methods
 * @param {array} reset Action(s) to be run before the api call is made in order to reset the store data prior to population
 * @param {function} cancelLoadingFlag The name of the Loading flag to cancel
 * @param {function} next Function to run after the apiCall is complete and the return data is handled
 * @param {array} nextParams The param name(s) to be passed into the next api call when apiCalls are chained together
 * @param {string} callType The type of API call, eg. JSON, Text, Blob, etc
 * @returns {object} The result of the API call
 */
export default (auth, method, endpoint, dispatch, body, reset = [], cancelLoadingFlag, next, nextParams = [], callType) => {
  // Create the API call
  const apiCall = `${connection(auth, endpoint).apiUrl}${endpoint}`;
  // Run the reset action(s)
  reset.map(r => r());
  // Make the API call
  return fetch(apiCall, connection(auth, endpoint, body).requestSetup[method])
    .then(response => {
      // Handle downloads
      if (callType === 'download') {
        response.blob().then(blob => {
          if (!body.supressDownload) {
            FileSaver.saveAs(blob, body.fileName);
          } else {
            if (window.navigator.msSaveOrOpenBlob){
              window.navigator.msSaveOrOpenBlob (blob, "report.pdf");
            } else {
              window.open(URL.createObjectURL(blob)).print();
            }
          }
          if (cancelLoadingFlag) cancelLoadingFlag();
        });
      } else {
        // Handle API data
        response.json().then(json => {
          // Dispatch the returned JSON to the required ActionCreator
          if (json != null) {
            dispatch(json);
          }
          if (cancelLoadingFlag) cancelLoadingFlag();
          // If there is a next step - ie. a chained function call then...
          if (next !== undefined) {
            // Call the chained function and insert the
            // param values from the result of the previous call
            next(...nextParams.map(param => json[param]));
          }
        });
      }
    })
    .catch(error => {});
};
