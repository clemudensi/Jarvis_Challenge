import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createLogger } from 'redux-logger';
import {rootEpic} from './epics';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';
import App from './App';
const epicMiddleware = createEpicMiddleware();
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

createLogger({
  predicate: (getState, action) => action.type
});

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
