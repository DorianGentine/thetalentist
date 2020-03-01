import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { nextGuideSu } from '../actions';

class messagebox extends Component {
  render () {
    const conversation = this.props.conversation
    const participant = conversation.participant
    return(
      <div className="message-box">
        <div className="photo-conv"></div>
        <div>
          <p className="no-margin">{participant.full_name}</p>
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
