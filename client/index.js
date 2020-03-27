/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import Root from './pages/Root';
import './styles/app.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import './favicon.ico'; // Tell webpack to load favicon.ico
import './styles/icons/fontawesome';
import 'react-datepicker/dist/react-datepicker.css';
import {setAuthorizationHeader} from './utils/axiosConfig';
import * as Sentry from '@sentry/browser';

if(process.env.SENTRY_DSN_FRONTEND) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN_FRONTEND,
    environment: process.env.DEPLOYMENT_NAME
  });
}

const store = configureStore();
setAuthorizationHeader();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);
/*eslint-disable no-undef*/
if(module.hot) {
  module.hot.accept('./pages/Root', () => {
    const NewRoot = Root;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
/*eslint-enable no-undef*/
