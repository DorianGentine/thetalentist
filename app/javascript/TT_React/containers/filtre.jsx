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
      return( <FiltreItem job={job} key={index} />)
    })

    return(
      <div className="filter flex flex-wrap">
        <i className="fas fa-filter col-lg-1"></i>
        <div className="align-items-center filter-item flex flex-grow-1">
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
