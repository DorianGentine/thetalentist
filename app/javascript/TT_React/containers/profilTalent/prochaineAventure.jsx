import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchPost } from '../../actions';

import RenderQuestions from './renderQuestions'
import RenderCompetences from './renderCompetences'
import RenderWaitingFors from './renderWaitingFors'
import RenderSavoirEtre from './renderSavoirEtre'
import RenderTechnos from './renderTechnos'

class ProchaineAventure extends Component {
  render () {
    return(
      <div>
        <div className="section-h3-wrap">
          <h3 className="section-h3">Prochaine aventure</h3>
          <span className="after"></span>
        </div>
        <RenderQuestions color={this.props.color} />
        <RenderCompetences color={this.props.color} />
        <RenderWaitingFors color={this.props.color} />
        <RenderSavoirEtre color={this.props.color} />
        <RenderTechnos color={this.props.color} />
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
//   return bindActionCreators({ fetchPost }, dispatch);
// }

export default connect(null, null)(ProchaineAventure);
