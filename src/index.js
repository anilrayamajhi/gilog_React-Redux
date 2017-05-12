import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import routes from './config/routes';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));


//  Note:
//  example url: http://ganey.com/post/5
//  browserHistory: cares about */post/5*. keeps track of url after domain
//  example url: http://ganey.com/#post/5
//  hashHistory: tracks url anything after '#' symbol
//  memoryHistory: doesnot care about url
