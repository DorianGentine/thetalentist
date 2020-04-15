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
    const isMobile = this.props.isMobile
    let styleContainer = {
      padding: "40px 20px 0 85px",
      width: "100%"
    }
    if(isMobile){
      styleContainer = {
        padding: "30px 5px 0",
        width: "100%"
      }
    }

    return(
      <div>
        <Navbar path="conv" />
        <div className={isMobile ? "overflow-x-hidden" : "flex"} style={styleContainer}>
          <ListMessagerie params={this.props.match.params} />
          <MessagerieActive params={this.props.match.params} />
          <MessagerieSideBar params={this.props.match.params} />
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(mapStateToProps, null)(Conversation);
