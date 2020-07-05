import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import SelectForm from '../form/selectForm'
import MessageMagda from './messageMagda'


class InscriptionForm9 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'Mangue', label: 'Mangue' },
        { value: 'Citron', label: 'Citron' },
        { value: 'Orange', label: 'Orange' },
        { value: 'Tomate', label: 'Tomate' },
        { value: 'Chou', label: 'Chou' },
        { value: 'Salade', label: 'Salade' },
        { value: 'Thé', label: 'Thé' },
        { value: 'Matcha', label: 'Matcha' },
        { value: 'Soja', label: 'Soja' },
        { value: 'Piment', label: 'Piment' },
        { value: 'Banane', label: 'Banane' },
        { value: 'Ail', label: 'Ail' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    }  
  }


  render () {
    const actualStep = this.props.stepForm

    return(
      <div className={setFormContainerClass(actualStep, 9)}>
        <MessageMagda
          text1={`Merci ! On va bientôt pouvoir examiner ton profil !`}
          text2={`Peux tu nous lister quelques-unes de tes compétences clés, qui font de toi un vrai pro dans ton métier ?`}
        />
        <SelectForm 
          name="skill_ids" 
          options={this.state.options} 
          placeholder="Rentre tes compétences clés..." 
          limit={10}
          formValue={this.props.formValue}
        />
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting}>
          Étape suivante
        </button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    stepForm: state.stepForm,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm9);
