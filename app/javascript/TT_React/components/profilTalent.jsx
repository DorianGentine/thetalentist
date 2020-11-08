import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET } from '../actions';
import setJobColor from '../../components/setJobColor';

import Navbar from '../containers/navbar'
import WhiteBox from '../containers/profilTalent/whiteBox'
import ProchaineAventure from '../containers/profilTalent/prochaineAventure'
import ExperiencesProfessionnelles from '../containers/profilTalent/experiencesProfessionnelles'
import Formations from '../containers/profilTalent/formations'

class ProfilTalent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 0
    };
  }

  componentDidMount() {
    this.props.fetchGET(`/api/v1/talents/${this.props.match.params.id}`, "FETCH_TALENT")
    if(!this.props.formations){
      this.props.fetchGET('/api/v1/formations', "FETCH_FORMATIONS")
    }
    if(!this.props.jobs){
      this.props.fetchGET('/api/v1/jobs', "FETCH_JOBS")
    }
  }
  

  render () {
    const isMobile = this.props.isMobile
    const title = this.state.title
    const talent = this.props.talent
    let experiencesLength = 0, formationsLength = 0, validated, visible, color = {backgroundColor: "#E5E6ED", color: "#273243"}, job
    if(talent){
      experiencesLength = talent.experiences.length
      formationsLength = talent.formations.length
      validated = talent.talent.validated
      visible = talent.talent.visible
      job = talent.jobs[0] ? talent.jobs[0].title : "Non Défini"
      color = setJobColor(job, this.props.jobs)

    }
    let titles = [
      "Prochaine aventure",
      `${experiencesLength == 1 ? "Expérience professionnelle" : "Expériences professionnelles"} (${experiencesLength})`,
      `${formationsLength == 1 ? "Formation" : "Formations"} (${formationsLength})`
    ]
    if(isMobile){
      titles = [
        <FontAwesomeIcon className="violet" icon={["fas", "plane"]}/>,
        <FontAwesomeIcon className="violet" icon={["fas", "briefcase"]}/>,
        <FontAwesomeIcon className="violet" icon={["fas", "graduation-cap"]}/>
      ]
    }

    const handleTitle = index => {
      this.setState({title: index})
    }

    const renderTitles = titles => titles.map((titre, index) => 
      <p 
        key={index} 
        className={`section-title${index == title ? " active" : ""}`} 
        onClick={()=>{handleTitle(index)}}>
        {titre}
      </p>)

    return(
      <div>
        <Navbar path="profil" />
        {validated ? 
          visible ? 
            null 
          : 
            <div className="flex w-100 green-background white padding-10 justify-center align-items-center">
              Ton profil n'est pas visible par les Startups, profites-en pour l'étoffer 😉
            </div> 
        :
          <div className="flex w-100 green-background white padding-10 justify-center align-items-center">
            Ton profil n'a pas encore été validé par nos équipes, nous revenons vers toi dès que possible !
          </div> 
        }
        <div className="container-fluid" style={{padding: "20px"}}>
          <WhiteBox color={color} />
          <div className="col-md-9" style={isMobile ? {paddingTop: "20px"} : {padding: "40px 80px 0 60px"}}>
            <div className="flex">
              {renderTitles(titles)}
            </div>
            <hr className="ligne-horizontal no-margin margin-bottom-60"/>

            {title == 0 ? <ProchaineAventure color={color} /> : null }
            {title == 1 ? <ExperiencesProfessionnelles color={color} /> : null }
            {title == 2 ? <Formations color={color} /> : null }
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
    isMobile: state.isMobile,
    jobs: state.jobs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilTalent);
