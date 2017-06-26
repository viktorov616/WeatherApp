import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
export const history = createHistory();
const router = routerMiddleware(history);
const enhancers = compose(
  applyMiddleware(loggerMiddleware, sagaMiddleware, thunk, router),
  (window.devToolsExtension) ? window.devToolsExtension() : f => f,
);
const defaultState = {};
const store = createStore(rootReducer, defaultState, enhancers);

sagaMiddleware.run(rootSaga);

export default store;
