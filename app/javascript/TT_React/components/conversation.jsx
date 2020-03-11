import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET } from '../actions';

import Navbar from '../containers/navbar'
import ListMessagerie from '../containers/listmessagerie'
import MessagerieActive from '../containers/messagerieactive'
import MessagerieSideBar from '../containers/messageriesidebar'

class Conversation extends Component {

  render () {
    return(
      <div className="container">
        <ListMessagerie params={this.props.match.params} />
        <MessagerieActive params={this.props.match.params} />
        <MessagerieSideBar params={this.props.match.params} />
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
