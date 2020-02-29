import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { nextGuideSu } from '../actions';

import MessageBox from './messagebox'

class listmessagerie extends Component {
  render () {
    return(
      <div className="col-md-3">
        <input className="w-100" style={{height: "40px"}} type="text"/>
        <hr className="ligne-horizontal"/>
        <div className="flex space-between">
          <p>Tous mes messages</p>
          <p>Classer par: Date</p>
        </div>
        <MessageBox />
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

export default connect(null, null)(listmessagerie);
