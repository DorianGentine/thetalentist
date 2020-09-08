import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropzone from 'react-dropzone'

import { fetchGET, fetchPost, updateConversation } from '../actions';


class SendBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      docs: [],
    };
  }

  render () {
    const isMobile = this.props.isMobile
    const talent_id = this.props.params.talent_id || false
    const headhunter_id = this.props.params.headhunter_id || false
    let conversationActive, inRelation = this.props.in_relation, config_conv_id, sender_id, user_model
    if(this.props.conversationActive != undefined){
      conversationActive = this.props.conversationActive.conversation
      if(conversationActive != undefined){
        config_conv_id = conversationActive.config_conv_id
        user_model = conversationActive.participant.user_model
      }
      if(conversationActive != undefined && 
        conversationActive.in_relation == "Accepter" && 
        !talent_id && 
        !headhunter_id){
        inRelation = true
      }
    }
    if(this.props.user != null){
      sender_id = this.props.user.id
    }


    const handleOnChange = value => {
      this.setState({ value: value })
    }

    const sendMessage = (event) => {
      event.preventDefault()
      if(this.state.docs.length != 0){
        const formData = new FormData();
        let body
        for (let i = 0; i < this.state.docs.length; i++) {
          const doc = this.state.docs[i];
          body = doc.name
          formData.append("files", doc);
        }
        fetch(`/api/v1/config_conversations/${config_conv_id}`, {method: "PATCH", body: formData})
          .then(r => {
            console.log('result', r)
            const message = {
              sender_name: this.props.user.full_name,
              sender: "Vous",
              avatar: {
                small_bright_face: {
                  url: this.props.user.photo
                }
              },
              body: body,
              update_at: new Date()
            }
            this.props.updateConversation(this.props.conversationActive, message)
          })
      }
      if(this.state.value != ""){
        const body = this.state.value
        const formData = new FormData();
        formData.append("email", this.props.email);
        formData.append("sender_id", sender_id);
        formData.append("body", body);
        fetch(`/api/v1/conversations/${this.props.params.id}/messages`, {method: "POST", body: formData})
          .then(r => {
            const message = {
              sender_name: this.props.user.full_name,
              sender: "Vous",
              avatar: {
                small_bright_face: {
                  url: this.props.user.photo
                }
              },
              body: body,
              update_at: new Date()
            }
            this.props.updateConversation(this.props.conversationActive, message)
          })
      }
      this.setState({
        value: "",
        docs: [],
      })
    }

    const messagesBox = document.getElementById('messages-box')
    const addDoc = acceptedFiles => {
      if(isMobile){
        messagesBox.style.maxHeight = `calc(100vh - ${277 + ((acceptedFiles.length + this.state.docs.length) * 30)}px)`;
      }else{
        messagesBox.style.maxHeight = `calc(100vh - ${351 + ((acceptedFiles.length + this.state.docs.length) * 30)}px)`;
      }
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
      if(isMobile){
        messagesBox.style.maxHeight = `calc(100vh - ${277 + ((this.state.docs.length - 1) * 30)}px)`;
      }else{
        messagesBox.style.maxHeight = `calc(100vh - ${351 + ((this.state.docs.length - 1) * 30)}px)`;
      }
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
        if(isMobile){
          messagesBox.style.maxHeight = `calc(100vh - ${277 + divdoc.offsetHeight}px)`;
        }else{
          messagesBox.style.maxHeight = `calc(100vh - ${351 + divdoc.offsetHeight}px)`;
        }
      }, 501)
    }else if(messagesBox != null){
      setTimeout(() => {
        if(isMobile){
          messagesBox.style.maxHeight = "calc(100vh - 277px)";
        }else{
          messagesBox.style.maxHeight = "calc(100vh - 350px)";
        }
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
    user: state.user,
    isMobile: state.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost, updateConversation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SendBox);
