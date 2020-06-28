import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGET, fetchPost } from '../../actions';

import CheckBoxForm from '../form/checkBoxForm'

class RenderWaitingFors extends Component {
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
    let waitingFors = [], initialValues = {}
    const choices = [
      "Ambiance",
      "International",
      "Produit",
      "Rémunération",
      "Valeurs",
      "Sens",
      "Mission",
      "Management",
      "Impact",
      "Worklife balance"
    ]
    if(talent){
      if (talent.next_aventure.waiting_for_one){
        waitingFors[0] = talent.next_aventure.waiting_for_one
      }
      if (talent.next_aventure.waiting_for_two){
        waitingFors[1] = talent.next_aventure.waiting_for_two
      }
      if (talent.next_aventure.waiting_for_three){
        waitingFors[2] = talent.next_aventure.waiting_for_three
      }
      initialValues = {
        next_aventure_attributes: {
          id: talent.next_aventure.id,
          waiting_for_one: waitingFors
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
      const preValues = initialValues 
      Object.keys(values).forEach(value => {
        if(preValues[value] !== values[value]){
          valuesToSend[value] = JSON.parse(JSON.stringify(values[value]))
        }
      })
      // Met en page les waiting_for
      if(valuesToSend.next_aventure_attributes && valuesToSend.next_aventure_attributes.waiting_for_one.length > 0){
        const nAA = valuesToSend.next_aventure_attributes
        const waitingFor = valuesToSend.next_aventure_attributes.waiting_for_one
        nAA.waiting_for_three = waitingFor[2] || null
        nAA.waiting_for_two = waitingFor[1] || null
        nAA.waiting_for_one = waitingFor[0]
      }

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

    const renderWaitingFors = () => waitingFors.map((waitingFor, index) => {
      return (
        <div key={index} className="waiting-for">
          <p className="wf-title">{`N°0${index + 1}`}</p>
          <p className="wf-text">{waitingFor}</p>
        </div>
      )
    })

    const renderFormWaitingFors = () => {
      return(
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              <CheckBoxForm name="next_aventure_attributes[waiting_for_one]" 
                limit={3} 
                choices={choices} 
                formValue={values}
                noMargin55={true}
              />
              <button 
                className="btn-gray-violet "
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
      <div className="gray-border-box">
        <div className="flex space-between">
          <h4 className="box-title margin-bottom-30">3 enjeux de mon environnement de travail</h4>
          {userModel == "Talent" ? <p className="pointer" onClick={() => handleClick("questions")}>Éditer</p> : null }
        </div>
        {this.state.edit ? 
          renderFormWaitingFors()
        :
          <div className="flex" style={{margin: "0 -10px"}}>
            {waitingFors.length > 0 ? renderWaitingFors() : null}
          </div>
        }
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
    skills: state.skills,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderWaitingFors);
