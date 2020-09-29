import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchPost, updateTalent } from '../../actions';

class ProchaineAventure extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    };
  }

  render () {
    let talent = this.props.talent
    let user = this.props.user
    let userModel
    if(user){
      userModel = user.is_a_model
    }
    let questions = [], initialValues = {}
    let color = {backgroundColor: "#E5E6ED", color: "#273243"}
    if (this.props.color) {
      color = this.props.color
    }
    if(talent){
      questions = [
        {
          title: "Comment je vois mon métier",
          value: talent.next_aventure.see_my_job,
          name: "next_aventure_attributes[see_my_job]"
        },
        {
          title: "Un bon manager c'est",
          value: talent.next_aventure.good_manager,
          name: "next_aventure_attributes[good_manager]"
        },
        {
          title: "Ce que je recherche",
          value: talent.next_aventure.looking_for,
          name: "next_aventure_attributes[looking_for]"
        },
        {
          title: "Ma plus grande fierté",
          value: talent.next_aventure.proud,
          name: "next_aventure_attributes[proud]"
        }
      ]
      initialValues = {
        next_aventure_attributes: {
          id: talent.next_aventure.id,
          see_my_job: talent.next_aventure.see_my_job,
          good_manager: talent.next_aventure.good_manager,
          looking_for: talent.next_aventure.looking_for,
          proud: talent.next_aventure.proud
        }
      }
    }

    const validate = values => {
      console.log('values', values)
      const errors = {}
      return errors
    }

    const valuesFilter = values => {
      const valuesToSend = {}
      const postValues = initialValues 
      Object.keys(values).forEach(value => {
        if(postValues[value] !== values[value]){
          valuesToSend[value] = JSON.parse(JSON.stringify(values[value]))
        }
      })

      this.props.updateTalent(this.props.talent, valuesToSend, values)
      initialValues = values
      return valuesToSend
    }

    const onSubmit = values => {
      const valuesToSend = valuesFilter(values)
      console.log('valuesToSend', valuesToSend)
      if(Object.keys(valuesToSend).length > 0){
        this.props.fetchPost(`/api/v1/talents/${talent.talent.id}`, valuesToSend, "PATCH")
      }
      this.setState({edit: false})
    }

    const renderQuestions = () => questions.map((question, index) => {
      return(
        <div key={index} className="gray-box-question">
          <p className="bold">{question.title}</p>
          <p className="no-margin">{question.value}</p>
        </div>
      )
    })
    const renderEditQuestions = () => questions.map((question, index) => {
      return(
        <div key={index} className="gray-box-question">
          <p className="bold">{question.title}</p>
          <Field
            component="textarea"
            className="textarea-form"
            rows="3"
            maxLength={question.maxlength}
            name={question.name}
            placeholder={question.placeholder}
          />
        </div>
      )
    })
    const renderFormQuestions = () => {
      return(
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              {renderEditQuestions()}
              <button 
                className="btn-gray-violet margin-top-60"
                >Enregistrer
              </button>
            </form>
          )}
        />
      )
    }

    const handleClick = edit => {
      this.setState({edit: !this.state.edit})
    }
    
    return(
      <div className="gray-border-box" style={{borderColor: color.backgroundColor}}>
        <div className="flex space-between">
          <h4 className="box-title margin-bottom-30">{`${questions.length} questions qui me décrivent`}</h4>
          {userModel == "Talent" ? 
            <div className="btn-expand-green" onClick={() => handleClick("questions")}>
              <span><FontAwesomeIcon className="white" icon={["fas", "pen"]}/></span>
            </div>
          : null }
        </div>
        {questions.length > 0 ? this.state.edit ? renderFormQuestions() : renderQuestions() : null}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost, updateTalent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProchaineAventure);
