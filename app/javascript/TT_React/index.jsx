// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
// import { Provider } from 'react-redux';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
// import reduxPromise from 'redux-promise';
// import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import { createBrowserHistory as history } from 'history';
// import { reducer as formReducer } from 'redux-form';

// import { fetchAPI } from './actions';

// internal modules
import App from './components/app';
// import '../assets/stylesheets/messagerie.scss';

// State and reducers
// import apiReducer from './reducers/api_reducer';

const app = document.getElementById('app')
if(app){
  const identityReducer = (state = null) => state;
  // const initialState = {};
  // const reducers = combineReducers({});


  // Middlewares
  // const middlewares = applyMiddleware(reduxPromise, logger);
  // const store = createStore(reducers, initialState, middlewares);

// render an instance of the component in the DOM
  ReactDOM.render(
    <App name="Dorian" />,
    app
  );
}

