import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from 'react-final-form';

class RadioForm extends Component {
  render () {

    const renderFields = () => this.props.choices.map((choice, index) => {
      if(choice != undefined){
        return(
          <label className="checkbox-form" key={index}>
            <Field
              component="input"
              type="radio"
              name={this.props.name}
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
      <div className="flex flex-wrap margin-left-55 margin-bottom-30">
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

export default connect(null, null)(RadioForm);
