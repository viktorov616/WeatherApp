import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import App from './pages/App';

import store, { history } from './store';

import './style.scss';

const content = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>
);

const renderRoot = () => {
  ReactDOM.render(
    <AppContainer>
      { content }
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderRoot();

if (module.hot) {
  module.hot.accept('./pages/App', () => { renderRoot(); });
}
