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
      opened: false,
      chevron: ["fas", "chevron-down"],
    };
  }

  componentDidMount(){
    this.props.fetchGET(`/api/v1/conversations`, "FETCH_CONVERSATIONS")
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

    const dropDown = () => {
      if(this.state.opened){
        this.setState({
          opened: false,
          chevron: ["fas", "chevron-down"],
        })
      }else{
        this.setState({
          opened: true,
          chevron: ["fas", "chevron-up"],
        })
      }
    }

    return(
      <div className="col-md-4">
        <h3 className="messagerie-title">Messagerie</h3>
        <div className="input-icon no-background">
          <FontAwesomeIcon icon={["fas", "search"]}/>
          <input
            className="w-100"
            type="text"
            placeholder="rechercher"
            value={this.state.value}
            onChange={(input) => {handleOnChange(input.target.value)}}/>
        </div>
        <div className="border-lines-2">
          <p className="tous-mes-messages" onClick={dropDown}>Tous mes messages <span><FontAwesomeIcon icon={this.state.chevron}/></span></p>
          <div className="scroll" style={{height: "calc(100vh - 354px)"}}>
            {conversations != null && conversations.length != 0 ? renderMessageBox() : <p>Chargement...</p> }
          </div>
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
