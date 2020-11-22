import * as types from '../actions/types';

const initialState = {
  isShowLoader: false,
  searchResponse: null,
  apiErrorMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SEARCH_REQUEST_START:
      return {
        ...state,
        isShowLoader: true,
        searchResponse: null,
        apiErrorMessage: null,
      };
    case types.GET_SEARCH_REQUEST_SUCCESS: {
      const {searchResponse} = action.payload;
      return {
        ...state,
        isShowLoader: false,
        searchResponse: searchResponse,
        apiErrorMessage: null,
      };
    }
    case types.GET_SEARCH_REQUEST_FAIL: {
      const {apiErrorMessage} = action.payload;
      return {
        ...state,
        isShowLoader: false,
        searchResponse: null,
        apiErrorMessage: apiErrorMessage,
      };
    }

    default:
      return state;
  }
};

export default reducer;
