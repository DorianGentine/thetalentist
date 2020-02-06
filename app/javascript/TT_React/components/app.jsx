import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { nextGuideSu } from '../actions';

import Navbar from '../containers/navbar'
import Filtre from '../containers/filtre'
import TalentRepertoire from '../containers/talentRepertoire'
import SearchResults from '../containers/searchResults'
import ModalGuide from '../containers/modalGuide'
import ModalTalent from '../containers/modalTalent'

class App extends Component {

  componentDidMount(){
    const url = new URL(window.location.href);
    const newMember = url.searchParams.get("query");
    if(newMember && this.props.guideSu == 0){
      this.props.nextGuideSu(this.props.guideSu)
    }
  }

  render () {
    // style={{minHeight: "calc(100vh - 240px)"}}
        // <Navbar />
    return(
      <div>
        <div id="all-talents" className="row no-margin" style={{padding: "40px 0"}}>
          <ModalTalent />
          {this.props.guideSu == 1 ? <ModalGuide /> : null}
          <Filtre />
          <div className="col-md-10 col-xs-12" style={{padding: "0 50px 0 60px"}}>
            <SearchResults />
            <TalentRepertoire />
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    guideSu: state.guideSu,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ nextGuideSu }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
