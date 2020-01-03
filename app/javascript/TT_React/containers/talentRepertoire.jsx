import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { ReactSortable } from "react-sortablejs";

import { fetchGET } from '../actions';

import TalentCard from './talentCard'

class TalentRepertoire extends Component {

  componentDidMount(){
    this.props.fetchGET('/api/v1/talents/repertoire', "FETCH_TALENTS")
  }

  render () {
    const filter = this.props.filter

    const renderTalents = () => this.props.talents.talents.map((talent, index) => {
      if(filter.length === 0 || filter.includes(talent.job.toLowerCase())){
        return <TalentCard talent={talent} key={index} />
      }else if(filter.includes("pinned") && talent.pin != false){
        if(filter.length === 1 || filter.includes(talent.job.toLowerCase())){
          return <TalentCard talent={talent} key={index} />
        }
      }
    })

    return(
      <div className="row">
        {this.props.talents != null ? renderTalents() : <p className="text-align-center">Chargement...</p>}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talents: state.talents,
    filter: state.filter,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchGET: fetchGET,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentRepertoire);
