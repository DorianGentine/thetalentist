import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET, fetchPost } from '../actions';

import Message from './message'
import SendBox from './sendbox'

class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      intervalMessages: null,
      in_relation: null,
    };
  }

  componentDidMount(){
    this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")

    const objDiv = document.getElementById("messages-box");
    setTimeout( () => {
      objDiv.scrollTop = objDiv.scrollHeight
      console.log(objDiv.scrollTop)
    }, 1000);
    // do {
    //   console.log(this.props.conversationActive)
    //   objDiv.scrollTop = objDiv.scrollHeight
    //   console.log(objDiv.scrollTop)
    // }
    // while(this.props.conversationActive == undefined)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.conversationActive.in_relation != undefined && this.props.conversationActive.in_relation != nextProps.conversationActive.in_relation){
      clearInterval(this.state.intervalMessages)
      this.setState({ intervalMessages: null })
    }
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
      if(relationship == "Accepter" || participant.user_model == "Headhunter"){
        info = {
          image: participant.avatar.url,
          full_name: participant.full_name,
        }
      }
    }

    const renderMessages = () => conversationActive.messages.reverse().map((message, index) => <Message key={index} message={message} />)

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

    const acceptRelation = () => {
      this.setState({in_relation: "Accepter"})
      const newMessage = {
        conversation_id: this.props.params.id,
        email: email,
        body: "",
        in_relation: this.state.in_relation,
      }
      console.log(newMessage)
      this.props.fetchPost(
        `/api/v1/conversations/${this.props.params.id}/messages`,
        newMessage,
        "POST"
      )
    }

    const refuseBox = () => {
      this.setState({in_relation: "Refuser"})
    }

    const sendMessage = (event, onoff) => {
      event.preventDefault()
      if(onoff === "close"){
        this.setState({in_relation: null})
      }else if(onoff === "send"){
        const newMessage = {
          conversation_id: this.props.params.id,
          email: email,
          body: document.getElementById('message_refus').value,
          in_relation: this.state.in_relation,
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
      })
    }

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
          {conversationActive != undefined && relationship == "pending" ?
            participant.user_model == "Headhunter" ?
              <div className="col-md-12 text-pf">
                <p className="text-pf-1">Ce recruteur ne voit pas vos informations.</p>
                <p>Vous pouvez accepter sa demande de contact et engager la conversation ou refuser cette dernière et lui envoyer un message pour lui expliquer la raison de ce refus.</p>
                {this.state.in_relation == "Refuser" ?
                  <form>
                    <textarea
                      name="message_refus"
                      id="message_refus"
                      rows="5"
                      placeholder="Expliquer la raison de votre refus... (facultatif)"
                      value={this.state.value}
                      onChange={(textarea) => {handleOnChange(textarea.target.value)}}>
                    </textarea>
                    <button onClick={event => {sendMessage(event, "close")}} className="btn-envoyer gray-background">Fermer</button>
                    <button onClick={event => {sendMessage(event, "send")}} className="btn-envoyer">Envoyer</button>
                  </form>
                :
                  <div className="flex space-between">
                    <p className="text-pf-btn" onClick={acceptRelation}>👍 Accepter</p>
                    <p className="text-pf-btn text-pf-btn-refuser" onClick={refuseBox}>👎 Refuser</p>
                  </div>
                }
              </div>
            :
              <div className="col-md-12 text-pf">
                <p className="text-pf-1">Ce talent n'a pas encore accepté votre requête</p>
                <p>Vous accéderez à ses informations lorsqu'il vous en aura donné l'accès</p>
              </div>
          : null}
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
  return bindActionCreators({ fetchGET, fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
