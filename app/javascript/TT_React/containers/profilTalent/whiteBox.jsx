import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../../actions';
import setJobColor from '../../../components/setJobColor';

// import Navbar from '../containers/navbar'

class ProfilTalent extends Component {

  componentDidMount() {
    if(!this.props.jobs){
      this.props.fetchGET('/api/v1/jobs', "FETCH_JOBS")
    }
  }
  

  render () {
    let talent = this.props.talent
    let fullName = "Chargement...", image = null, firstname = " ", overview, city, experience, remuneration, availability, mobility, job, color, secteur
    if(talent){
      job = talent.jobs[0].title
      color = setJobColor(job, this.props.jobs)
      color.marginRight = "-20px"
      firstname = talent.talent.firstname
      fullName = `${firstname} ${talent.talent.last_name}`
      city = talent.talent.city
      experience = talent.job.year
      secteur = "❌ À définir ❌"
      remuneration = talent.next_aventure.remuneration
      availability = talent.next_aventure.availability
      mobility = talent.mobilities[0].title
    }

    return(
      <div className="profil-white-box col-md-3">
        <p className="card-job margin-left-auto" style={color}>{job}</p>
        {image != null ? 
          <img className="photo-conv photo-conv-lg" src={image} alt={values.photo.slice(12)}></img> 
          : 
          <div className="photo-conv photo-conv-lg">{firstname.slice(0, 1)}</div>
        }
        <h3>{fullName}</h3>
        <p>{overview ? overview : "❌ À renseigner ❌"}</p>
        <p className="margin-bottom-45 gray">{city}</p>

        <p className="criteres">Expérience</p>
        <p className="criteres-reponses">{`${experience} ${experience == 1 ? "an" : "ans"}`}</p>
        <p className="criteres">Secteur</p>
        <p className="criteres-reponses">{secteur}</p>
        <p className="criteres">Rémunération</p>
        <p className="criteres-reponses">{remuneration}</p>
        <p className="criteres">Disponibilité</p>
        <p className="criteres-reponses">{availability}</p>
        <p className="criteres">Mobilité</p>
        <p className="criteres-reponses">{mobility}</p>

        <button className="btn-gray-violet margin-top-60">Envoyer un message</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
    jobs: state.jobs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilTalent);
