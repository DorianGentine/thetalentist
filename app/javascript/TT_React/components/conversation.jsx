import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { nextGuideSu } from '../actions';

import Navbar from '../containers/navbar'
import ListMessagerie from '../containers/listmessagerie'

class Conversation extends Component {
// const Conversation = (props) => {
  render () {
    return(
      <div style={{padding: "50px 100pw"}}>
        <h3 className="margin-left-15">MESSAGERIE</h3>
        <ListMessagerie />
        <div className="col-md-9">
          <div className="flex">
            <div className="photo-conv"></div>
            <div className="flex-grow-1">
              <p className="bold no-margin">Donatien Rolland</p>
              <p className="no-margin"><span className="green">•</span> En ligne</p>
            </div>
          </div>
          <hr className="ligne-horizontal"/>
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

export default connect(null, null)(Conversation);
