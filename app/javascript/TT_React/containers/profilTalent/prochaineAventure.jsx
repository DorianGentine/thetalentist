import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET } from '../../actions';
// import setJobColor from '../../../components/setJobColor';

// import Navbar from '../containers/navbar'

class ProchaineAventure extends Component {

  render () {
    let talent = this.props.talent
    let questions = [], competences = [], knowns = [], waitingFors = []
    if(talent){
      questions = [
        {
          title: "Comment je vois mon métier",
          answer: talent.next_aventure.see_my_job
        },
        {
          title: "Un bon manager c'est",
          answer: talent.next_aventure.good_manager
        },
        {
          title: "Ce que je recherche",
          answer: talent.next_aventure.looking_for
        },
      ]
      competences = talent.skills
      knowns = talent.knowns
      if (talent.next_aventure.waiting_for_one){
        waitingFors[0] = talent.next_aventure.waiting_for_one
      }
      if (talent.next_aventure.waiting_for_two){
        waitingFors[1] = talent.next_aventure.waiting_for_two
      }
      if (talent.next_aventure.waiting_for_three){
        waitingFors[2] = talent.next_aventure.waiting_for_three
      }
    }

    const renderQuestions = () => questions.map((question, index) => {
      return(
        <div key={index} className="gray-box-question">
          <p className="bold">{question.title}</p>
          <p className="no-margin">{question.answer}</p>
        </div>
      )
    })

    const renderCompetences = () => competences.map((competence, index) => {
      return <p key={index} className="competence">{competence.title}</p>
    })
    
    const renderWaitingFors = () => waitingFors.map((waitingFor, index) => {
      return (
        <div key={index} className="waiting-for">
          <p className="wf-title">{`N°0${index + 1}`}</p>
          <p className="wf-text">{waitingFor}</p>
        </div>
      )
    })

    const renderKnowns = () => knowns.map((known, index) => {
      return <p key={index} className="competence">{known.title}</p>
    })

    return(
      <div>
        <div className="section-h3-wrap">
          <h3 className="section-h3">Prochaine aventure</h3>
          <span className="after"></span>
        </div>

        <div className="gray-border-box">
          <h4 className="box-title margin-bottom-30">{`${questions.length} questions qui me décrivent`}</h4>
          {questions.length > 0 ? renderQuestions() : null}
        </div>

        <div className="gray-border-box">
          <h4 className="box-title">Mes compétences clés</h4>
          <h5 className="box-subtitle">{`${competences.length} compétences listées`}</h5>
          <div className="flex flex-wrap">
            {competences.length > 0 ? renderCompetences() : null}
          </div>
        </div>

        <div className="gray-border-box">
          <h4 className="box-title margin-bottom-30">3 enjeux de mon environnement de travail</h4>
          <div className="flex" style={{margin: "0 -10px"}}>
            {waitingFors.length > 0 ? renderWaitingFors() : null}
          </div>
        </div>

        <div className="gray-border-box">
          <h4 className="box-title">Mes savoirs-êtres</h4>
          <h5 className="box-subtitle">{`${knowns.length} savoirs-êtres listés`}</h5>
          <div className="flex flex-wrap">
            {knowns.length > 0 ? renderKnowns() : null}
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

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(mapStateToProps, null)(ProchaineAventure);
