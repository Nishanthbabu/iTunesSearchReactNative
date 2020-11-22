/* eslint-disable no-undef */
import {
  GET_SEARCH_REQUEST_FAIL,
  GET_SEARCH_REQUEST_START,
  GET_SEARCH_REQUEST_SUCCESS,
} from './types';
import {searchURL} from '../../../app/constants/apiURL';

const getSearchRequestStart = () => {
  return {
    type: GET_SEARCH_REQUEST_START,
  };
};

const getSearchRequestSuccess = (response) => {
  return {
    type: GET_SEARCH_REQUEST_SUCCESS,
    payload: {
      searchResponse: response,
    },
  };
};

const getSearchRequestFail = (errorMessage) => {
  return {
    type: GET_SEARCH_REQUEST_FAIL,
    payload: {
      apiErrorMessage: errorMessage,
    },
  };
};

export const executeGetSearchRequest = (term, entity) => {
  console.log('ccccccc----term--',term);
  console.log('ccccccc----entity--',entity);

  return async (dispatch, getState) => {
    dispatch(getSearchRequestStart());
    const url = searchURL
      .replace('{{term}}', term)
      .replace('{{entity}}', entity);
    console.log('ccccccc----url--',url);

    const options = {
      method: 'GET',
    };
    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        console.log('ccccccc-----data loaded--here---',response);

        if (response && response.resultCount) {
          console.log('ccccccc-----data loaded--here-2--');

          dispatch(getSearchRequestSuccess(response));
        } else {
          dispatch(getSearchRequestFail('Some thing went wrong: Error Code 2'));
        }
      })
      .catch((error) => {
        dispatch(getSearchRequestFail('Some thing went wrong: Error Code 1'));
      });
  };
};

export default {
  executeGetSearchRequest,
};
