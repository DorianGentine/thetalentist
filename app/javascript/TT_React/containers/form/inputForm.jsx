import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

class InputForm extends Component {
  render () {
    const isMobile = this.props.isMobile

    let classList = `input-form margin-bottom-30${isMobile ? "" : " w-input-form margin-left-55"}`
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

function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ switchStepFrom }, dispatch);
// }

export default connect(mapStateToProps, null)(InputForm);
