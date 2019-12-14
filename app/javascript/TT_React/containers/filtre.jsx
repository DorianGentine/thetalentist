import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../actions';

import FiltreItem from './filtreItem'

class Filtre extends Component {

  componentDidMount(){
    this.props.fetchGET('/api/v1/jobs', "FETCH_JOBS")
  }

  render () {
    const renderJobs = () => this.props.jobs.jobs.map((job, index) => {
      return(
        <div className="flex flex-column" key={index}>
          <FiltreItem job={job}/>
        </div>
      )
    })

    return(
      <div className="col-md-3 col-xs-12" style={{padding: "0 50px"}}>
        <h4>Filtres Avancés</h4>
        <div>
          <h5>Spécialisation</h5>
          {this.props.jobs != null ? renderJobs() : <p className="flex-grow-1">Chargement...</p>}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchGET: fetchGET,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtre);
