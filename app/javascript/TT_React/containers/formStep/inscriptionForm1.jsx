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
      ville: ""
    }
  }
  

  render () {
    const step = this.props.stepForm
    const errors = this.props.errors

    // const handleClick = () => {
    //   this.props.switchStepFrom(step)
    // }

    return(
      <div className={`form-container${step == 2 ? " form-hidden" : ""}`}>
        <MessageMagda
          text1={`Bonjour ! Je suis Magdalena.
            5 minutes seront nécessaires pour remplir ce formulaire.
            L'objectif : permettre à notre équipe de mieux te connaître et de t'accompagner pour ta prochaine aventure.
            N'oublie pas ! Certaines de tes réponses seront masquées pour la start-up afin de garder ton anonymat.`}
          text2="On commence ? Dans quelle ville recherches-tu ?" />
        <div className="input-form w-input-form margin-left-55 margin-bottom-30">
          <label className="requis">Ville</label>    
          <AlgoliaPlaces
            placeholder='Paris, 15e arrondissement'
            options={{
              language: 'fr',
              type: 'city',
            }}
            onChange={({suggestion}) => {
              const ville = `${suggestion.name}, ${suggestion.country}`
              this.setState({ville: ville})
            }}
            onSuggestions={({query}) => 
              this.setState({ville: query})}
            onClear={() => 
              this.setState({ville: ""})}
          />
          {errors.city ? <p className="span-erreur">{errors.city}</p> : null}
        </div>
        <Field name="city">
          {props => <input name={props.input.name} type="hidden" onChange={props.input.onChange(this.state.ville)} />}
        </Field>
        <MessageMagda text1="La majorité de nos opportunités se trouvent à Paris. Mais nous recevons aussi des offres de la France entière."/>
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

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(mapStateToProps, null)(InscriptionForm1);
