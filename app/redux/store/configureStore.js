import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const middleware = [];

middleware.push(thunkMiddleware);

const configureStore = () => {
  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
};

export default configureStore;
