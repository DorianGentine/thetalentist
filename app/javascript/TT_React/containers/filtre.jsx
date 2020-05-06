import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET, updateFilter, updateTalents } from '../actions';

import FiltreItem from './filtreItem'
import ModalGuide from './modalGuide'

class Filtre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    };
  }

  componentDidMount(){
    if (this.props.jobs === null) {
      this.props.fetchGET('/api/v1/jobs', "FETCH_JOBS")
    }
  }

  render () {
    const renderJobs = () => this.props.jobs.jobs.map((job, index) => {
      return(
        <div className="flex flex-column" key={index}>
          <FiltreItem job={job}/>
        </div>
      )
    })

    const handleChange = (checked) => {
      this.setState({ checked: event.target.checked })
      this.props.updateTalents(-1)
      this.props.updateFilter("pinned")
    }

    return(
      <div className="col-md-2 col-xs-12 relative" style={{padding: "0 10px 0 30px"}}>
        {this.props.guideSu == 2 ? <ModalGuide /> : null}
        <h4>Filtres Avancés</h4>
        <div className="flex space-between align-items-center">
          <h5 htmlFor="pin-filter">Talents épinglés</h5>
          <label className="switch">
            <input
              type="checkbox"
              className="no-margin margin-right-15"
              id="pin-filter"
              checked={this.state.checked}
              onChange={() => {handleChange(this.state.checked)}}
            />
            <span className="slider-small round"></span>
          </label>
        </div>
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
    guideSu: state.guideSu,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, updateFilter, updateTalents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtre);
