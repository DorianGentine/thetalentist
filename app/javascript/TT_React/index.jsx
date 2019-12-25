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
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBookmark as fasBookmark, faShareAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons'
// import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import { createBrowserHistory as history } from 'history';
// import { reducer as formReducer } from 'redux-form';

// import { fetchAPI } from './actions';

// internal modules
import App from './components/app';
// import '../assets/stylesheets/messagerie.scss';

// State and reducers
import filterReducer from './reducers/filter_reducer';
import jobsReducer from './reducers/jobs_reducer';
import modalSelectedReducer from './reducers/modal_selected_reducer';
import modalOpenedReducer from './reducers/modal_opened_reducer';
import talentsReducer from './reducers/talents_reducer';

const app = document.getElementById('app')
if(app){
  const identityReducer = (state = null) => state;

  const initialState = {
    companyId: app.dataset.company_id,
    filter: [],
    jobs: null,
    modalSelected: null,
    modalOpened: false,
    talents: null,
  };

  const reducers = combineReducers({
    companyId: identityReducer,
    filter: filterReducer,
    jobs: jobsReducer,
    modalSelected: modalSelectedReducer,
    modalOpened: modalOpenedReducer,
    talents: talentsReducer,
  });


  // Middlewares
  const middlewares = applyMiddleware(reduxPromise, createLogger());
  const store = createStore(reducers, initialState, middlewares);
  library.add(fab, fasBookmark, farBookmark, faShareAlt, faUserPlus)

// render an instance of the component in the DOM
  ReactDOM.render(
    <Provider store={store}>
      <App companyId={app.dataset.company_id} />
    </Provider>,
    app
  );
}

