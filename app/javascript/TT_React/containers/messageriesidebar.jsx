import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchPost, fetchGET } from '../actions';

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
          image: participant.avatar.url,
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
      let intervalMessages = setInterval(() => {
        this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")
        this.props.fetchGET(`/api/v1/conversations`, "FETCH_CONVERSATIONS")
      }, 1000)
      this.setState({ intervalMessages: intervalMessages })
    }

    const handlePin = () => {
      const newConfig = {
        config_conversation: {pin: !pin},
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
        config_conversation: {archived: !archived},
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
      <div className="col-md-3 white-box relative" style={{maxWidth: "294px"}}>
        <p className="absolute more-messagerie" onClick={openDropdown}>...</p>
        {this.state.opened ?
          <div className="absolute dropdown-tsmesmsg position-more">
            <p onClick={handlePin}>{pin ? "Enlever" : "Épingler"}</p>
            <p onClick={handleArchive}>{archived ? "Rétablir" : "Archiver"}</p>
          </div>
        : null}
        <div className="flex justify-center margin-bottom-30">
          {info.image != null ? <img className="photo-conv photo-conv-lg" src={info.image} alt="avatar"></img> : <div className="photo-conv photo-conv-lg">{info.full_name.slice(0, 1)}</div>}
        </div>
        <p className="participant-fullname margin-bottom-5">{info.full_name}</p>
        <p className="participant-job margin-bottom-5">{participant != undefined ? participant.job : ""}</p>
        {city != null ?
          <p className="participant-place"><FontAwesomeIcon icon={["fas", "map-marker-alt"]}/>{city}</p>
        : null }
        {relationship == "Accepter" || user_model === "Headhunter" && participant.user_model != "Talentist" ?
          <a className="profil-url margin-auto" href={info.profil_url}>
            <FontAwesomeIcon icon={["far", "user"]}/>
          </a>
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost, fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
