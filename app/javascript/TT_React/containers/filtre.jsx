import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../actions';

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
    const filter = this.props.filter

    const mobilities = [
      "Paris",
      "Bordeaux",
      "Nationale",
      "Télétravail"
    ]

    const renderJobs = () => this.props.jobs.jobs.map((job, index) => {
      return(
        <div className="flex flex-column" key={index}>
          <FiltreItem job={job} updateFilter={this.props.updateFilter} filter={filter} />
        </div>
      )
    })

    const renderRemunerations = () => {
      let rangeValue = 0
      const handleRangeChange = value => {
        rangeValue = JSON.parse(JSON.stringify(document.getElementById("filtreRange").value))
        filter.remFilter = rangeValue
        document.getElementById("rangeText").innerText = `${rangeValue == 15 ? "+15" : rangeValue }0k€`
        if(rangeValue == 0){
          document.getElementById("rangeText").innerText = ""
        }
        this.props.updateFilter(filter)
      }

      return(
        <div className='margin-top-15 margin-bottom-30 flex space-between align-items-center'>
          <div className="slider-container slider-container-repertoire">
            <input type="range" className="slider" defaultValue={0} id="filtreRange" onChange={handleRangeChange} min="0" max="15"/>
            <div className="left-slider" style={{width: `${rangeValue / 15 * 100}%`}}></div>
          </div>
          <p className="no-margin" id="rangeText"></p>
        </div>
      )
    }
    
    const renderMobilities = () => mobilities.map((mobility, index) => {
      return(
        <div className="flex flex-column" key={index}>
          <FiltreItem mobility={mobility} updateFilter={this.props.updateFilter} filter={filter} />
        </div>
      )
    })

    const handleChange = (checked) => {
      this.setState({ checked: event.target.checked })
      this.props.updateTalents(-1)
      filter.pinFilter = event.target.checked
      this.props.updateFilter(filter)
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
          <h5>Métiers</h5>
          {this.props.jobs != null ? renderJobs() : <p className="flex-grow-1">Chargement...</p>}
        </div>
        <div>
          <h5>Rémunérations</h5>
          {renderRemunerations()}
        </div>
        <div>
          <h5>Mobilités</h5>
          {renderMobilities()}
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
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtre);
