import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { nextGuideSu } from '../actions';

class messagebox extends Component {
  render () {
    const conversation = this.props.conversation
    const participant = conversation.participant
    let infos = {
      full_name: "Talent",
      image: null,
    }
    if(conversation.in_relation == "Accepter"){
      infos = {
        full_name: participant.full_name,
        image: participant.avatar.url,
      }
    }

    const changeConv = () => {
      window.location.replace(`/conversations/${conversation.conversation_id}`)
    }

    return(
      <div className="message-box" onClick={changeConv}>
        {infos.image != null ? <img className="photo-conv" src={infos.image} alt="avatar"></img> : <div className="photo-conv">{infos.full_name.slice(0, 1)}</div>}
        <div>
          <p className="no-margin">{infos.full_name}</p>
          <p className="gray font-12 italic">{participant.job}</p>
          <p className="no-margin font-12">{conversation.sender === "Vous" ? "Vous : " : ""}{conversation.body}</p>
        </div>
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     guideSu: state.guideSu,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ nextGuideSu }, dispatch);
// }

export default connect(null, null)(messagebox);
