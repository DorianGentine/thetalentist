import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET, } from '../actions';

import MessageBox from './messagebox'

class listmessagerie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      opened: false,
      chevron: ["fas", "chevron-down"],
      filterActive: "Tous mes messages"
    };
  }

  componentDidMount(){
    if(this.props.params.talent_id){
      this.props.fetchGET(`/api/v1/talents/${this.props.params.talent_id}/conversations`, "FETCH_CONVERSATIONS")
    }else if(this.props.params.headhunter_id){
      this.props.fetchGET(`/api/v1/headhunters/${this.props.params.headhunter_id}/conversations`, "FETCH_CONVERSATIONS")
    }else{
      this.props.fetchGET('/api/v1/conversations', "FETCH_CONVERSATIONS")
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.params.talent_id != this.props.params.talent_id ||
      nextProps.params.headhunter_id != this.props.params.headhunter_id){
      if(nextProps.params.talent_id){
        this.props.fetchGET(`/api/v1/talents/${nextProps.params.talent_id}/conversations`, "FETCH_CONVERSATIONS")
      }else if(nextProps.params.headhunter_id){
        this.props.fetchGET(`/api/v1/headhunters/${nextProps.params.headhunter_id}/conversations`, "FETCH_CONVERSATIONS")
      }else{
        this.props.fetchGET('/api/v1/conversations', "FETCH_CONVERSATIONS")
      }
    }
  }


  render () {
    const isMobile = this.props.isMobile
    const talentId = this.props.params.talent_id || false
    const headhunterId = this.props.params.headhunter_id || false
    const conversations = this.props.conversations
    const filterActive = this.state.filterActive

    const renderMessageBox = () => this.props.conversations.conversations.map((conversation, index) => {
      if(filterActive == "Tous mes messages" && conversation.archived == false ||
        filterActive == "Messages épinglés" && conversation.pin == true ||
        filterActive == "Messages archivés" && conversation.archived == true){
        if(this.state.value == "" ||
          conversation.participant.full_name.toLowerCase().includes(this.state.value.toLowerCase()) && conversation.in_relation == "Accepter"){
          return <MessageBox conversation={conversation} idActive={this.props.params.id} talentId={talentId} headhunterId={headhunterId} key={index} />
        }
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

    const filter = name => {
      this.setState({
        filterActive: name,
        opened: false,
        chevron: ["fas", "chevron-down"],
      })
    }

    return(
      <div className="col-md-4" style={isMobile ? {width: "100%"} : {maxWidth: "392px"}}>
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
        <div className={isMobile ? null : "border-lines-2"}>
          <div className={`relative${isMobile ? " margin-top-30" : ""}`}>
            <p className="tous-mes-messages" onClick={dropDown}>{filterActive} <span><FontAwesomeIcon icon={this.state.chevron}/></span></p>
            {this.state.opened ?
              <div className="absolute dropdown-tsmesmsg">
                <p className={filterActive == "Tous mes messages" ? "active" : ""} onClick={() => filter("Tous mes messages")}>Tous mes messages</p>
                <p className={filterActive == "Messages épinglés" ? "active" : ""} onClick={() => filter("Messages épinglés")}>Messages épinglés</p>
                <p className={filterActive == "Messages archivés" ? "active" : ""} onClick={() => filter("Messages archivés")}>Messages archivés</p>
              </div>
            : null}
          </div>
          <div className="scroll" style={isMobile ? {height: "calc(100vh - 277px)"} : {height: "calc(100vh - 354px)"}}>
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
    isMobile: state.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(listmessagerie);
