import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET, fetchPost } from '../actions';

import Message from './message'
import SendBox from './sendbox'

class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
    };
  }

  componentDidMount(){
    this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}`, "FETCH_CONVERSATION_ACTIVE")

    const objDiv = document.getElementById("messages-box");
    setTimeout( () => {
      console.log(objDiv.scrollHeight)
      objDiv.scrollTop = objDiv.scrollHeight
    }, 1000);
  }

  render () {
    const conversationActive = this.props.conversationActive.conversation
    let participant, relationship
    let info = {
      image: null,
      full_name: "Talent",
      answer_1: "Tu n'y as pas encore accès",
      answer_2: "Tu n'y as pas encore accès",
      answer_3: "Tu n'y as pas encore accès",
      profil_url: "",
      // phone: null,
    }

    if(conversationActive != undefined){
      participant = conversationActive.participant
      relationship = conversationActive.in_relation
      if(relationship == "Accepter"){
        info = {
          image: participant.avatar.url,
          full_name: participant.full_name,
          answer_1: participant.answer_1,
          answer_2: participant.answer_2,
          answer_3: participant.answer_3,
          profil_url: participant.profil_url,
          // phone: participant.phone,
        }
      }
    }

    const renderMessages = () => {
      if(this.state.newMessage){
        return this.state.messages.map((message, index) => <Message key={index} message={message} />)
      }else{
        return conversationActive.messages.reverse().map((message, index) => <Message key={index} message={message} />)
      }
    }

    return(
      <div className="col-md-9">
        <div className="flex align-items-center">
          {info.image != null ? <img className="photo-conv" src={info.image} alt="avatar"></img> : <div className="photo-conv">{info.full_name.slice(0, 1)}</div>}
          <div className="flex-grow-1">
            <p className="bold no-margin">{info.full_name}</p>
            <p className="no-margin"><span className="green">•</span> En ligne</p>
          </div>
          {relationship == "Accepter" && participant.user_model != "Talentist" ?
            <a className="profil-url" href={info.profil_url}>
              <FontAwesomeIcon icon={["far", "user"]}/>
            </a>
          : ""}
        </div>
        <hr className="ligne-horizontal" style={{ marginBottom: "0" }}/>
        <div className="row">
          <div className="col-md-8">
            <div id="messages-box">
              {conversationActive != undefined ? renderMessages() : <p>Chargement...</p>}
            </div>

            <SendBox params={this.props.params} />
          </div>
          <div className="col-md-4 padding-vertical-30">
            <div className="flex justify-center margin-bottom-30">
              {info.image != null ? <img className="photo-conv photo-conv-lg" src={info.image} alt="avatar"></img> : <div className="photo-conv photo-conv-lg">{info.full_name.slice(0, 1)}</div>}
            </div>
            <p className="text-align-center font-16">{info.full_name}</p>
            <p className="gray text-align-center font-16">{participant != undefined ? participant.job : ""}</p>
            <hr className="ligne-horizontal margin-top-30 margin-bottom-30"/>
            {relationship != "Accepter" ? null :
              <div>
                <p className="criteres">{participant != undefined ? participant.test_1 : ""}</p>
                <p className="criteres-reponses">{info.answer_1}</p>
                <p className="criteres">{participant != undefined ? participant.test_2 : ""}</p>
                <p className="criteres-reponses">{info.answer_2}</p>
                <p className="criteres">{participant != undefined ? participant.test_3 : ""}</p>
                <p className="criteres-reponses">{info.answer_3}</p>
              </div>
            }
            <p className="font-16 margin-top-30">Documents échangés</p>
            <hr className="ligne-horizontal"/>
          </div>
        </div>

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
