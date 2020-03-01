import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET, fetchPost } from '../actions';

import Navbar from '../containers/navbar'
import ListMessagerie from '../containers/listmessagerie'
import MessagerieActive from '../containers/messagerieactive'

class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
    };
  }

  componentDidMount(){
    this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")
  }

  render () {
    const conversationActive = this.props.conversationActive.conversation
    let participant
    if(conversationActive != undefined){
      participant = conversationActive.participant
    }

    const renderMessages = () => conversationActive.messages.map((message, index) => <p key={index}>{message.body}</p>)

    const handleOnChange = value => {
      this.setState({ value: value })
    }

    const sendMessage = (event) => {
      event.preventDefault()
      const newMessage = {
        conversation_id: this.props.params.id,
        body: document.getElementById('message').value,
        attachment: null
      }
      console.log(newMessage)
      this.props.fetchPost(`/api/v1/conversations/${this.props.params.id}/messages`, newMessage, "POST", this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE"))
      this.setState({
        value: "",
      })
    }

    return(
      <div className="col-md-9">
        <div className="flex">
          <div className="photo-conv"></div>
          <div className="flex-grow-1">
            <p className="bold no-margin">{participant != undefined ? participant.full_name : ""}</p>
            <p className="no-margin"><span className="green">•</span> En ligne</p>
          </div>
        </div>
        <hr className="ligne-horizontal"/>
        {conversationActive != undefined ? renderMessages() : <p>Chargement...</p>}

        <form action="">
          <textarea
            name="message"
            id="message"
            rows="5"
            placeholder="Écrivez votre message ici"
            value={this.state.value}
            onChange={(textarea) => {handleOnChange(textarea.target.value)}}>
          </textarea>
          <button className="btn-envoyer" onClick={event => {sendMessage(event)}} >Envoyer</button>
        </form>

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
  return bindActionCreators({ fetchGET, fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
