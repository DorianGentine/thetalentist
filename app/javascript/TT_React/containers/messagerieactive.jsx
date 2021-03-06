import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET, fetchPost, openMessagerie, openSidebar, updateConversation } from '../actions';

import Message from './message'
import SendBox from './sendbox'

class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      intervalMessages: null,
      in_relation: null,
      disappear: false,
    };
  }

  componentDidMount(){
    if(this.props.params.talent_id){
      this.props.fetchGET(`/api/v1/talents/${this.props.params.talent_id}/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")
    }else if(this.props.params.headhunter_id){
      this.props.fetchGET(`/api/v1/headhunters/${this.props.params.headhunter_id}/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")
    }else{
      this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")
    }

    const objDiv = document.getElementById("messages-box");
    let i = 0
    let intervalBottom = setInterval(() => {
      i++
      objDiv.scrollTop = objDiv.scrollHeight
      if(i > 5 || objDiv.scrollTop != 0){
        clearInterval(intervalBottom)
      }
    }, 1000)

    const url = new URL(window.location.href);
    const mobileMessagerie = url.searchParams.get("messagerie");
    if(mobileMessagerie){
      this.props.openMessagerie(this.props.messagerieActiveMobile)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.params.id != this.props.params.id){
      if(this.props.params.talent_id){
        this.props.fetchGET(`/api/v1/talents/${this.props.params.talent_id}/conversations/${nextProps.params.id}`, "FETCH_CONVERSATION_ACTIVE")
      }else if(this.props.params.headhunter_id){
        this.props.fetchGET(`/api/v1/headhunters/${this.props.params.headhunter_id}/conversations/${nextProps.params.id}`, "FETCH_CONVERSATION_ACTIVE")
      }else{
        this.props.fetchGET(`/api/v1/conversations/${nextProps.params.id}`, "FETCH_CONVERSATION_ACTIVE")
      }
      const objDiv = document.getElementById("messages-box");
      let i = 0
      let intervalBottom = setInterval(() => {
        i++
        objDiv.scrollTop = objDiv.scrollHeight
        if(i > 5 || objDiv.scrollTop != 0){
          clearInterval(intervalBottom)
        }
      }, 1000)

    }

    if(this.props.isMobile){
      const url = new URL(window.location.href);
      const mobileMessagerie = url.searchParams.get("messagerie");
      if(mobileMessagerie){
        this.props.openMessagerie(this.props.messagerieActiveMobile)
      }
    }

    if(this.props.conversationActive && this.props.conversationActive.in_relation != undefined && this.props.conversationActive.in_relation != nextProps.conversationActive.in_relation){
      clearInterval(this.state.intervalMessages)
      this.setState({ intervalMessages: null })
    }
  }

  render () {
    const isMobile = this.props.isMobile
    const user = this.props.user
    const messagerieActiveMobile = this.props.messagerieActiveMobile
    const sidebarActiveMobile = this.props.sidebarActiveMobile
    const talent_id = this.props.params.talent_id || false
    let conversationActive, participant, relationship, email, startup
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
      startup = participant.startup
      if(relationship == "Accepter" || participant.user_model == "Headhunter"){
        info = {
          image: typeof participant.avatar == "string" ? null : participant.avatar.small_bright_face.url,
          full_name: participant.full_name,
        }
      }
      if(relationship != "Accepter" && user.is_a_model == "Talentist"){
        info = {
          image: typeof participant.avatar == "string" ? null : participant.avatar.small_bright_face.url,
          full_name: `Talent - (${participant.full_name})`,
        }
      }
    }

    const renderAvatar = () => {
      return (
        <div className="photo-conv" style={{backgroundImage: `url(${info.image})`}}>
          <p>{info.image ? "" : info.full_name.slice(0, 1)}</p>
          {!startup ? null :
            <div className="logo-su-conv" style={{backgroundImage: `url(${startup.logo.small_bright_face.url})`}}>
              {startup.logo.url ? "" : startup.name.slice(0,1)}
            </div>
          }
        </div> 
      )
    }

    const renderMessages = () => conversationActive.messages.map((message, index) => {
      const checkAttachment = attachment => {
        return attachment.key == message.body
      }

      const attachment = conversationActive.attachments.find(checkAttachment)
      if(attachment){
        return <Message key={index} message={message} attachment={attachment} />
      }else{
        return <Message key={index} message={message} />
      }
    })

    const handleOnChange = value => {
      this.setState({ value: value })
    }

    const acceptRelation = () => {
      if(!talent_id || !headhunter_id){
        this.setState({
          in_relation: "Accepter",
          disappear: true
        })
        const newMessage = {
          conversation_id: this.props.params.id,
          sender_id: user.id,
          email: email,
          body: "",
          in_relation: "Accepter",
        }
        this.props.fetchPost(
          `/api/v1/conversations/${this.props.params.id}/messages`,
          newMessage,
          "POST"
        )
      }
    }

    const refuseBox = () => {
      if(!talent_id || !headhunter_id){
        this.setState({in_relation: "Refuser"})
      }
    }

    const sendMessage = (event, onoff) => {
      event.preventDefault()
      if(onoff === "close"){
        this.setState({in_relation: null})
      }else if(onoff === "send"){
        const body = document.getElementById('message_refus').value
        console.log('body', body)
        const newMessage = {
          conversation_id: this.props.params.id,
          email: email,
          sender_id: user.id,
          body: document.getElementById('message_refus').value,
          in_relation: this.state.in_relation,
        }
        console.log(newMessage)
        this.props.fetchPost(
          `/api/v1/conversations/${this.props.params.id}/messages`,
          newMessage,
          "POST",
          ()=>{
            const message = {
              sender_name: user.full_name,
              sender: "Vous",
              avatar: {
                small_bright_face: {
                  url: user.photo
                }
              },
              body: body,
              update_at: new Date()
            }
            this.props.updateConversation(this.props.conversationActive, message, "Refuser")
          }
        )
      }
        // setIntervalMessages()
      this.setState({
        value: "",
      })
    }

    return(
      <div className={`col-md-5 flex-column${isMobile ? " messagerie-active-mobile" : " flex-grow-1"}${messagerieActiveMobile ? "" : " hidden-messagerie"}`} style={isMobile ? null : {paddingTop: "56px"}}>
        <div className="flex align-items-center">
          {isMobile ? <FontAwesomeIcon className="violet margin-right-15" icon={["fas", "chevron-left"]} onClick={() => this.props.openMessagerie(messagerieActiveMobile)} /> : null}
          {renderAvatar()}
          <div className="flex-grow-1">
            <p className="bold no-margin">{info.full_name}</p>
            {/* <p className="no-margin"><span className="green">•</span> En ligne</p> */}
          </div>
          {isMobile ? <FontAwesomeIcon className="violet" icon={["fas", "info-circle"]} onClick={() => this.props.openSidebar(sidebarActiveMobile)} /> : null}
        </div>
        <hr className="ligne-horizontal-lines-2" style={{ marginBottom: "0" }}/>
        <div id="messages-box" className="flex-grow-1 scroll">
          <div className="col-md-12 text-pf">
            <p style={{fontSize: "30px"}}>👋</p>
            <p className="text-pf-1">Bienvenue dans votre espace messagerie!</p>
            <p className="margin-bottom-45">Centralisez tous vos échanges et documents. Vous conservez ainsi en un seul endroit l’historique de votre relation.</p>
          </div>
          {conversationActive != undefined ? renderMessages() : <p>Chargement...</p>}
          {conversationActive != undefined && relationship == "pending" && !this.state.disappear ?
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
        <SendBox params={this.props.params} in_relation={this.state.in_relation} email={email} />

      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    user: state.user,
    conversationActive: state.conversationActive,
    isMobile: state.isMobile,
    messagerieActiveMobile: state.messagerieActiveMobile,
    sidebarActiveMobile: state.sidebarActiveMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost, openMessagerie, openSidebar, updateConversation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
