// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reduxPromise from 'redux-promise';
// import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import { createBrowserHistory as history } from 'history';
// import { reducer as formReducer } from 'redux-form';

// import { fetchAPI } from './actions';

// internal modules
import App from './components/app';
// import '../assets/stylesheets/messagerie.scss';

// State and reducers
import talentsReducer from './reducers/talents_reducer';

const app = document.getElementById('app')
if(app){
  const identityReducer = (state = null) => state;

  const initialState = {
    talents: null,
    companyId: app.dataset.company_id,
  };

  const reducers = combineReducers({
    talents: talentsReducer,
    companyId: identityReducer,
  });


  // Middlewares
  const middlewares = applyMiddleware(reduxPromise, createLogger());
  const store = createStore(reducers, initialState, middlewares);

// render an instance of the component in the DOM
  ReactDOM.render(
    <Provider store={store}>
      <App companyId={app.dataset.company_id} />
    </Provider>,
    app
  );
}

