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
    let conversationActive, inRelation = false, config_conv_id
    if(this.props.conversationActive != undefined){
      conversationActive = this.props.conversationActive.conversation
      if(conversationActive != undefined){
        config_conv_id = conversationActive.config_conv_id
      }
      if(conversationActive != undefined && conversationActive.in_relation == "Accepter"){
        inRelation = true
      }
    }


    const handleOnChange = value => {
      this.setState({ value: value })
    }

    const setIntervalMessages = () => {
      let intervalMessages = setInterval(() => {
        this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")
        this.props.fetchGET(`/api/v1/conversations`, "FETCH_CONVERSATIONS")
      }, 1000)
      this.setState({ intervalMessages: intervalMessages })
    }

    const sendMessage = (event) => {
      event.preventDefault()
      if(this.state.docs.length != 0){
        const newConfig = {
          email: this.props.email,
          config_conversation: this.state.docs,
        }
        console.log(newConfig)
        this.props.fetchPost(
          `/api/v1/config_conversations/${config_conv_id}`,
          newConfig,
          "PATCH",
          setIntervalMessages()
        )
      }
      if(this.state.value != ""){
        const newMessage = {
          conversation_id: this.props.params.id,
          email: this.props.email,
          body: this.state.value,
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
    }

    const addDoc = acceptedFiles => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          const binaryStr = reader.result
          file[binaryStr] = binaryStr
          this.setState({
            docs: this.state.docs.concat(file),
          })
        }
        reader.readAsArrayBuffer(file)
        console.log("addState", this.state.docs)
      })

    }

    const removeDoc = (docIndex) => {
      const checkDocs = (doc, index) => {
        return index !== docIndex
      }
      this.setState({
        docs: this.state.docs.filter(checkDocs),
      })
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
            disabled={!inRelation}
            onChange={(textarea) => {handleOnChange(textarea.target.value)}}>
          </textarea>
          <Dropzone onDrop={acceptedFiles => addDoc(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} disabled={!inRelation} />
                  <FontAwesomeIcon className="send-doc-btn" disabled={!inRelation} icon={["fas", "paperclip"]}/>
                </div>
              </section>
            )}
          </Dropzone>
          <button className="send-message-btn" disabled={!inRelation} onClick={event => {sendMessage(event)}} >
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
