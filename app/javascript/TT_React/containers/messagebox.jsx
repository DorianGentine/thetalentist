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
    const conversation = this.props.conversation
    const participant = conversation.participant
    const avatar = participant.avatar
    const idActive = this.props.idActive
    let infos = {
      full_name: "Talent",
      image: null,
    }

    let linkUrl = "/conv"
    if(isMobile){
      if(talentId){
       linkUrl = `/talents/${talentId}/conversations/${conversation.conversation_id}?messagerie=active`
      }else{
       linkUrl = `/conversations/${conversation.conversation_id}?messagerie=active`
      }
    }else{
      if(talentId){
        linkUrl = `/talents/${talentId}/conversations/${conversation.conversation_id}`
      }else{
        console.log(talentId)
        linkUrl = `/conversations/${conversation.conversation_id}`
      }
    }

    if(conversation.in_relation == "Accepter" || participant.user_model == "Headhunter"){
      infos = {
        full_name: participant.full_name,
        image: typeof avatar == "string" ? null : avatar.small_bright_face.url,
      }
    }

    return(
      <Link
        to={linkUrl}
        disabled={linkUrl == "/conv"}
        className={`message-box${conversation.conversation_id == idActive && !isMobile ? " active" : ""}`}>
        {infos.image != null ? <img className="photo-conv" src={infos.image} alt="avatar"></img> : <div className="photo-conv">{infos.full_name.slice(0, 1)}</div>}
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openMessagerie }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(messagebox);
