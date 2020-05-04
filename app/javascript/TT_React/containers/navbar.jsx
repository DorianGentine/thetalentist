import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET, nextGuideSu, openModalTalent } from '../actions';
import mainLogo from'../../../assets/images/Logo The talentist-02.png';
import ModalGuide from './modalGuide'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      envelope: ["fas", "envelope-open"],
      chevron: ["fas", "chevron-down"],
      menuMobile: false,
    };
  }

  componentDidMount(){
    if(this.props.user == null){
      this.props.fetchGET('/api/v1/current_user', "FETCH_USER")
    }

    let enveloppeInterval = setInterval(() => {
      if(this.props.user){
        if(this.props.user.count_unread_message != 0){
          this.setState({envelope: ["fas", "envelope"]})
        }
        if(this.props.user.is_a_model == "Talentist"){
          this.props.fetchGET('/api/v1/notifications', "FETCH_NOTIFICATIONS")
        }
        clearInterval(enveloppeInterval);
      }
    }, 500)

    const url = new URL(window.location.href);
    const newMember = url.searchParams.get("query");
    if(newMember && this.props.path == "repertoire"){
      if(newMember == "new_member4"){
        let openModal = setInterval(() => {
          if(this.props.talents != null){
            this.props.openModalTalent(this.props.talents.talents[0])
            setTimeout(() => {
              this.props.nextGuideSu(3)
            }, 500);
            clearInterval(openModal);
          }
        }, 500)
      }else{
        this.props.nextGuideSu(0)
      }
    }
    if(newMember && this.props.path == "conv"){
      this.props.nextGuideSu(4)
    }
    if(newMember && this.props.path == "profil"){
      this.props.nextGuideSu(5)
      this.setState({chevron: ["fas", "chevron-up"]})
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.params != this.props.params){
      const url = new URL(window.location.href);
      const newMember = url.searchParams.get("query");
      if(newMember && this.props.path == "repertoire"){
        if(newMember == "new_member4"){
          let openModal = setInterval(() => {
            if(this.props.talents != null){
              this.props.openModalTalent(this.props.talents.talents[0])
              setTimeout(() => {
                this.props.nextGuideSu(3)
              }, 500);
              clearInterval(openModal);
            }
          }, 500)
        }else{
          this.props.nextGuideSu(0)
        }
      }
      if(newMember && this.props.path == "conv"){
        this.props.nextGuideSu(4)
      }
      if(newMember && this.props.path == "profil"){
        this.props.nextGuideSu(5)
        this.setState({chevron: ["fas", "chevron-up"]})
      }
    }
  }

  render () {
    const path = this.props.path
    let user, userType, userId, convUrl = "/conv", profilUrl = "/profil", firstName, fullName = "Test", image = null, unreadMessages, completing, notifications, pageReact = true
    if(this.props.user != null){
      user = this.props.user
      userType = user.is_a_model
      userId = user.id
      convUrl = user.url.conv
      profilUrl = user.url.profil
      firstName = user.firstname
      fullName = user.full_name
      image = user.photo
      unreadMessages = user.count_unread_message
      completing = user.completing
    }
    if(this.props.notifications.length != 0){
      notifications = this.props.notifications
      console.log(notifications)
    }
    if(path == "dashboardHeadhunter" || path == "dashboardTalent" || path == "profil"){
      pageReact = false
    }

    const toggleChevron = () => {
      if(this.state.chevron[1] == "chevron-down"){
        this.setState({chevron: ["fas", "chevron-up"]})
      }else{
        this.setState({chevron: ["fas", "chevron-down"]})
      }
    }

    const renderNotifications = () => notifications.reverse().map((notification, index) => {
      return <li className="relative" key={notification.id}>
        <p>{notification.title} <span className="notification-date">il y a {notification.created_at}</span></p>
      </li>
    })

    const openMenu = () => {
      this.setState(prevState => ({menuMobile: !prevState.menuMobile}))
    }

    return(
      <div className="navbar-wagon">
        <a href="/" className="navbar-talentist-logo">
          <img src={mainLogo} style={{height: "50px"}} alt="Logo talentist"/>
        </a>
        {this.props.isMobile ?
          <div>
            <FontAwesomeIcon className="white font-16" icon={["fas", "bars"]} onClick={openMenu}/>
            <div className={`menu-mobile${this.state.menuMobile ? "" : " hidden-menu"}`}>
              <a className="flex" href={userType != "Talentist" ? profilUrl : undefined}>
                {image != null ?
                  <img className="photo-conv" src={image} alt="avatar"></img>
                :
                  <div className="photo-conv">{fullName.slice(0, 1)}</div>
                }
                <p className="align-center no-margin">{`Hi,\u00a0${firstName}`}</p>
              </a>
              <hr className="ligne-horizontal"/>
              {userType != "Talentist" ? <a className="menu-mobile-link" href={profilUrl}>Mon&nbsp;profil</a> : null}
              <a className="menu-mobile-link flex space-between" href={convUrl}>
                Messagerie {unreadMessages != 0 ? <span className="progression-span">{unreadMessages}</span> : null}
              </a>
              {userType != "Talent" ?
                <div className="flex flex-column">
                  <hr className="ligne-horizontal"/>
                  <a className="menu-mobile-link" href="/repertoire">Répertoire</a>
                  {userType == "Talentist" ?
                    <div className="flex flex-column">
                      <a className="menu-mobile-link" href="/talents">Talents</a>
                      <a className="menu-mobile-link" href="/headhunters">Start-ups</a>
                      <a className="menu-mobile-link" href="/admin">Admin</a>
                    </div>
                  :null }
                </div>
              :null }
              <hr className="ligne-horizontal"/>
              <a className="menu-mobile-link" rel="nofollow" data-method="delete" href={userType == "Recruteur" ? "/headhunters/sign_out" : userType == "Talent" ? "/talents/sign_out" : "/talentists/sign_out"}>Déconnexion</a>

            </div>
          </div>
        :
          <div className="navbar-talentist-right">
            {userType == "Recruteur" ?
              <div className="flex align-items-center">
                {pageReact ?
                  <Link to="/repertoire?query=new_member" className="navbar-wagon-item navbar-wagon-link">
                    <FontAwesomeIcon icon={["far", "question-circle"]}/>
                  </Link>
                :
                  <a href="/repertoire?query=new_member" className="navbar-wagon-item navbar-wagon-link">
                    <FontAwesomeIcon icon={["far", "question-circle"]}/>
                  </a>
                }
                <div className="relative">
                  {pageReact ?
                    <Link className={`navbar-wagon-item navbar-wagon-link${path == "repertoire" ? " active" : ""}`} to="/repertoire">RÉPERTOIRE</Link>
                  :
                    <a className={`navbar-wagon-item navbar-wagon-link${path == "repertoire" ? " active" : ""}`} href="/repertoire">RÉPERTOIRE</a>
                  }
                  {this.props.guideSu == 1 ? <ModalGuide /> : null}
                </div>

                <hr className="ligne-vertical white-background margin-left-30 margin-right-30" style={{height: "30px"}} />
              </div>
            : userType == "Talentist" ?
              <div className="flex align-items-center">
                {pageReact ?
                  <Link className={`navbar-wagon-item navbar-wagon-link${path == "repertoire" ? " active" : ""}`} to="/repertoire">RÉPERTOIRE</Link>
                :
                  <a className={`navbar-wagon-item navbar-wagon-link${path == "repertoire" ? " active" : ""}`} href="/repertoire">RÉPERTOIRE</a>
                }
                <a className={`navbar-wagon-item navbar-wagon-link${path == "dashboardTalent" ? " active" : ""}`} href="/talents">TALENTS</a>
                <a className={`navbar-wagon-item navbar-wagon-link${path == "dashboardHeadhunter" ? " active" : ""}`} href="/headhunters">START-UPS</a>
                <a className="navbar-wagon-item navbar-wagon-link" href="/admin">ADMIN</a>
                <hr className="ligne-vertical white-background margin-left-30 margin-right-30" style={{height: "30px"}} />
              </div>
            : null}

            {userType == "Talentist" ?
              <div className="lien-messagerie relative dropdown">
                <p className="navbar-wagon-item navbar-wagon-link dropdown-toggle" id="navbar-wagon-menu" data-toggle="dropdown">
                  <FontAwesomeIcon icon={["fas", "chart-line"]}/>
                </p>
                <ul className="dropdown-menu navbar-wagon-dropdown-menu notifications-dropdown scroll">
                  {notifications != undefined ? renderNotifications() : null}
                </ul>
              </div>
            : null}
            <div className="lien-messagerie relative">
              {pageReact ?
                <Link className={`navbar-wagon-item navbar-wagon-link${path == "conv" ? " active" : ""}`} to={convUrl} disabled={convUrl == "/conv"}>
                  <FontAwesomeIcon icon={this.state.envelope}/>
                  {unreadMessages != 0 ?
                    <div className="notif" title={`${unreadMessages} non lus`}></div>
                  : null}
                </Link>
              :
                <a className={`navbar-wagon-item navbar-wagon-link${path == "conv" ? " active" : ""}`} href={convUrl} disabled={convUrl == "/conv"}>
                  <FontAwesomeIcon icon={this.state.envelope}/>
                  {unreadMessages != 0 ?
                    <div className="notif" title={`${unreadMessages} non lus`}></div>
                  : null}
                </a>
              }
              {this.props.guideSu == 5 ? <ModalGuide /> : null}
            </div>

            <div className="navbar-wagon-item" >
              <div className={`dropdown${this.props.guideSu == 6 ? " open" : ""}`} onClick={toggleChevron}>
                <div className="flex dropdown-toggle" id="navbar-wagon-menu" data-toggle="dropdown">
                  {image != null ?
                    <img className="photo-conv" src={image} alt="avatar"></img>
                  :
                    <div className="photo-conv">{fullName.slice(0, 1)}</div>
                  }
                  <p className="white align-center no-margin">{`Hi, ${firstName}`}</p>
                  <FontAwesomeIcon className="white align-center font-12 margin-left-5" icon={this.state.chevron}/>
                </div>
                <ul className="dropdown-menu dropdown-menu-right navbar-wagon-dropdown-menu">
                  {userType != "Talentist" ?
                    <li>
                      <a href={profilUrl} disabled={profilUrl == "/profil"} className={`navbar-wagon-item navbar-wagon-link flex space-between${path == "profil" ? " active" : ""}`}>
                        Mon profil {completing != 100 ? <span className={`progression-span${completing >= 85 ? " green-background" : ""}`}>{`${completing}%`}</span> : null }
                      </a>
                      {this.props.guideSu == 6 ? <ModalGuide /> : null}
                    </li>
                  : null }
                  {userType != "Talentist" ?
                  <li>
                    <a href={`${profilUrl}/edit`}>
                      Editer mon compte
                    </a>
                  </li>
                  : null }
                  {userType != "Talentist" ?
                  <li>
                    <a href={userType == "Recruteur" ? "/headhunters/edit" : userType == "Talent" ? "/talents/edit" : "talentists/edit"}>
                      Configuration
                    </a>
                  </li>
                  : null }
                  <li>
                    <a rel="nofollow" data-method="delete" href={userType == "Recruteur" ? "/headhunters/sign_out" : userType == "Talent" ? "/talents/sign_out" : "/talentists/sign_out"}>
                      Déconnexion
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
};



function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    guideSu: state.guideSu,
    isMobile: state.isMobile,
    user: state.user,
    talents: state.talents,
    notifications: state.notifications,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, nextGuideSu, openModalTalent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
