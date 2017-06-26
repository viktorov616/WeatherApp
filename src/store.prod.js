import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers/index';

export const history = createHistory();
const router = routerMiddleware(history);
const enhancers = applyMiddleware(thunk, router);
const defaultState = {};
const store = createStore(rootReducer, defaultState, enhancers);

export default store;
