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
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory as history } from 'history';
// import { createHistory as history} from 'history';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBookmark as fasBookmark, faShareAlt, faUserPlus, faUserCheck, faPhone, faSearch, faChevronDown, faChevronUp, faMapMarkerAlt, faPaperclip, faFile as fasFile, faUserFriends, faEnvelope, faUser as fasUser, faSlidersH, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as farBookmark, faPaperPlane, faUser, faFile, faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
// import { reducer as formReducer } from 'redux-form';

// import { fetchAPI } from './actions';

// internal modules
import repertory from './components/repertory';
import conversation from './components/conversation';
// import '../assets/stylesheets/messagerie.scss';

// State and reducers
import conversationActiveReducer from './reducers/conversation_active_reducer';
import conversationsReducer from './reducers/conversations_reducer';
import filterReducer from './reducers/filter_reducer';
import jobsReducer from './reducers/jobs_reducer';
import guideSuReducer from './reducers/guide_su_reducer';
import modalSelectedReducer from './reducers/modal_selected_reducer';
import modalOpenedReducer from './reducers/modal_opened_reducer';
import talentsReducer from './reducers/talents_reducer';

const app = document.getElementById('app')
if(app){
  const identityReducer = (state = null) => state;

  const initialState = {
    conversationActive: [],
    conversations: [],
    filter: [],
    guideSu: 0,
    jobs: null,
    modalSelected: null,
    modalOpened: false,
    talents: null,
    userId: app.dataset.user_id,
    userType: app.dataset.usertype,
  };

  const reducers = combineReducers({
    conversationActive: conversationActiveReducer,
    conversations: conversationsReducer,
    filter: filterReducer,
    guideSu: guideSuReducer,
    jobs: jobsReducer,
    modalSelected: modalSelectedReducer,
    modalOpened: modalOpenedReducer,
    talents: talentsReducer,
    userId: identityReducer,
    userType: identityReducer,
  });


  // Middlewares
  const middlewares = applyMiddleware(reduxPromise, createLogger());
  const store = createStore(reducers, initialState, middlewares);
  library.add(
    fab,
    farBookmark,
    fasBookmark,
    faChevronDown,
    faChevronUp,
    faCogs,
    faEnvelope,
    faFile,
    fasFile,
    faMapMarkerAlt,
    faPaperclip,
    faPaperPlane,
    faPhone,
    faQuestionCircle,
    faSearch,
    faShareAlt,
    faSignOutAlt,
    faSlidersH,
    faTimesCircle,
    faUser,
    fasUser,
    faUserFriends,
    faUserCheck,
    faUserPlus,
  )

// render an instance of the component in the DOM
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/repertoire" component={repertory} />
          <Route path="/conversations/:id" component={conversation} />
          <Redirect from="/" to="/" />
        </Switch>
      </Router>
    </Provider>,
    app
  );
}

