import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET } from '../../actions';
// import setJobColor from '../../../components/setJobColor';

// import Navbar from '../containers/navbar'

class ExperiencesProfessionnelles extends Component {

  render () {
    let talent = this.props.talent
    let experiences = []
    if(talent){
      experiences = talent.experiences
    }

    const renderExperiences = () => {
      return <p>SALUT</p>
    }

    return(
      <div>
        <div className="section-h3-wrap">
          <h3 className="section-h3">Expériences professionnelles</h3>
          <span className="after"></span>
        </div>

        <div className="gray-border-box">
          <h4 className="box-title">Mes expériences antérieures</h4>
          <h5 className="box-subtitle">{`${experiences.length} entreprises`}</h5>
          <div>
            {experiences.length > 0 ? renderExperiences() : null}
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(mapStateToProps, null)(ExperiencesProfessionnelles);
