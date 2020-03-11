import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { fetchGET, fetchPost } from '../actions';

class Conversation extends Component {
  render () {
    const conversationActive = this.props.conversationActive.conversation
    let participant, relationship, email
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
      email = conversationActive.email
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

    // {relationship == "Accepter" && participant.user_model != "Talentist" ?
    //   <a className="profil-url" href={info.profil_url}>
    //     <FontAwesomeIcon icon={["far", "user"]}/>
    //   </a>
    // : ""}

   return(
      <div className="col-md-3 white-box">
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
    );
  }
};

function mapStateToProps(state) {
  return {
    conversationActive: state.conversationActive,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET, fetchPost }, dispatch);
// }

export default connect(mapStateToProps, null)(Conversation);
