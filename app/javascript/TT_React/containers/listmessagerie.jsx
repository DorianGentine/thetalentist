import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../actions';

import MessageBox from './messagebox'

class listmessagerie extends Component {

  componentDidMount(){
    this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}/left`, "FETCH_CONVERSATIONS")
  }

  render () {
    const conversations = this.props.conversations

    const renderMessageBox = () => this.props.conversations.conversations.map((conversation, index) => <MessageBox conversation={conversation} key={index} />)

    return(
      <div className="col-md-3">
        <input className="w-100" style={{height: "40px"}} type="text"/>
        <hr className="ligne-horizontal"/>
        <div className="flex space-between">
          <p>Tous mes messages</p>
          <p>Classer par: Date</p>
        </div>
        <div className="scroll" style={{maxHeight: "calc(100vh - 76px)"}}>
          {conversations.length != 0 ? renderMessageBox() : <p>Chargement...</p> }
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(listmessagerie);
