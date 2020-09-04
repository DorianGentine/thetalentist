import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET } from '../../actions';
// import setJobColor from '../../../components/setJobColor';

import RenderExperiences from './renderExperiences'

class ExperiencesProfessionnelles extends Component {

  render () {

    return(
      <div>
        <div className="section-h3-wrap">
          <h3 className="section-h3">Expériences professionnelles</h3>
          <span className="after"></span>
        </div>

        <RenderExperiences color={this.props.color} />
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     talent: state.talent,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(null, null)(ExperiencesProfessionnelles);
