import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
      title: "Prochaine aventure"
    };
  }

  componentDidMount() {
    this.props.fetchGET(`/api/v1/talents/${this.props.match.params.id}`, "FETCH_TALENT")
    if(!this.props.formations){
      this.props.fetchGET('/api/v1/formations', "FETCH_FORMATIONS")
    }
  }
  

  render () {
    const title = this.state.title
    const talent = this.props.talent
    let experiencesLength = 0, formationsLength = 0
    if(talent){
      experiencesLength = talent.experiences.length
      formationsLength = talent.formations.length
    }
    const titles = [
      "Prochaine aventure",
      `Expériences professionnelles (${experiencesLength})`,
      `Formations (${formationsLength})`
    ]

    const handleTitle = title => {
      this.setState({title: title})
    }

    const renderTitles = titles => titles.map((titre, index) => 
      <p 
        key={index} 
        className={`section-title${titre.includes(title) ? " active" : ""}`} 
        onClick={()=>{handleTitle(titre)}}>
        {titre}
      </p>)

    return(
      <div>
        <Navbar path="profil" />
        <div className="container-fluid" style={{padding: "20px"}}>
          <WhiteBox />
          <div className="col-md-9" style={{padding: "40px 80px 0 60px"}}>
            <div className="flex">
              {renderTitles(titles)}
            </div>
            <hr className="ligne-horizontal no-margin margin-bottom-60"/>

            {titles[0].includes(title) ? <ProchaineAventure/> : null }
            {titles[1].includes(title) ? <ExperiencesProfessionnelles/> : null }
            {titles[2].includes(title) ? <Formations/> : null }
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilTalent);
