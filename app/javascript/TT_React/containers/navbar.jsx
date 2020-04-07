import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET, nextGuideSu } from '../actions';
import mainLogo from'../../../assets/images/Logo The talentist-02.png';
import ModalGuide from './modalGuide'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      envelope: ["fas", "envelope-open"],
      chevron: ["fas", "chevron-down"],
    };
  }

  componentDidMount(){
    this.props.fetchGET('/api/v1/current_user', "FETCH_USER")

    if(this.state.user && this.state.user.count_unread_message != 0){
      this.setState({envelope: ["fas", "envelope"]})
    }

    const url = new URL(window.location.href);
    const newMember = url.searchParams.get("query");
    if(newMember && this.props.path == "conv"){
      this.props.nextGuideSu(4)
    }
    if(newMember && this.props.path == "profil"){
      this.props.nextGuideSu(5)
      this.setState({chevron: ["fas", "chevron-up"]})
    }
  }

  render () {
    const path = this.props.path
    let user, userType, userId, convUrl, firstName, fullName, image = null, unreadMessages
    if(this.props.user != null){
      user = this.props.user
      userType = user.is_a_model
      userId = user.id
      convUrl = user.url.conv
      firstName = user.firstname
      fullName = user.full_name
      image = user.photo
      unreadMessages = user.count_unread_message
    }

    const toggleChevron = () => {
      if(this.state.chevron[1] == "chevron-down"){
        this.setState({chevron: ["fas", "chevron-up"]})
      }else{
        this.setState({chevron: ["fas", "chevron-down"]})
      }
    }
    // <p className="notif" title="Pensez à compléter votre profil !"></p>

    return(
      <div className="navbar-wagon">
        <a href="/" className="navbar-talentist-logo">
          <img src={mainLogo} style={{height: "50px"}} alt="Logo talentist"/>
        </a>
        {userType == "Recruteur" ?
          <div className="navbar-talentist-right hidden-xs hidden-sm">
            <a href="/repertoire?query=new_member" className="navbar-wagon-item navbar-wagon-link">
              <FontAwesomeIcon icon={["far", "question-circle"]}/>
            </a>
            <a className="navbar-wagon-item navbar-wagon-link" href="/repertoire">RÉPERTOIRE</a>

            <hr className="ligne-vertical white-background margin-left-30 margin-right-30" style={{height: "30px"}} />

            <div className="lien-messagerie relative">
              <a className={`navbar-wagon-item navbar-wagon-link${path == "conv" ? " active" : null}`} href={convUrl}>
                <FontAwesomeIcon icon={this.state.envelope}/>
                {unreadMessages != 0 ?
                  <div className="notif" title={`${unreadMessages} non lus`}></div>
                : null}
              </a>
              {this.props.guideSu == 5 ? <ModalGuide /> : null}
            </div>

            <div className="navbar-wagon-item" >
              <div className={`dropdown${this.props.guideSu == 6 ? " open" : ""}`} onClick={toggleChevron}>
                {image != null ?
                  <div className="flex dropdown-toggle" id="navbar-wagon-menu" data-toggle="dropdown">
                    <img className="photo-conv" src={image} alt="avatar"></img>
                    <p className="white align-center no-margin">{`Hi, ${firstName}`}</p>
                    <FontAwesomeIcon className="white align-center font-12 margin-left-5" icon={this.state.chevron}/>
                  </div>
                  :
                  <div className="flex dropdown-toggle" id="navbar-wagon-menu" data-toggle="dropdown">
                    <div className="photo-conv">{fullName.slice(0, 1)}</div>
                    <p className="white align-center no-margin">{`Hi, ${firstName}`}</p>
                    <FontAwesomeIcon className="white align-center font-12 margin-left-5" icon={this.state.chevron}/>
                  </div>
                }
                <ul className="dropdown-menu dropdown-menu-right navbar-wagon-dropdown-menu">
                  <li>
                    <a className={`navbar-wagon-item navbar-wagon-link${path == "profil" ? " active" : ""}`} href={`/headhunters/${userId}`}>
                      Mon profil
                    </a>
                    {this.props.guideSu == 6 ? <ModalGuide /> : null}
                  </li>
                  <li>
                    <a href={`/headhunters/${userId}/edit`}>
                      Editer mon compte
                    </a>
                  </li>
                  <li>
                    <a href="/headhunters/edit">
                      Configuration
                    </a>
                  </li>
                  <li>
                    <a rel="nofollow" data-method="delete" href="/headhunters/sign_out">
                      Déconnexion
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        : null}
      </div>
    );
  }
};



function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    guideSu: state.guideSu,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, nextGuideSu }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
