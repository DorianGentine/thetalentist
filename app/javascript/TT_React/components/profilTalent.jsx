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
  }
  

  render () {
    const title = this.state.title
    const titles = [
      "Prochaine aventure",
      "Expériences professionnelles",
      "Formations"
    ]

    const handleTitle = title => {
      this.setState({title: title})
    }

    const renderTitles = titles => titles.map((titre, index) => 
      <p 
        key={index} 
        className={`section-title${title == titre ? " active" : ""}`} 
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

            {title == titles[0] ? <ProchaineAventure/> : null }
            {title == titles[1] ? <ExperiencesProfessionnelles/> : null }
            {title == titles[2] ? <Formations/> : null }
          </div>
        </div>
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     conversations: state.conversations,
//   };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(null, mapDispatchToProps)(ProfilTalent);
