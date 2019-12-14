import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchAPI } from '../actions';

import Filtre from '../containers/filtre'
import TalentRepertoire from '../containers/talentRepertoire'
import SearchResults from '../containers/searchResults'

class App extends Component {

  render () {
    // style={{minHeight: "calc(100vh - 240px)"}}
    return(
      <div id="all-talents" className="row" style={{padding: "40px 0"}}>
        <Filtre />
        <div className="col-md-9 col-xs-12" style={{padding: "0 50px"}}>
          <SearchResults />
          <TalentRepertoire />
        </div>
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
