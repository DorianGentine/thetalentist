import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../actions';

import TalentCard from './talentCard'

class TalentRepertoire extends Component {

  componentDidMount(){
    this.props.fetchGET('/api/v1/talents/repertoire', "FETCH_TALENTS")
  }

  render () {
    const renderTalents = () => this.props.talents.talents.map((talent, index) => <TalentCard talent={talent} key={index} />)

    return(
      <div>
        {this.props.talents != null ? renderTalents() : <p className="text-align-center">Chargement...</p>}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talents: state.talents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchGET: fetchGET,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentRepertoire);
