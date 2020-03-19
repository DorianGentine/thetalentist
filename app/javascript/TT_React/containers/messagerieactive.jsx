import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../actions';

import Message from './message'
import SendBox from './sendbox'

class Conversation extends Component {

  componentDidMount(){
    this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")

    const objDiv = document.getElementById("messages-box");
    setTimeout( () => {
      objDiv.scrollTop = objDiv.scrollHeight
    }, 1000);
  }

  render () {
    let conversationActive, participant, relationship, email
    let info = {
      image: null,
      full_name: "Talent",
    }

    if(this.props.conversationActive != null){
      conversationActive = this.props.conversationActive.conversation
    }

    if(conversationActive != undefined){
      participant = conversationActive.participant
      relationship = conversationActive.in_relation
      email = conversationActive.email
      if(relationship == "Accepter"){
        info = {
          image: participant.avatar.url,
          full_name: participant.full_name,
        }
      }
    }

    const renderMessages = () => conversationActive.messages.reverse().map((message, index) => <Message key={index} message={message} />)

    return(
      <div className="col-md-5" style={{paddingTop: "56px"}}>
        <div className="flex align-items-center">
          {info.image != null ? <img className="photo-conv" src={info.image} alt="avatar"></img> : <div className="photo-conv">{info.full_name.slice(0, 1)}</div>}
          <div className="flex-grow-1">
            <p className="bold no-margin">{info.full_name}</p>
            <p className="no-margin"><span className="green">•</span> En ligne</p>
          </div>
        </div>
        <hr className="ligne-horizontal-lines-2" style={{ marginBottom: "0" }}/>
        <div id="messages-box">
          {conversationActive != undefined ? renderMessages() : <p>Chargement...</p>}
        </div>
        <hr className="ligne-horizontal-lines-2" style={{ marginTop: "0" }}/>
        <SendBox params={this.props.params} email={email} />

      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    conversationActive: state.conversationActive,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
