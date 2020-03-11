import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET, fetchPost } from '../actions';


class SendBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      intervalMessages: null,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.conversationActive.conversation != undefined && this.props.conversationActive.conversation.messages.length != nextProps.conversationActive.conversation.messages.length){
      clearInterval(this.state.intervalMessages)
      this.setState({ intervalMessages: null })
    }
  }

  render () {
    const conversationActive = this.props.conversationActive.conversation

    const handleOnChange = value => {
      this.setState({ value: value })
    }

    const setIntervalMessages = () => {
      console.log("DONE")
      let intervalMessages = setInterval(() => {
        this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")
      }, 1000)
      this.setState({ intervalMessages: intervalMessages })
    }

    const sendMessage = (event) => {
      event.preventDefault()
      const newMessage = {
        conversation_id: this.props.params.id,
        email: this.props.email,
        body: document.getElementById('message').value,
        attachment: null
      }
      console.log(newMessage)
      this.props.fetchPost(
        `/api/v1/conversations/${this.props.params.id}/messages`,
        newMessage,
        "POST",
        setIntervalMessages()
      )
      this.setState({
        value: "",
      })
    }

    return(
      <form className="flex space-between">
        <textarea
          name="message"
          id="message"
          rows="5"
          placeholder="Envoyer un message..."
          value={this.state.value}
          onChange={(textarea) => {handleOnChange(textarea.target.value)}}>
        </textarea>
        <button className="send-message-btn" onClick={event => {sendMessage(event)}} >
          <FontAwesomeIcon icon={["far", "paper-plane"]}/>
        </button>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SendBox);
