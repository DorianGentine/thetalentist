import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchAPI } from '../actions';

import TalentRepertoire from '../containers/talentRepertoire'
import SearchResults from '../containers/searchResults'

class App extends Component {

  render () {
    // style={{minHeight: "calc(100vh - 240px)"}}
    return(
      <div id="all-talents">
        <SearchResults />
        <TalentRepertoire />
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     api: state.api,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchAPI }, dispatch);
// }

export default App;
