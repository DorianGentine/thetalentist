import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET, fetchPost } from '../actions';
import { renderDate } from '../../components/renderDate';

// import Message from './message'

class Message extends Component {
  render () {
    const message = this.props.message
    const avatar = message.avatar
    const image = typeof avatar == "string" ? null : avatar.small_bright_face.url
    const attachment = this.props.attachment
    // const urlify = text => {
    //   let urlRegex = /(https?:\/\/[^\s]+)/g;
    //   return text.replace(urlRegex, function(url) {
    //     return '<a href="' + url + '">' + url + '</a>';
    //   })
    // }

    if(message.sender === "Vous"){
      return(
        <div className="col-md-offset-3 col-md-9 message-right-position margin-bottom-15">
          <div>
            <div className="message-right">
              <p>{message.sender_name}</p>
              {attachment ? 
                <a className="no-margin" href={attachment.url} target="-blank">{attachment.name}</a>
              : 
                <p className="no-margin">{message.body}</p>
              }
            </div>
            <p className="message-date">{renderDate(message.update_at, "ddd_mmm_hhhh")}</p>
          </div>
          {image != null ? <img className="photo-conv photo-conv-small" style={{marginBottom: "16px"}} src={image} alt={message.sender_name}></img> : <div className="photo-conv photo-conv-small" style={{marginBottom: "16px"}}>{message.sender_name.slice(0, 1)}</div>}
        </div>
      )
    }else{
      return(
        <div className="col-md-9 message-left-position margin-bottom-15">
          {image != null ? <img className="photo-conv photo-conv-small" style={{marginBottom: "16px"}} src={image} alt={message.sender_name}></img> : <div className="photo-conv photo-conv-small" style={{marginBottom: "16px"}}>{message.sender_name.slice(0, 1)}</div>}
          <div>
            <div className="message-left">
              <p className="black">{message.sender_name}</p>
              {attachment ? 
                <a className="no-margin" href={attachment.url} target="-blank">{attachment.name}</a>
              : 
                <p className="no-margin">{message.body}</p>
              }
            </div>
            <p className="message-date">{renderDate(message.update_at, "ddd_mmm_hhhh")}</p>
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
