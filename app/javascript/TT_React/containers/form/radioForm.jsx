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
      <div className={`flex flex-wrap margin-bottom-30${this.props.isMobile ? "" : " margin-left-55"}`}>
        {renderFields()}
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

export default connect(mapStateToProps, null)(RadioForm);
