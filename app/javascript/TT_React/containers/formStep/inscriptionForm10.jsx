import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { switchStepFrom } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import SelectForm from '../form/selectForm'
import MessageMagda from './messageMagda'


class InscriptionForm10 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    }  
  }

  render () {
    const actualStep = this.props.stepForm

    return(
      <div className={setFormContainerClass(actualStep, 10)}>
        <MessageMagda
          text1={`Très bien ! Maintenant, peux-tu nous lister certains de tes savoir-être ? (Exemple: Curieux...)`}
        />
        <SelectForm 
          name="known_ids" 
          options={this.state.options} 
          placeholder="Rentre tes savoir-être..." 
          limit={10}
          formValue={this.props.formValue}
        />
        <MessageMagda
          text1={`N'hésites pas à mettre des éléments unique de ta personnalité, de ton caractère. Ils permettent de savoir comment tu peux evoluer au sein d'une équipe et d'une structure.`}
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

// function mapStateToProps(state) {
//   return {
//     stepForm: state.stepForm,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(null, null)(InscriptionForm10);
