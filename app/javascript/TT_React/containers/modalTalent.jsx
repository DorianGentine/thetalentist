import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { closeModalTalent, fetchPost, fetchGET } from '../actions';

class ModalTalent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      icon: ["far", "bookmark"],
      relationship: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.modalOpened != nextProps.modalOpened && nextProps.modalOpened){
      this.setState({
        checked: nextProps.modalSelected.pin != false,
        relationship: nextProps.modalSelected.relationship,
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
            headhunter_id: this.props.headhunterId,
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
          const newRelationship = {
            headhunter_id: parseInt(this.props.headhunterId, 10),
            talent_id: talent.id,
          }
          this.props.fetchPost("/api/v1/relationships", newRelationship, "POST", this.props.fetchGET('/api/v1/talents/repertoire', "FETCH_TALENTS"))
          this.setState({
            relationship: true
          })
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

      const renderBehaviours = () => talent.talent_small_plus.map((smallPlu, index) => <p className="small-plus" key={index}>{smallPlu}</p>)

      const share = () => {
        const shareLink = document.getElementById("share-input");
        console.log(shareLink.value)
        shareLink.select()
        shareLink.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alert("Copied the text: " + shareLink.value);
      }

              // <input type="text" className="hidden" id="share-input" defaultValue={`/repertoire/?talent=${talent.id}`}/>
              // <FontAwesomeIcon className="margin-right-5 pointer" icon={["fas", "share-alt"]} />
              // <p className="margin-right-30 no-margin pointer" onClick={share}>Partager</p>
      return(
        <div className='modal active'>
          <div className="close-modal" onClick={this.props.closeModalTalent}></div>
          <div className="modal-content-react">
            <div className="flex align-items-center">
              <p className="card-job margin-right-30" style={color}>{talent.job}</p>
              <div className="flex-grow-1">
                <p className="card-position">{talent.position}</p>
                <p className="card-formation">{talent.city}</p>
              </div>
              <FontAwesomeIcon className="card-bookmark margin-right-5" icon={this.state.icon} onClick={toggleIcon} />
              <p className="margin-right-30 no-margin pointer" onClick={toggleIcon}>Épingler ce talent</p>
              <div className="add-user" style={!this.state.relationship ? {backgroundColor: "#000748"} : {backgroundColor: "#4ECCA3"}} onClick={addRelation}>
                <FontAwesomeIcon className="add-user-icon" icon={!this.state.relationship ? ["fas", "user-plus"] : ["fas", "user-check"]}/>
              </div>
            </div>

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
                <p className="title-modal">Ce que ce talent recherche</p>
                <p>{talent.next_aventure.looking_for}</p>
                <p className="title-modal">Comment je vois mon métier</p>
                <p>{talent.next_aventure.good_manager}</p>
                <p className="title-modal">Un bon manager selon ce talent</p>
                <p>{talent.next_aventure.good_manager}</p>
              </div>
              <div className="col-md-4 light-gray-background padding-30">
                <p className="title-modal">Compétences clefs</p>
                <div className="flex flex-wrap">{renderSkills()}</div>
                <p className="title-modal">Outils</p>
                <div className="flex flex-wrap">{renderTools()}</div>
                <p className="title-modal">Savoir-être</p>
                <div className="flex flex-wrap">{renderBehaviours()}</div>
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
    headhunterId: state.headhunterId,
    jobs: state.jobs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModalTalent, fetchPost, fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalTalent);
