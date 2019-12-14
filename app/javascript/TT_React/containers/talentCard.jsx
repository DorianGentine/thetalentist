import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

// import { fetchGET } from '../actions';

class TalentCard extends Component {

  render () {
    const talent = this.props.talent
    let color = {
      backgroundColor: "blue",
      color: "yellow",
    }

    switch (talent.job.toLowerCase()){
      case "product": {
        color = {
          backgroundColor: "#FCEBEB",
          color: "#FE7373",
        }
      }
    }

    return(
      <div className="col-xs-12 col-md-4 relative card">
        <p className="card-job" style={color}>{talent.job}</p>
        <p className="card-position">{talent.position}</p>
        <p className="card-formation">{`${talent.formations[0].title}${talent.formations[0].type_of_formation != null ? ` - ${talent.formations[0].type_of_formation}` : "" }`}</p>
        <div className="card-grid">
          <p className="grid-title">Expérience:</p>
          <p className="grid-info">{talent.year_experience_job} {talent.year_experience_job === 1 ? "an" : "ans"}</p>
          <p className="grid-title">Rémunération:</p>
          <p className="grid-info">{talent.year_experience_job}</p>
        </div>
        <div className="margin-top-15 flex flex-wrap">{
          talent.talent_small_plus.map((smallPlus, index) => {
            return <p className="small-plus" key={index}>{smallPlus.description}</p>
          })}
        </div>
        <div className="flex space-between">
          <FontAwesomeIcon icon={f-coffee} />
          <p className="no-margin">Afficher davantage</p>
        </div>
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     talents: state.talents,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(null, null)(TalentCard);
