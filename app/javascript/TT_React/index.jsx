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
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBookmark as fasBookmark, faShareAlt, faUserPlus, faUserCheck, faPhone, faSearch, faChevronDown, faChevronUp, faMapMarkerAlt, faPaperclip, faFile as fasFile, faUserFriends, faEnvelope, faEnvelopeOpen, faUser as fasUser, faSlidersH, faCogs, faSignOutAlt, faChartLine, faBars, faChevronLeft, faInfoCircle, faArrowsAlt, faCheck, faSuitcase, faCalendar, faArrowLeft, faPlane, faBriefcase, faGraduationCap, faPen, faUserCircle, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as farBookmark, faPaperPlane, faUser, faFile, faTimesCircle, faQuestionCircle, faEdit, faSave } from '@fortawesome/free-regular-svg-icons'

// import { fetchAPI } from './actions';

// internal modules
import repertory from './components/repertory';
import conversation from './components/conversation';
import dashboardHeadhunter from './components/dashboardHeadhunter';
import dashboardTalent from './components/dashboardTalent';
import inscriptionTalent from './components/inscriptionTalent';
import profilRecruteur from './components/profilRecruteur';
import profilTalent from './components/profilTalent';

// State and reducers
import companyTypesReducer from './reducers/company_types_reducer';
import conversationActiveReducer from './reducers/conversation_active_reducer';
import conversationsReducer from './reducers/conversations_reducer';
import formationsReducer from './reducers/formations_reducer';
import jobsReducer from './reducers/jobs_reducer';
import guideSuReducer from './reducers/guide_su_reducer';
import headhuntersReducer from './reducers/headhunters_reducer';
import knownsReducer from './reducers/knowns_reducer';
import languagesReducer from './reducers/languages_reducer';
import messagerieActiveMobileReducer from './reducers/messagerie_active_mobile_reducer';
import modalSelectedReducer from './reducers/modal_selected_reducer';
import modalOpenedReducer from './reducers/modal_opened_reducer';
import notificationsReducer from './reducers/notifications_reducer';
import sectorsReducer from './reducers/sectors_reducer';
import sidebarActiveMobileReducer from './reducers/sidebar_active_mobile_reducer';
import skillsReducer from './reducers/skills_reducer';
import startupsReducer from './reducers/startups_reducer';
import talentReducer from './reducers/talent_reducer';
import talentsReducer from './reducers/talents_reducer';
import technosReducer from './reducers/technos_reducer';
import userReducer from './reducers/user_reducer';

const app = document.getElementById('app')
if(app){
  const identityReducer = (state = null) => state;

  let isMobileState = false
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobileState = true
  }

  const initialState = {
    companyTypes: null,
    conversationActive: [],
    conversations: [],
    formations: null,
    guideSu: 0,
    headhunters: null,
    isMobile: isMobileState,
    jobs: null,
    knowns: null,
    languages: null,
    messagerieActiveMobile: false,
    modalSelected: null,
    modalOpened: false,
    notifications: [],
    sectors: null,
    sidebarActiveMobile: false,
    skills: null,
    startups: null,
    talent: null,
    talents: null,
    technos: null,
    user: null,
  };

  const reducers = combineReducers({
    companyTypes: companyTypesReducer,
    conversationActive: conversationActiveReducer,
    conversations: conversationsReducer,
    formations: formationsReducer,
    guideSu: guideSuReducer,
    headhunters: headhuntersReducer,
    isMobile: identityReducer,
    jobs: jobsReducer,
    knowns: knownsReducer,
    languages: languagesReducer,
    messagerieActiveMobile: messagerieActiveMobileReducer,
    modalSelected: modalSelectedReducer,
    modalOpened: modalOpenedReducer,
    notifications: notificationsReducer,
    sectors: sectorsReducer,
    sidebarActiveMobile: sidebarActiveMobileReducer,
    skills: skillsReducer,
    startups: startupsReducer,
    talent: talentReducer,
    talents: talentsReducer,
    technos: technosReducer,
    user: userReducer,
  });


  // Middlewares
  let middlewares = applyMiddleware(reduxPromise);

  if (process.env.NODE_ENV === `development` || window.location.origin.includes("staging")) {
    const logger = createLogger({
      duration: true,
    });

    middlewares = applyMiddleware(reduxPromise, logger);
  }
  const store = createStore(reducers, initialState, middlewares);
  // const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);



  // const middlewares = applyMiddleware(reduxPromise, createLogger());
  // const store = createStore(reducers, initialState, middlewares);
  library.add(
    fab,
    faArrowsAlt,
    faArrowLeft,
    faBars,
    farBookmark,
    fasBookmark,
    faBriefcase,
    faCalendar,
    faChartLine,
    faCheck,
    faChevronDown,
    faChevronLeft,
    faChevronUp,
    faCogs,
    faCommentAlt,
    faEdit,
    faEnvelope,
    faEnvelopeOpen,
    faFile,
    fasFile,
    faGraduationCap,
    faInfoCircle,
    faMapMarkerAlt,
    faPaperclip,
    faPaperPlane,
    faPen,
    faPlane,
    faPhone,
    faQuestionCircle,
    faSave,
    faSearch,
    faShareAlt,
    faSignOutAlt,
    faSlidersH,
    faSuitcase,
    faTimesCircle,
    faUser,
    faUserCircle,
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
          <Route path="/talents/:talent_id/welcome/:step" component={inscriptionTalent} />
          <Redirect from="/talents/:id/welcome" to="/talents/:id/welcome/1" />
          <Route path="/talents/:talent_id/conversations/:id" component={conversation} />
          <Route path="/messagerie/:id" component={conversation} />
          <Route path="/conversations/:id" component={conversation} />
          <Route path="/talents/:talent_id/conversations/:id" component={conversation} />
          <Route path="/headhunters/:headhunter_id/conversations/:id" component={conversation} />
          <Route path="/headhunters/:id" component={profilRecruteur} />
          <Route path="/talents/sign_up" component={inscriptionTalent} />
          <Route path="/talents/:talent_id/conversations/:id" component={conversation} />
          <Route path="/headhunters/:headhunter_id/conversations/:id" component={conversation} />
          <Route path="/headhunters/:id" component={profilRecruteur} />
          <Route path="/talents/:id" component={profilTalent} />
          <Route path="/messagerie" component={conversation} />
          <Route path="/repertoire" component={repertory} />
          <Route path="/talents" component={dashboardTalent} />
          <Route path="/headhunters" component={dashboardHeadhunter} />
          <Redirect from="/" to="/talents/sign_in" />
        </Switch>
      </Router>
    </Provider>,
    app
  );
}

