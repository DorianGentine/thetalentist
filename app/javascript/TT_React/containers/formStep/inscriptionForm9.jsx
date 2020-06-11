import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import SelectForm from '../form/selectForm'
import MessageMagda from './messageMagda'


class InscriptionForm9 extends Component {
  componentDidMount(){
    if (this.props.skills === null) {
      this.props.fetchGET('/api/v1/skills', "FETCH_SKILLS")
    }
  }

  render () {
    const actualStep = this.props.stepForm
    let skills = this.props.skills
    if(skills != null){
      skills = skills.skills
      skills.map((skill, index) => {
        skill.label = skill.title
        skill.value = skill.id
      })
    }

    return(
      <div className={setFormContainerClass(actualStep, 9)}>
        <MessageMagda
          text1={`Merci ! On va bientôt pouvoir examiner ton profil !`}
          text2={`Peux tu nous lister quelques-unes de tes compétences clés, qui font de toi un vrai pro dans ton métier ?`}
          text3={"Astuce: tu peux rajouter librement ce qui te passe par la tête en l'écrivant directement"}
        />
        <SelectForm 
          name="skill_ids" 
          options={skills} 
          placeholder="Rentre tes compétences clés..." 
          limit={10}
          formValue={this.props.formValue}
        />
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.skill_ids.length == 0}>
          Étape suivante
        </button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    skills: state.skills,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm9);
