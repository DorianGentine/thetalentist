import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import AlgoliaPlaces from 'algolia-places-react';

// import { switchStepFrom } from '../../actions';

import InputForm from '../form/inputForm'
import MessageMagda from './messageMagda'


class InscriptionForm1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ville: this.props.formValue.city,
      updated: true
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    const AlgoliaPlaces = document.getElementById('algolia-places')
    if(nextProps.formValue.city !== undefined && this.state.updated){
      AlgoliaPlaces.value = this.props.formValue.city
      this.setState({
        ville: nextProps.formValue.city,
        updated: false
      })
    }
    return true
  }
  

  render () {
    const step = this.props.stepForm
    const isMobile = this.props.isMobile

    const handleChange = (input) => {
      if(!this.state.updated){
        input.onChange(this.state.ville)
      }
    }

    return(
      <div className={`form-container${step == 2 ? " form-hidden" : ""}`}>
        <MessageMagda
          text1={`Bonjour ! Je suis Magdalena.
            5 minutes seront nécessaires pour remplir ce formulaire.
            L'objectif : permettre à notre équipe de mieux te connaître et de t'accompagner pour ta prochaine aventure.
            N'oublie pas : certaines de tes réponses seront masquées pour la start-up afin de garder ton anonymat.`}
          text2="On commence ? Dans quelle ville recherches-tu ?" />
        <div className={`input-form margin-bottom-30${isMobile ? "" : " w-input-form margin-left-55"}`}>
          <label>Ville</label>
          <AlgoliaPlaces
            placeholder= 'Indique ta ville ici...'
            id="algolia-places"
            options={{
              language: 'fr',
              type: 'city',
            }}
            onChange={({suggestion}) => {
              const ville = `${suggestion.name}, ${suggestion.country}`
              this.setState({ville: ville})
            }}
            onSuggestions={({query}) => {
              this.setState({ville: query})
            }}
            onClear={() => {
              this.setState({ville: ""})
            }}
          />
          <Field name="city" >
            {props => <input name={props.input.name} type="hidden" onChange={handleChange(props.input)} />}    
          </Field>
        </div>
        <MessageMagda text1="La majorité de nos opportunités se trouvent à Paris."/>
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.city == undefined}>
          Étape suivante
        </button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(mapStateToProps, null)(InscriptionForm1);
