import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET } from '../actions';

import Navbar from '../containers/navbar'
import ListMessagerie from '../containers/listmessagerie'
import MessagerieActive from '../containers/messagerieactive'
import MessagerieSideBar from '../containers/messageriesidebar'

class Conversation extends Component {

        // <Navbar />
  render () {
    return(
      <div>
        <div className="flex" style={{padding: "40px 20px 0 85px", width: "100%"}}>
          <ListMessagerie params={this.props.match.params} />
          <MessagerieActive params={this.props.match.params} />
          <MessagerieSideBar params={this.props.match.params} />
        </div>
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
