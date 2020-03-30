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
      let i = 0
      let intervalMessages = setInterval(() => {
        i++
        this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")
        this.props.fetchGET(`/api/v1/conversations`, "FETCH_CONVERSATIONS")
        console.log(i)
        if(i > 4){
          clearInterval(this.state.intervalMessages)
          this.setState({ intervalMessages: null })
        }
      }, 1000)
      this.setState({ intervalMessages: intervalMessages })
    }

    const sendMessage = (event) => {
      event.preventDefault()
      if(this.state.docs.length != 0){
        const newConfig = {
          email: this.props.email,
          config_conversation: this.state.docsPath,
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
      }
      this.setState({
        value: "",
        docs: [],
      })
    }

    const messagesBox = document.getElementById('messages-box')
    const addDoc = acceptedFiles => {
      messagesBox.style.maxHeight = `calc(100vh - ${351 + ((acceptedFiles.length + this.state.docs.length) * 30)}px)`;
      acceptedFiles.forEach((fichier) => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          const binaryStr = reader.result
          fichier[binaryStr] = binaryStr
        }
        reader.readAsArrayBuffer(fichier)
        const filePath = fichier.path
        this.setState({
          docs: this.state.docs.concat(fichier),
        })
      })

    }

    const removeDoc = (docIndex) => {
      messagesBox.style.maxHeight = `calc(100vh - ${351 + ((this.state.docs.length - 1) * 30)}px)`;
      const checkDocs = (doc, index) => {
        return index !== docIndex
      }
      this.setState({
        docs: this.state.docs.filter(checkDocs),
      })
    }

    const renderDocs = () => this.state.docs.map((doc, index) => {
      return <div className="flex space-between doc-sending relative" key={index}>
        <div className="background-doc-sending"></div>
        <FontAwesomeIcon className="margin-right-5" icon={["fas", "file"]} />
        <p>{doc.name}</p>
        <FontAwesomeIcon onClick={() => removeDoc(index)} icon={["far", "times-circle"]} />
      </div>
    })

    if(this.state.docs.length != 0){
      const divdoc = document.getElementById('doc-to-send')
      setTimeout(() => {
        messagesBox.style.maxHeight = `calc(100vh - ${351 + divdoc.offsetHeight}px)`;
      }, 501)
    }else{
      setTimeout(() => {
        messagesBox.style.maxHeight = "calc(100vh - 350px)";
      }, 501)
    }

    return(
      <div className="absolute" style={{bottom: "0px", left: "15px", right: "15px"}}>
        <div id="doc-to-send">
          {renderDocs()}
        </div>
        <hr className="ligne-horizontal-lines-2" style={{ marginTop: "0" }}/>
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
