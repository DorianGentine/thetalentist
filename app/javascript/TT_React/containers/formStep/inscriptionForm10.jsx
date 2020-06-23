import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import SelectForm from '../form/selectForm'
import MessageMagda from './messageMagda'


class InscriptionForm10 extends Component {
  componentDidMount(){
    if (this.props.knowns === null) {
      this.props.fetchGET('/api/v1/knowns', "FETCH_KNOWNS")
    }
  }


  render () {
    const actualStep = this.props.stepForm
    let knowns = this.props.knowns
    if(knowns != null){
      knowns = knowns.knowns
      knowns.map((known) => {
        known.label = known.title
        known.value = known.id
      })
    }

    return(
      <div className={setFormContainerClass(actualStep, 10)}>
        <MessageMagda
          text1={`Très bien ! Maintenant, peux-tu nous lister certains de tes savoir-être ? (Exemple: Curieux...)`}
          text3={"Tu peux en ajouter un en l’écrivant directement !"}
        />
        <SelectForm 
          name="known_ids" 
          options={knowns} 
          placeholder="Rentre tes savoir-être..." 
          limit={10}
          formValue={this.props.formValue}
        />
        <MessageMagda
          text1={`N'hésite pas à mettre des éléments unique de ta personnalité, de ton caractère. Ils permettent de savoir comment tu peux evoluer au sein d'une équipe et d'une structure.`}
        />
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.known_ids.length == 0}>
          Étape suivante
        </button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    knowns: state.knowns,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm10);
