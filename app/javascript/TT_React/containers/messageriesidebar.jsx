import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchPost, fetchGET, openSidebar, updateConversation, updateConversations } from '../actions';

class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false,
    };
  }

  render () {
    const isMobile = this.props.isMobile
    const sidebarActiveMobile = this.props.sidebarActiveMobile
    let conversationActive, participant, relationship, email, city, participant_model, user_model, config_conv_id, pin, archived, startup
    let attachments = []
    let info = {
      image: null,
      full_name: "Talent",
      answer_1: "Tu n'y as pas encore accès",
      answer_2: "Tu n'y as pas encore accès",
      answer_3: "Tu n'y as pas encore accès",
      profil_url: "",
    }

    if(this.props.conversationActive != null){
      conversationActive = this.props.conversationActive.conversation
    }

    if(this.props.user){
      user_model = this.props.user.is_a_model
    }
    if(conversationActive != undefined){
      participant = conversationActive.participant
      relationship = conversationActive.in_relation
      email = conversationActive.email
      city = participant.city
      attachments = conversationActive.attachments
      participant_model = participant.user_model
      startup = participant.startup
      config_conv_id = conversationActive.config_conv_id
      pin = conversationActive.pin
      archived = conversationActive.archived
      if(relationship == "Accepter" || user_model != "Headhunter" ){
        info = {
          image: typeof participant.avatar == "string" ? null : participant.avatar.small_bright_face.url,
          full_name: participant.full_name,
          answer_1: participant.answer_1,
          answer_2: participant.answer_2,
          answer_3: participant.answer_3,
          profil_url: participant.profil_url,
        }
      }
    }

    const renderDocs = () => attachments.map((attachment, index) => <a key={index} className="margin-bottom-15" href={attachment.url} target="_blank"><FontAwesomeIcon icon={["far", "file"]}/> {attachment.name}</a>)

    const renderAvatar = () => {
      return (
        <div className="photo-conv photo-conv-lg" style={{backgroundImage: `url(${info.image})`}}>
          <p>{info.image ? "" : info.full_name.slice(0, 1)}</p>
          {!startup ? null :
            <div className="logo-su-conv logo-su-conv-lg" style={{backgroundImage: `url(${startup.logo.small_bright_face.url})`}}>
              {startup.logo.url ? "" : startup.name.slice(0,1)}
            </div>
          }
        </div> 
      )
    }

    const openDropdown = () => {
      if(this.state.opened){
        this.setState({opened: false})
      }else{
        this.setState({opened: true})
        window.onClick = () => {
          this.setState({opened: false})
        }
      }
    }

    const handleUpdate = promise => {
      const conversation = {
        conversation: promise.conversation
      }
      const conversations = {
        conversations: promise.conversations
      }
      this.props.updateConversation(conversation)
      this.props.updateConversations(conversations)
    }

    const handlePin = () => {
      const newConfig = {
        pin: !pin,
        email: email,
      }
      this.props.fetchPost(
        `/api/v1/config_conversations/${config_conv_id}`,
        newConfig,
        "PATCH",
        promise => {handleUpdate(promise)}
      )
    }
    const handleArchive = () => {
      const newConfig = {
        archived: !archived,
        email: email,
      }
      this.props.fetchPost(
        `/api/v1/config_conversations/${config_conv_id}`,
        newConfig,
        "PATCH",
        promise => {handleUpdate(promise)}
      )
    }


    return(
      <div className={`col-md-3 scroll${isMobile ? " white-box-mobile" : " white-box relative"}${sidebarActiveMobile ? "" : " hidden-wbm"}`} style={isMobile ? null : {maxWidth: "294px"}}>
        <p className="absolute more-messagerie" onClick={openDropdown}>...</p>
        {this.state.opened ?
          <div className="absolute dropdown-tsmesmsg position-more">
            <p onClick={handlePin}>{pin ? "Enlever" : "Marquer"}</p>
            <p onClick={handleArchive}>{archived ? "Rétablir" : "Archiver"}</p>
          </div>
        : null}
        {isMobile ? <FontAwesomeIcon className="absolute close-sidebar" onClick={() => this.props.openSidebar(sidebarActiveMobile)} icon={["far", "times-circle"]} /> : null }
        <div className="flex justify-center margin-bottom-30">
          {renderAvatar()}
        </div>
        <p className="participant-fullname margin-bottom-5">{info.full_name}</p>
        <p className="participant-job margin-bottom-5">{participant != undefined ? participant.job : ""}</p>
        {city != null ?
          <p className="participant-place"><FontAwesomeIcon icon={["fas", "map-marker-alt"]}/>{city}</p>
        : null }
        {participant_model != "Talentist" && (relationship == "Accepter" || user_model == "Talentist") ?
          <a className="profil-url" href={info.profil_url}>Voir le profil</a>
        : ""}
        {relationship == "Accepter" || user_model != "Headhunter" ?
          <div className="margin-top-30">
            {info.answer_1 != null ?
              <div>
                <p className="criteres">{participant != undefined ? participant.test_1 : ""}</p>
                <p className="criteres-reponses">{info.answer_1}</p>
              </div>
            : null }
            {info.answer_2 != null ?
              <div>
                <p className="criteres">{participant != undefined ? participant.test_2 : ""}</p>
                <p className="criteres-reponses">{info.answer_2}</p>
              </div>
            : null }
            {info.answer_3 != null ?
              <div>
                <p className="criteres">{participant != undefined ? participant.test_3 : ""}</p>
                <p className="criteres-reponses">{info.answer_3}</p>
              </div>
            : null }
          </div>
        : null }
        {attachments.length > 0 ?
          <p className="sidebar-title margin-top-30">Documents échangés</p>
        : null}
        <div className="flex flex-column">{attachments.length > 0 ? renderDocs() : null}</div>
        {/* <p className="sidebar-title margin-top-30">Note personnelle</p> */}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    conversationActive: state.conversationActive,
    isMobile: state.isMobile,
    sidebarActiveMobile: state.sidebarActiveMobile,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost, fetchGET, openSidebar, updateConversation, updateConversations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
