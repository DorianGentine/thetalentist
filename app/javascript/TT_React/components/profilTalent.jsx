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
      title: 0,
      talent: {
        job: null, 
        firstname: " ", 
        last_name: " ", 
        fullName: "Chargement...", 
        overview: null, 
        phone: null,
        linkedin: null,
        city: null, 
        image: null, 
        mobilitiesAnswerTitles: null, 
        secteurNames: null,  
        year: 0, 
        contrat: null, 
        languesNames: null, 
        talent_languages: null,
        talent_job_attributes: {
          id: null,
          job_id: null,
          year: 0,
        }, 
        next_aventure_attributes: {
          id: null,
          remuneration: [],
          availability: [],
          sectors: [],
          contrat: [],
          mobilities_attributes: [],
        },
      }
    };
  }

  setInitialValues = (talent) => {
    console.log('talent', talent)
    let overview = "❌ À renseigner ❌"
    if(talent.talent.overview){
      overview = talent.talent.overview
    }else if(talent.experiences.length != 0){
      overview = talent.experiences[0].position
    }
    const mobilities = talent.mobilities
    let mobilitiesTitles = []
    mobilities.map((mobility, index) => {
      mobilitiesTitles[index] = mobility.title
    })
    const mobilitiesAnswerTitles = `${mobilities[0] ? mobilities[0].title : ""}${mobilities[1] ? `, ${mobilities[1].title}` : ""}${mobilities[2] ? `, ${mobilities[2].title}` : ""}`

    this.setState({
      talent: {
        job: talent.jobs[0] ? talent.jobs[0].title : "Non Défini",
        firstname: talent.talent.firstname,
        last_name: talent.talent.last_name,
        fullName: `${talent.talent.firstname} ${talent.talent.last_name}`,
        phone: talent.talent.phone,
        linkedin: talent.talent.linkedin,
        overview: overview,
        city: talent.talent.city,
        year: talent.job ? talent.job.year : 0,
        image: talent.talent.photo.url,
        secteurNames: `${talent.sectors[0] ? talent.sectors[0].title : ""}${talent.sectors[1] ? `, ${talent.sectors[1].title}` : ""}${talent.sectors[2] ? `, ${talent.sectors[2].title}` : ""}`,
        mobilitiesAnswerTitles: mobilitiesAnswerTitles,
        next_aventure_attributes: {
          id: talent.next_aventure.id,
          remuneration: [talent.next_aventure.remuneration],
          availability: [talent.next_aventure.availability],
          sectors: talent.sectors,
          contrat: [talent.next_aventure.contrat],
          mobilities_attributes: mobilitiesTitles,
        },
      }
    })
  }

  setInitialLanguages = (talent, languages) => {
    const statedTalent = JSON.parse(JSON.stringify(this.state.talent))
    let languesNames, talent_languages
    if(talent.talent_languages && languages){
      for (let i = 0; i < talent.talent_languages.length; i++) {
        const language = talent.talent_languages[i];
        const langue = languages.find(l => language.language_id === l.id)
        language.title = langue.title
        languesNames = `${talent.talent_languages[0] ? talent.talent_languages[0].title : ""}${talent.talent_languages[1] ? `, ${talent.talent_languages[1].title}` : ""}${talent.talent_languages[2] ? `, ${talent.talent_languages[2].title}` : ""}`
        talent_languages = talent.talent_languages
      }
    }
    statedTalent.languesNames = languesNames
    statedTalent.talent_languages = talent_languages
    this.setState({
      talent: statedTalent
    })
  }
  
  setInitialJobs = (talent, jobs) => {
    const statedTalent = JSON.parse(JSON.stringify(this.state.talent))
    let jobId = talent.job ? talent.job.job_id : null
    if(jobs){
      jobId = jobs.jobs.find(job => job.id === jobId)
    }
    statedTalent.talent_job_attributes = {
      id: talent.job ? talent.job.id : null,
      job_id: jobId,
      year: talent.job ? talent.job.year : 0
    }
    this.setState({
      talent: statedTalent
    })
  }

  componentDidMount() {
    let talent
    this.props.fetchGET(`/api/v1/talents/${this.props.match.params.id}`, "FETCH_TALENT", promise => {
      talent = promise
      this.setInitialValues(talent)
      if(!this.props.formations){
        this.props.fetchGET('/api/v1/formations', "FETCH_FORMATIONS")
      }
      if(!this.props.jobs){
        this.props.fetchGET('/api/v1/jobs', "FETCH_JOBS", promise => {
          this.setInitialJobs(talent, promise)  
        })
      }else{
        this.setInitialJobs(talent, this.props.jobs)
      }
      if (!this.props.sectors) {
        this.props.fetchGET('/api/v1/sectors', "FETCH_SECTORS")
      }
      if (!this.props.languages) {
        this.props.fetchGET('/api/v1/languages', "FETCH_LANGUAGES", promise => {
          this.setInitialLanguages(talent, promise.languages)  
        })
      }else{
        this.setInitialLanguages(talent, this.props.languages.languages)
      }
    })
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
          <WhiteBox 
            color={color} 
            setInitialValues={this.setInitialValues} 
            setInitialJobs={this.setInitialJobs} 
            setInitialLanguages={this.setInitialLanguages} 
            testTalent={this.state.talent} 
            />
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
