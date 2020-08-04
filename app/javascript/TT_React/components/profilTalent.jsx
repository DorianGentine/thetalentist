import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET } from '../actions';

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
  }
  

  render () {
    const isMobile = this.props.isMobile
    const title = this.state.title
    const talent = this.props.talent
    let experiencesLength = 0, formationsLength = 0
    if(talent){
      experiencesLength = talent.experiences.length
      formationsLength = talent.formations.length
    }
    let titles = [
      "Prochaine aventure",
      `Expériences professionnelles (${experiencesLength})`,
      `Formations (${formationsLength})`
    ]
    if(isMobile){
      titles = [
        <FontAwesomeIcon className="violet" icon={["fas", "plane"]}/>,
        <FontAwesomeIcon className="violet" icon={["fas", "briefcase"]}/>,
        <FontAwesomeIcon className="violet" icon={["fas", "graduation-cap"]}/>
      ]
    }

    const handleTitle = index => {
      console.log('index', index)
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
        <div className="container-fluid" style={{padding: "20px"}}>
          <WhiteBox />
          <div className="col-md-9" style={isMobile ? {paddingTop: "20px"} : {padding: "40px 80px 0 60px"}}>
            <div className="flex">
              {renderTitles(titles)}
            </div>
            <hr className="ligne-horizontal no-margin margin-bottom-60"/>

            {title == 0 ? <ProchaineAventure/> : null }
            {title == 1 ? <ExperiencesProfessionnelles/> : null }
            {title == 2 ? <Formations/> : null }
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilTalent);
