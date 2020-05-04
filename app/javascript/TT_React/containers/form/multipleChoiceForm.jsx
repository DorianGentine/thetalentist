import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from 'react-final-form';

class MultipleChoiceForm extends Component {
  render () {

    const renderFields = () => this.props.choices.map((choice, index) => {
      if(choice != undefined){
        return(
          <label className="checkbox-form" key={index}>
            <Field
              component="input"
              name={this.props.name}
              type="radio"
              value={choice}
            />
            <div className="check-form">
              {choice}
              <FontAwesomeIcon icon={["fas", "check"]}/>
            </div>
          </label>
        )
      }
    })

    return(
      <div className="flex margin-left-55 margin-bottom-30">
        {renderFields()}
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

export default connect(null, null)(MultipleChoiceForm);
