import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET, fetchPost } from '../actions';

import Message from './message'

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

    const renderMessages = () => conversationActive.messages.map((message, index) => <Message key={index} message={message} />)

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
        <div className="flex align-items-center">
          <div className="photo-conv"></div>
          <div className="flex-grow-1">
            <p className="bold no-margin">{participant != undefined ? participant.full_name : ""}</p>
            <p className="no-margin"><span className="green">•</span> En ligne</p>
          </div>
          <a className="profil-url" href={participant != undefined ? participant.profil_url : ""}>
            <FontAwesomeIcon icon={["far", "user"]}/>
          </a>
        </div>
        <hr className="ligne-horizontal" style={{ marginBottom: "0" }}/>
        <div className="row">
          <div className="col-md-8">
            <div className="messages-box">
              {conversationActive != undefined ? renderMessages() : <p>Chargement...</p>}
            </div>

            <form className="flex space-between bordure-droite padding-vertical-30">
              <textarea
                name="message"
                id="message"
                rows="5"
                placeholder="Écrivez votre message ici"
                value={this.state.value}
                onChange={(textarea) => {handleOnChange(textarea.target.value)}}>
              </textarea>
              <button className="send-message-btn" onClick={event => {sendMessage(event)}} >
                <FontAwesomeIcon icon={["far", "paper-plane"]}/>
              </button>
            </form>
          </div>
          <div className="col-md-4 padding-vertical-30">
            <div className="photo-conv photo-conv-lg margin-auto margin-bottom-30"></div>
            <p className="text-align-center font-16">{participant != undefined ? participant.full_name : ""}</p>
            <p className="gray text-align-center font-16">{participant != undefined ? participant.job : ""}</p>
            <hr className="ligne-horizontal margin-top-30 margin-bottom-30"/>
            <p className="criteres">{participant != undefined ? participant.test_1 : ""}</p>
            <p className="criteres-reponses">{participant != undefined ? participant.answer_1 : ""}</p>
            <p className="criteres">{participant != undefined ? participant.test_2 : ""}</p>
            <p className="criteres-reponses">{participant != undefined ? participant.answer_2 : ""}</p>
            <p className="criteres">{participant != undefined ? participant.test_3 : ""}</p>
            <p className="criteres-reponses">{participant != undefined ? participant.answer_3 : ""}</p>
            <p className="font-16 margin-top-30">Documents échangés</p>
            <hr className="ligne-horizontal"/>
          </div>
        </div>

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
