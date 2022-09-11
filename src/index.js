import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import tabReducer from './reducers/tabReducer';
import filterReducer from './reducers/filterReducer';
import ticketReducer from './reducers/ticketReducer';
import './index.css';
import App from './components/App/App';

const rootReducer = combineReducers({
  tabReducer,
  filterReducer,
  ticketReducer,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
