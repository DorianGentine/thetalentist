import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { closeModalTalent, fetchPost, fetchGET } from '../actions';

import ModalGuide from './modalGuide'

class ModalTalent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      icon: ["far", "bookmark"],
      relationship: false,
      value: false,
      message: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.modalOpened != nextProps.modalOpened && nextProps.modalOpened){
      this.setState({
        checked: nextProps.modalSelected.pin != false,
        relationship: nextProps.modalSelected.relationship,
        value: `${this.props.talents.user.firstname} souhaite rentrer en contact avec toi`,
      })
      if(nextProps.modalSelected.pin != false){
        this.setState({ icon: ["fas", "bookmark"] })
      }
    }
  }

  render () {
    if(this.props.modalOpened){
      const talent = this.props.modalSelected
      let color = {
        backgroundColor: "lightgray",
        color: "gray",
      }
      let jobs = this.props.jobs

      if(jobs != null){
        jobs = this.props.jobs.jobs
        if(talent.job.toLowerCase() === jobs[0].title.toLowerCase()){
          color = {
            backgroundColor: "#FCEBEB",
            color: "#FE7373",
          }
        }else if(talent.job.toLowerCase() === jobs[1].title.toLowerCase()){
          color = {
            backgroundColor: "#DFDEFE",
            color: "#5F5DDA",
          }
        }else if(talent.job.toLowerCase() === jobs[2].title.toLowerCase()){
          color = {
            backgroundColor: "#FFF7E2",
            color: "#FFAC4B",
          }
        }else if(talent.job.toLowerCase() === jobs[3].title.toLowerCase()){
          color = {
            backgroundColor: "#EDF4FE",
            color: "#6A9FE2",
          }
        }else if(talent.job.toLowerCase() === jobs[4].title.toLowerCase()){
          color = {
            backgroundColor: "#FCEBEB",
            color: "#FE7373",
          }
        }else if(talent.job.toLowerCase() === jobs[5].title.toLowerCase()){
          color = {
            backgroundColor: "#DFDEFE",
            color: "#5F5DDA",
          }
        }
      }

      window.onkeydown = (event) => {
        if (event.key === "Escape") {
          this.props.closeModalTalent()
        }
      };

      const toggleIcon = () => {
        if(this.state.checked){
          const url = `/api/v1/pins/${talent.pin}`
          this.props.fetchPost(url, null, "DELETE", this.props.fetchGET('/api/v1/talents/repertoire', "FETCH_TALENTS"))
          this.setState({
            checked: false,
            icon: ["far", "bookmark"]
          })
        }else{
          const pin = {
            talent_id: talent.id,
            headhunter_id: this.props.talents.user.id,
          }
          this.props.fetchPost(
            '/api/v1/pins',
            pin,
            "POST",
            this.props.fetchGET('/api/v1/talents/repertoire', "FETCH_TALENTS")
          )
          this.setState({
            checked: true,
            icon: ["fas", "bookmark"]
          })
        }
      }

      const addRelation = () => {
        if(!this.state.relationship){
          this.setState({
            message: !this.state.message
          })
        }else if(this.state.relationship === "Accepter" || this.state.relationship === "pending"){
          location.replace(`/${talent.relationship_url}`)
        }
      }

      const renderSectors = () => talent.sectors.map((sector, index) => {
        if(index === talent.sectors.length - 1 ){
          return <span key={index}>{sector.title}</span>
        }else{
          return <span key={index}>{sector.title}, </span>
        }
      })

      const renderFormations = () => talent.formations.map((formation, index) => {
        return(
          <div className="light-gray-background padding-10 margin-bottom-15" key={index}>
            <p className="no-margin dark-gray italic">{formation.year} • {formation.title}</p>
            <p className="no-margin dark-gray">{formation.type_of_formation} {formation.ranking}</p>
          </div>
        )
      })

      const renderExperiences = () => talent.experiences.map((experience, index) => {
        return(
          <div className="light-gray-background padding-10 margin-bottom-15" key={index}>
            <p className="no-margin dark-gray italic">{experience.position}</p>
            <p className="no-margin dark-gray">{experience.company_type}</p>
            <p className="no-margin dark-gray">{experience.starting} - {experience.currently ? experience.currently : experience.years}</p>
          </div>
        )
      })

      const renderSkills = () => talent.skills.map((skill, index) =>  <p className="small-plus" key={index}>{skill}</p>)

      const renderTools = () => talent.technos.map((techno, index) => <p className="small-plus" key={index}>{techno}</p>)

      const renderSmallPlus = () => talent.talent_small_plus.map((smallPlus, index) => <p className="small-plus" key={index}>{smallPlus}</p>)
      const renderKnowns = () => talent.knowns.map((known, index) => <p className="small-plus" key={index}>{known}</p>)

      const handleOnChange = value => {
        this.setState({ value: value })
      }

      const sendMessage = (event, onoff) => {
        event.preventDefault()
        if(onoff === "close"){
          this.setState({message: !this.state.message})
        }else if(onoff === "send"){
          const newRelationship = {
            headhunter_id: parseInt(this.props.talents.user.id, 10),
            talent_id: talent.id,
            message: document.getElementById('first_message').value
          }
          console.log(newRelationship)
          this.props.fetchPost("/api/v1/relationships", newRelationship, "POST", this.props.fetchGET('/api/v1/talents/repertoire', "FETCH_TALENTS"))
          this.setState({
            relationship: "pending",
            message: !this.state.message,
          })
        }
      }

      return(
        <div className='modal active'>
          <div className="close-modal" onClick={this.props.closeModalTalent}></div>
          <div className="modal-content-react">
            <div className={`flex align-items-center${this.props.guideSu == 4 ? " relative" : ""}`}>
              <p className="card-job margin-right-30" style={color}>{talent.job}</p>
              <div className="flex-grow-1">
                <p className="card-position">{talent.position}</p>
                <p className="card-formation">{talent.city}</p>
              </div>
              <FontAwesomeIcon className="card-bookmark margin-right-5" icon={this.state.icon} onClick={toggleIcon} />
              <p className="margin-right-30 no-margin pointer" onClick={toggleIcon}>Épingler ce talent</p>
              {this.props.guideSu == 4 ? <ModalGuide /> : null}
              <div className="add-user" style={!this.state.relationship ? {backgroundColor: "#000748"} : this.state.relationship === "pending" ? {backgroundColor: "#C9C9C9"} : {backgroundColor: "#4ECCA3"}} onClick={addRelation}>
                <FontAwesomeIcon className="add-user-icon margin-right-5" icon={!this.state.relationship ? ["fas", "user-plus"] : ["fas", "user-check"]}/>
                <p className="white no-margin">{!this.state.relationship ? "Contacter" : this.state.relationship === "pending" ? "En attente" : "Contacté"}</p>
              </div>
            </div>

            <form action="">
              <textarea
                name="first_message"
                id="first_message"
                rows="5"
                value={this.state.value}
                className={this.state.message ? "w-100" : "hidden"}
                onChange={(textarea) => {handleOnChange(textarea.target.value)}}>
              </textarea>
              <button onClick={event => {sendMessage(event, "close")}} className={this.state.message ? "btn-envoyer gray-background" : "hidden"}>Fermer</button>
              <button onClick={event => {sendMessage(event, "send")}} className={this.state.message ? "btn-envoyer" : "hidden"}>Envoyer</button>
            </form>

            <hr className="ligne-horizontal"/>

            <div className="flex align-items-center space-between">
              <p className="no-margin">Expérience : <strong>{talent.year_experience_job} {talent.year_experience_job === 1 ? "an" : "ans"}</strong></p>
              <p className="no-margin">Secteur : <strong>{renderSectors()}</strong></p>
              <p className="no-margin">Rémunération : <strong>{talent.next_aventure.remuneration}k/an</strong></p>
              <p className="no-margin">Disponibilité : <strong>{talent.next_aventure.availability}</strong></p>
            </div>

            <hr className="ligne-horizontal"/>

            <div className="container-fluid row">
              <div className="col-md-3">
                <p className="title-modal">Formations</p>
                <div>{renderFormations()}</div>
                <p className="title-modal">Expériences professionnelles</p>
                <div>{renderExperiences()}</div>
              </div>
              <div className="col-md-5">
                <p className="title-modal" style={{color: color.color}}>Ce que ce talent recherche</p>
                <p>{talent.next_aventure.looking_for}</p>
                <p className="title-modal" style={{color: color.color}}>Comment je vois mon métier</p>
                <p>{talent.next_aventure.good_manager}</p>
                <p className="title-modal" style={{color: color.color}}>Un bon manager selon ce talent</p>
                <p>{talent.next_aventure.good_manager}</p>
              </div>
              <div className="col-md-4 light-gray-background padding-30">
                <p className="title-modal">{talent.skills.length != 0 ? "Compétences clefs" : ""}</p>
                <div className="flex flex-wrap">{renderSkills()}</div>
                <p className="title-modal">{talent.technos.length != 0 ? "Outils" : ""}</p>
                <div className="flex flex-wrap">{renderTools()}</div>
                <p className="title-modal">{talent.knowns.length != 0 || talent.talent_small_plus.length != 0 ? "Savoir-être" : ""}</p>
                <div className="flex flex-wrap">{talent.knowns.length != 0 ? renderKnowns() : renderSmallPlus()}</div>
              </div>
            </div>



          </div>
        </div>
      );
    }else{
      return null
    }
  }
};

function mapStateToProps(state) {
  return {
    modalOpened: state.modalOpened,
    modalSelected: state.modalSelected,
    talents: state.talents,
    jobs: state.jobs,
    guideSu: state.guideSu,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModalTalent, fetchPost, fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalTalent);

// const share = () => {
//   const shareLink = document.getElementById("share-input");
//   console.log(shareLink.value)
//   shareLink.select()
//   shareLink.setSelectionRange(0, 99999)
//   document.execCommand("copy");
//   alert("Copied the text: " + shareLink.value);
// }
// <input type="text" className="hidden" id="share-input" defaultValue={`/repertoire/?talent=${talent.id}`}/>
// <FontAwesomeIcon className="margin-right-5 pointer" icon={["fas", "share-alt"]} />
// <p className="margin-right-30 no-margin pointer" onClick={share}>Partager</p>
