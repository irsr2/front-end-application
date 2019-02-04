import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import App from './App';
import { HomeReducer } from './reducers/HomeReducer';
import { IssueReducer } from './reducers/IssueReducer';
import { UserReducer } from './reducers/UserReducer';
import * as serviceWorker from './serviceWorker';

import './scss/main.scss';
import './scss/noscript.scss';

const store = createStore(combineReducers({ home: HomeReducer, issue: IssueReducer, user: UserReducer}), applyMiddleware(thunk, logger));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
