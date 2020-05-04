import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';

// import { fetchGET } from '../actions';

import NavbarForm from '../containers/navbarForm'
import InscriptionForm1 from '../containers/inscriptionForm1'
import InscriptionForm2 from '../containers/inscriptionForm2'

class InscriptionTalent extends Component {

  render () {
    const step = this.props.stepForm

    const onSubmit = value => {
      console.log(value)
    }

    const validate = value => {
      console.log("value:", value)
    }

    return(
      <div>
        <NavbarForm />
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, values }) => (
            <div className="flex">
              {step == 1 || step == 2 ? <InscriptionForm1 /> : null }
              {step >= 1 && step <= 3 ? <InscriptionForm2 formValue={values} /> : null }
            </div>
          )}
        />
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
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(mapStateToProps, null)(InscriptionTalent);
