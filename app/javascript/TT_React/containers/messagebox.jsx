import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { nextGuideSu } from '../actions';

class messagebox extends Component {
  render () {
    return(
      <div className="message-box">
        <div className="photo-conv"></div>
        <div>
          <p className="no-margin">Donatien Rolland</p>
          <p className="gray font-12 italic">Développeur Front-end</p>
          <p className="no-margin font-12">We advice startups and build strategies and execute according...</p>
        </div>
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     guideSu: state.guideSu,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ nextGuideSu }, dispatch);
// }

export default connect(null, null)(messagebox);
