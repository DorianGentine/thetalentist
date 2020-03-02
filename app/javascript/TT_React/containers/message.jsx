import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET, fetchPost } from '../actions';

// import Message from './message'

class Message extends Component {
  render () {
    const message = this.props.message
    const image = message.avatar.url

    if(message.sender === "Vous"){
      return(
        <div className="col-md-offset-3 col-md-9 message-right-position margin-bottom-15">
          <div className="message-right">
            <p>{message.sender_name}</p>
            <p className="no-margin">{message.body}</p>
          </div>
          {image != null ? <img className="photo-conv photo-conv-small" src={image} alt={message.sender_name}></img> : <div className="photo-conv photo-conv-small">{message.sender_name.slice(0, 1)}</div>}
        </div>
      )
    }else{
      return(
        <div className="col-md-9 message-left-position margin-bottom-15">
          {image != null ? <img className="photo-conv photo-conv-small" src={image} alt={message.sender_name}></img> : <div className="photo-conv photo-conv-small">{message.sender_name.slice(0, 1)}</div>}
          <div className="message-left">
            <p className="black">{message.sender_name}</p>
            <p className="no-margin">{message.body}</p>
          </div>
        </div>
      )
    }
  }
};

// function mapStateToProps(state) {
//   return {
//     conversationActive: state.conversationActive,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET, fetchPost }, dispatch);
// }

export default connect(null, null)(Message);
