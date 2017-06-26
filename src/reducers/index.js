import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import home from './home';


const rootReducer = combineReducers({
  home,
  form: formReducer,
  router: routerReducer,
});

export default rootReducer;
