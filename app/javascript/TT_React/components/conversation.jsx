import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET } from '../actions';

import Navbar from '../containers/navbar'
import ListMessagerie from '../containers/listmessagerie'
import MessagerieActive from '../containers/messagerieactive'

class Conversation extends Component {

  render () {
    return(
      <div style={{padding: "50px 100pw"}}>
        <h3 className="margin-left-15 messagerie-title">Messagerie</h3>
        <ListMessagerie params={this.props.match.params} />
        <MessagerieActive params={this.props.match.params} />
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     conversations: state.conversations,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(null, null)(Conversation);
