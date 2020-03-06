import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET } from '../actions';

import MessageBox from './messagebox'

class listmessagerie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
    };
  }

  componentDidMount(){
    this.props.fetchGET(`/api/v1/conversations/${this.props.params.id}/left`, "FETCH_CONVERSATIONS")
  }

  render () {
    const conversations = this.props.conversations

    const renderMessageBox = () => this.props.conversations.conversations.map((conversation, index) => {
      if(this.state.value == "" ||
        conversation.participant.full_name.toLowerCase().includes(this.state.value.toLowerCase()) && conversation.in_relation == "Accepter"){
        return <MessageBox conversation={conversation} idActive={this.props.params.id} key={index} />
      }
    })

    const handleOnChange = value => {
      this.setState({ value: value })
    }

    return(
      <div className="col-md-3">
        <div className="input-icon">
          <FontAwesomeIcon icon={["fas", "search"]}/>
          <input
            className="w-100"
            type="text"
            placeholder="rechercher"
            value={this.state.value}
            onChange={(input) => {handleOnChange(input.target.value)}}/>
        </div>
        <hr className="ligne-horizontal"/>
        <p>Tous mes messages</p>
        <div className="scroll" style={{maxHeight: "calc(100vh - 310px)"}}>
          {conversations.length != 0 ? renderMessageBox() : <p>Chargement...</p> }
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(listmessagerie);
