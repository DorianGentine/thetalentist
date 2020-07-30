import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class InputForm extends Component {
  render () {

    let classList = "input-form w-input-form margin-left-55 margin-bottom-30"
    if(this.props.classList){
      classList = `input-form ${this.props.classList}`
    }

    return(
      <Field name={this.props.name}>
        {({ input, meta }) => (
          <div className={classList}>
            <label className="requis">{this.props.title}</label>
            <input {...input} type={this.props.type || "text"} placeholder={this.props.placeholder} />
            {(meta.error || meta.submitError) && meta.touched && <p className="span-erreur">{(meta.error || meta.submitError)}</p>}
          </div>
        )}
      </Field>
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

// export default connect(null, null)(InputForm);
export default InputForm;