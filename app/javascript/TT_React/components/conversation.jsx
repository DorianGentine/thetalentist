import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { fetchGET } from '../actions';

import Navbar from '../containers/navbar'
import ListMessagerie from '../containers/listmessagerie'
import MessagerieActive from '../containers/messagerieactive'
import MessagerieSideBar from '../containers/messageriesidebar'

class Conversation extends Component {

  render () {
    const isMobile = this.props.isMobile
    const talent_id = this.props.match.params.talent_id || false
    let convUrl = "/conv"
    if(this.props.user){
      convUrl = this.props.user.url.conv
    }
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

    // S'affiche quand Talentist est sur conversation d'un autre
    const renderAlert = () => {
      return(
        <div className="flex w-100 red-background padding-10 justify-center align-items-center">
          <p className="no-margin margin-right-30">Tu es connecté à la messagerie d'un talent, tu ne peux pas écrire de messages</p>
          <Link className="btn-white-border" to={convUrl} disabled={convUrl == "/conv"}>Revenir à ma messagerie</Link>
        </div>
      )
    }
    // END

    return(
      <div>
        <Navbar path={talent_id ? "spy_conv" : "conv"} />
        {talent_id ? renderAlert() : null}
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
    user: state.user,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(mapStateToProps, null)(Conversation);
