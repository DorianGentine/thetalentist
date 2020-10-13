import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { nextGuideSu } from '../actions';

import Navbar from '../containers/navbar'
import Filtre from '../containers/filtre'
import TalentRepertoire from '../containers/talentRepertoire'
import SearchResults from '../containers/searchResults'
import ModalTalent from '../containers/modalTalent'

class Repertory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: {
        pinFilter: false,
        jobFilter: [],
        remFilter: 0,
        mobilityFilter: []
      }
    };
  }

  render () {
    const updateFilter = (filter) => {
      console.log('filter', filter)
      this.setState({
        filter: JSON.parse(JSON.stringify(filter))
      })
    }

    return(
      <div>
        <Navbar path="repertoire" />
        <div id="all-talents" className="row no-margin" style={{padding: "40px 0"}}>
          <ModalTalent />
          <Filtre updateFilter={updateFilter} filter={this.state.filter} />
          <div className="col-md-10 col-xs-12" style={{padding: "0 50px 0 60px"}}>
            <SearchResults />
            <TalentRepertoire filter={this.state.filter} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Repertory);
