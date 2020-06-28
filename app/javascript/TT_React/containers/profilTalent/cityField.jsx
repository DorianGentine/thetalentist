import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import AlgoliaPlaces from 'algolia-places-react';

// import { switchStepFrom } from '../../actions';

// import MessageMagda from './messageMagda'


class CityField extends Component {
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
    const handleChange = (input) => {
      if(!this.state.updated){
        input.onChange(this.state.ville)
      }
    }

    return(
      <div>
        <p className="criteres">Ville</p>
        <AlgoliaPlaces
          placeholder= 'Paris, 15e arrondissement'
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

export default connect(null, null)(CityField);
