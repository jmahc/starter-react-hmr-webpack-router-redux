// ==== Node Modules
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
// ==== Local Files
import Root from './containers/Root/Root';
import configureStore from './store/configureStore';

// ==== Local Variables
const initialState = {};
const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);
const rootEl = document.getElementById('root');

injectTapEventPlugin();
// ==== Needed for onTouchTap
//      NOTE: This should only be instantiated once!
//
// Reference: https://github.com/zilverline/react-tap-event-plugin

ReactDOM.render(<Root store={store} history={history} />, rootEl);
// ==== Render the application.
//      NOTE 1: If you notice, the instantiated `Root` is NOT
//              surrounded by AppContainer from `react-hot-loader`.
//      NOTE 2: You can wrap this in the `<AppContainer>` and it still works fine.
//      NOTE 3: It is required when doing the module reloading as seen below.
//
//      TODO - Investigate why this is.

if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept([
    './containers/Root/Root', // Same path as imported above
  ], () => {
    ReactDOM.render(
      <AppContainer>
        <Root store={store} history={history} />
      </AppContainer>,
      rootEl,
    );
  });
}
