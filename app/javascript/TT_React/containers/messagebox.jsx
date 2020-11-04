import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { openMessagerie } from '../actions';
import { diffTime } from '../../components/renderDate';

class messagebox extends Component {
  render () {
    const isMobile = this.props.isMobile
    const talentId = this.props.talentId
    const headhunterId = this.props.headhunterId
    const conversation = this.props.conversation
    const participant = conversation.participant
    const avatar = participant.avatar
    const idActive = this.props.idActive
    const startup = participant.startup
    let infos = {
      full_name: "Talent",
      image: null,
    }
    

    let linkUrl = "/conv"
    if(isMobile){
      if(talentId){
       linkUrl = `/talents/${talentId}/conversations/${conversation.conversation_id}?messagerie=active`
      }else if(headhunterId){
       linkUrl = `/talents/${talentId}/conversations/${conversation.conversation_id}?messagerie=active`
      }else{
       linkUrl = `/conversations/${conversation.conversation_id}?messagerie=active`
      }
    }else{
      if(talentId){
        linkUrl = `/talents/${talentId}/conversations/${conversation.conversation_id}`
      }else if(headhunterId){
        linkUrl = `/headhunters/${headhunterId}/conversations/${conversation.conversation_id}`
      }else{
        linkUrl = `/conversations/${conversation.conversation_id}`
      }
    }

    if(conversation.in_relation == "Accepter" || participant.user_model == "Headhunter"){
      infos = {
        full_name: participant.full_name,
        image: typeof avatar == "string" ? null : avatar.small_bright_face.url,
      }
    }
    if(conversation.in_relation != "Accepter" && this.props.user.is_a_model == "Talentist"){
      infos = {
        image: typeof avatar == "string" ? null : avatar.small_bright_face.url,
        full_name: `Talent - (${participant.full_name})`,
      }
    }

    const renderAvatar = () => {
      return (
        <div className="photo-conv" style={{backgroundImage: `url(${infos.image})`}}>
          <p>{infos.image ? "" : infos.full_name.slice(0, 1)}</p>
          {!startup ? null :
            <div className="logo-su-conv" style={{backgroundImage: `url(${startup.logo.small_bright_face.url})`}}>
              {startup.logo.url ? "" : startup.name.slice(0,1)}
            </div>
          }
        </div> 
      )
    }

    return(
      <Link
        to={linkUrl}
        disabled={linkUrl == "/conv"}
        className={`message-box${conversation.conversation_id == idActive && !isMobile ? " active" : ""}`}>
        {renderAvatar()}
        <div className="flex-grow-1">
          <div className="flex space-between">
            <div className="flex flex-grow-1">
              <p className="no-margin messagebox-title">{infos.full_name}</p>
              {conversation.pin ? <FontAwesomeIcon className="card-bookmark margin-left-5" icon={["fas", "bookmark"]} /> : null}
            </div>
            <p className="no-margin messageriebox-subtitle">{diffTime(conversation.update_at)}</p>
          </div>
          <p className="messageriebox-subtitle">{participant.job}</p>
          <p className={`no-margin font-12${conversation.unread ? " bold" : ""}`}>{conversation.sender === "Vous" ? "Vous : " : ""}{conversation.body.length > 50 ? `${conversation.body.slice(0, 50)}...` : conversation.body}</p>
        </div>
      </Link>
    );
  }
};

function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
    messagerieActiveMobile: state.messagerieActiveMobile,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openMessagerie }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(messagebox);
