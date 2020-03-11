import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { nextGuideSu } from '../actions';

class messagebox extends Component {
  render () {
    const conversation = this.props.conversation
    const participant = conversation.participant
    const idActive = this.props.idActive
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
      <div className={`message-box${conversation.conversation_id == idActive ? " active" : ""}`} onClick={changeConv}>
        {infos.image != null ? <img className="photo-conv" src={infos.image} alt="avatar"></img> : <div className="photo-conv">{infos.full_name.slice(0, 1)}</div>}
        <div>
          <div className="flex space-between">
            <p className="no-margin messagebox-title flex-grow-1">{infos.full_name}</p>
            <p className="no-margin messageriebox-subtitle">{`5min`}</p>
          </div>
          <p className="messageriebox-subtitle">{participant.job}</p>
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
