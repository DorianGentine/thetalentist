import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchPost, fetchGET, openSidebar } from '../actions';

class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false,
      intervalMessages: null,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.conversationActive.conversation != undefined && this.props.conversationActive.conversation.pin != nextProps.conversationActive.conversation.pin ||
      this.props.conversationActive.conversation != undefined && this.props.conversationActive.conversation.archived != nextProps.conversationActive.conversation.archived){
      clearInterval(this.state.intervalMessages)
      this.setState({ intervalMessages: null })
    }
  }

  render () {
    const isMobile = this.props.isMobile
    const sidebarActiveMobile = this.props.sidebarActiveMobile
    let conversationActive, participant, relationship, email, city, user_model, config_conv_id, pin, archived
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

    if(conversationActive != undefined){
      participant = conversationActive.participant
      relationship = conversationActive.in_relation
      email = conversationActive.email
      city = participant.city
      attachments = conversationActive.attachments
      user_model = participant.user_model
      config_conv_id = conversationActive.config_conv_id
      pin = conversationActive.pin
      archived = conversationActive.archived
      if(relationship == "Accepter" || user_model === "Headhunter"){
        info = {
          image: typeof participant.avatar == "string" ? participant.avatar : participant.avatar.small_bright_face.url,
          full_name: participant.full_name,
          answer_1: participant.answer_1,
          answer_2: participant.answer_2,
          answer_3: participant.answer_3,
          profil_url: participant.profil_url,
        }
      }
    }

    const renderDocs = () => attachments.map((attachment, index) => <p key={index}><FontAwesomeIcon icon={["far", "file"]}/></p>)

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

    const setIntervalMessages = () => {
      let i = 0
      let intervalMessages = setInterval(() => {
        i++
        this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")
        this.props.fetchGET(`/api/v1/conversations`, "FETCH_CONVERSATIONS")
        if(i > 4){
          clearInterval(this.state.intervalMessages)
          this.setState({ intervalMessages: null })
        }
      }, 1000)
      this.setState({ intervalMessages: intervalMessages })
    }

    const handlePin = () => {
      const newConfig = {
        pin: !pin,
        email: email,
      }
      console.log(newConfig)
      this.props.fetchPost(
        `/api/v1/config_conversations/${config_conv_id}`,
        newConfig,
        "PATCH",
        setIntervalMessages()
      )
    }
    const handleArchive = () => {
      const newConfig = {
        archived: !archived,
        email: email,
      }
      console.log(newConfig)
      this.props.fetchPost(
        `/api/v1/config_conversations/${config_conv_id}`,
        newConfig,
        "PATCH",
        setIntervalMessages()
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
          {info.image != null ? <img className="photo-conv photo-conv-lg" src={info.image} alt="avatar"></img> : <div className="photo-conv photo-conv-lg">{info.full_name.slice(0, 1)}</div>}
        </div>
        <p className="participant-fullname margin-bottom-5">{info.full_name}</p>
        <p className="participant-job margin-bottom-5">{participant != undefined ? participant.job : ""}</p>
        {city != null ?
          <p className="participant-place"><FontAwesomeIcon icon={["fas", "map-marker-alt"]}/>{city}</p>
        : null }
        {user_model != "Talentist" && relationship == "Accepter" || user_model === "Headhunter" ?
          <a className="profil-url" href={info.profil_url}>Voir le profil</a>
        : ""}
        {relationship == "Accepter" || user_model === "Headhunter" ?
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
        <p className="sidebar-title margin-top-30">Documents échangés</p>
        <div>{attachments.length > 0 ? renderDocs() : null}</div>
        <p className="sidebar-title margin-top-30">Note personnelle</p>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    conversationActive: state.conversationActive,
    isMobile: state.isMobile,
    sidebarActiveMobile: state.sidebarActiveMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost, fetchGET, openSidebar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
