import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropzone from 'react-dropzone'

import { fetchGET, fetchPost } from '../actions';


class SendBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      intervalMessages: null,
      docs: [],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.conversationActive.conversation != undefined && this.props.conversationActive.conversation.messages.length != nextProps.conversationActive.conversation.messages.length){
      clearInterval(this.state.intervalMessages)
      this.setState({ intervalMessages: null })
    }
  }

  render () {
    let conversationActive
    if(this.props.conversationActive != undefined){
      conversationActive = this.props.conversationActive.conversation
    }


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
        attachment: this.state.docs
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

    const addDoc = acceptedFiles => {
      this.setState({docs: this.state.docs.concat(acceptedFiles)})
    }

    const removeDoc = (docIndex) => {
      const checkDocs = (doc, index) => {
        return index !== docIndex
      }
      this.setState({docs: this.state.docs.filter(checkDocs)})
      console.log("newState", this.state.docs)
    }

    const renderDocs = () => this.state.docs.map((doc, index) => {
      const name = doc.name
      return <div className="flex space-between" key={index}>
        <p>{name}</p>
        <FontAwesomeIcon onClick={() => removeDoc(index)} icon={["far", "times-circle"]} />
      </div>
    })

    return(
      <div>
        <form className="flex space-between">
          <textarea
            name="message"
            id="message"
            rows="5"
            placeholder="Envoyer un message..."
            value={this.state.value}
            onChange={(textarea) => {handleOnChange(textarea.target.value)}}>
          </textarea>
          <Dropzone onDrop={acceptedFiles => addDoc(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FontAwesomeIcon className="send-doc-btn" icon={["fas", "paperclip"]}/>
                </div>
              </section>
            )}
          </Dropzone>
          <button className="send-message-btn" onClick={event => {sendMessage(event)}} >
            <FontAwesomeIcon icon={["far", "paper-plane"]}/>
          </button>
        </form>
        {renderDocs()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SendBox);
