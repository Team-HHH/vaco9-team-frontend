import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';

const middleware = [ReduxThunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default createStore(reducer, applyMiddleware(...middleware));
