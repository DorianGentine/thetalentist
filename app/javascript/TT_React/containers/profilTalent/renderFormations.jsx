import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import Creatable from 'react-select/creatable';

import { fetchGET, fetchPost, updateTalent } from '../../actions';
// import setJobColor from '../../../components/setJobColor';

import RenderDatePicker from './renderDatePicker'
import SelectCritere from './selectCritere'

class RenderFormations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      add: false,
      deleted: false,
      deletedFormationsIds: []
    };
  }

  saveDeletedFormationId = (formation) => {
    let deletedFormationId = formation.id
    const othersIds = this.state.deletedFormationsIds
    othersIds.push(deletedFormationId)
    console.log('othersIds', othersIds)
    this.setState({
      FormationsIds: othersIds,
      deleted: true,
    })
  }

  componentDidMount() {
    if(!this.props.formations){
      this.props.fetchGET('/api/v1/formations', "FETCH_FORMATIONS")
    }
  }
  

  render () {
    let talent = this.props.talent
    let user = this.props.user
    let ecoles = this.props.formations
    if(ecoles){
      ecoles = ecoles.formations
    }
    let userModel, initialValues = {}
    if(user){
      userModel = user.is_a_model
    }
    let formations = []
    let formation = {}
    if(talent && ecoles){
      formations = talent.formations
      for (let i = 0; i < formations.length; i++) {
        const formation = formations[i];
        if(typeof formation.formation_id === "number"){
          formation.formation_id = ecoles.find(ecole => ecole.id === formation.formation_id)
        }
        if(typeof formation.year == "number"){
          formation.year = new Date(parseInt(formation.year), 0)
        }
      }
      initialValues = {
        talent_formations_attributes: formations
      }
      formation = {
        year: new Date(),
        formation_id: null,
        title: "",
        type_of_formation: null
      }
    }

    const addFormation = () => {
      formations.push(formation)
      initialValues = {
        talent_formations_attributes: formations
      }
      this.setState({add: !this.state.add})
    }
    const deleteFormation = index => {
      this.saveDeletedFormationId(formations[index])
      formations.splice(index, 1)
      initialValues = {
        talent_formations_attributes: formations
      }
      this.setState({add: !this.state.add})
    }


    const validate = values => {
      console.log('values', values)
      const errors = {}
      return errors
    }

    const valuesFilter = values => {
      const valuesToSend = {}
      const preValues = initialValues 
      if(this.state.deleted){
        valuesToSend.talent_formations_attributes = JSON.parse(JSON.stringify(values.talent_formations_attributes))
        for (let i = 0; i < this.state.deletedFormationsIds.length; i++) {
          const formationId = this.state.deletedFormationsIds[i];
          const deletedFormation = {
            id: formationId,
            _destroy: true
          }
          valuesToSend.talent_formations_attributes.push(deletedFormation)
        }
      }else{
        Object.keys(values).forEach(value => {
          if(preValues[value] !== values[value]){
            valuesToSend[value] = JSON.parse(JSON.stringify(values[value]))
          }
        })
      }

      if(valuesToSend.talent_formations_attributes){
        for (let i = 0; i < valuesToSend.talent_formations_attributes.length; i++) {
          const formation = valuesToSend.talent_formations_attributes[i];
          if (typeof formation.formation_id == "object") {
            formation.formation_id = formation.formation_id.id
          }
          delete formation.created_at
          delete formation.updated_at
          delete formation.ranking
          delete formation.talent_id
          delete formation.level
        }
      }
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

    const ReactSelectAdapter = ({ input, ...rest }) => {
      const isValidNewOption = (inputValue, selectValue, selectOptions) => {
        return false
      }
      return (
        <Creatable 
          {...input} 
          {...rest}
          closeMenuOnSelect={true}
          onChange={(value) => {
            input.onChange(value)
          }}
          getOptionLabel={option => option.title || option} 
          getOptionValue={option => option.id || option}
          getNewOptionData={(inputValue, optionLabel) => ({
            id: null,
            title: optionLabel,
          })}
          className="profil-multi-select"
          classNamePrefix="select-form"
          isValidNewOption={isValidNewOption}
        />
      )
    }

    const renderEditFormations = () => formations.map((formation, index) => {
      return(
        <div className="edit-gray-box-question row" key={index}>
          <div className="col-md-6">
            <p className="bold no-margin margin-top-15">Intitulé du diplôme</p>
            <Field name={`talent_formations_attributes[${index}].title`}>
              {({ input, meta }) => (
                <div>
                  <input {...input} type="text" className="edit-gray-box-input" />
                  {(meta.error || meta.submitError) && meta.touched && <p className="span-erreur">{(meta.error || meta.submitError)}</p>}
                </div>
              )}
            </Field>
          </div>
          <div className="col-md-6">
            <p className="bold no-margin margin-top-15">Nom de l'établissement</p>
            <Field
              name={`talent_formations_attributes[${index}].formation_id`}
              component={ReactSelectAdapter}
              options={ecoles}
            />
          </div>
          <div className="col-md-6">
            <p className="bold no-margin margin-top-15">Type d'établissement</p>
            <Field name={`talent_formations_attributes[${index}].type_of_formation`}>
              {({ input, meta }) => (
                <div>
                  <input {...input} type="text" className="edit-gray-box-input" />
                  {(meta.error || meta.submitError) && meta.touched && <p className="span-erreur">{(meta.error || meta.submitError)}</p>}
                </div>
              )}
            </Field>
          </div>
          <div className="col-md-3">
            <p className="bold no-margin margin-top-15">Année d'obtention</p>
            <RenderDatePicker name={`talent_formations_attributes[${index}].year`} showYearPicker={true} startDate={formation.year} />
          </div>
          <div className="col-md-3"></div>
          <div 
            className="btn-red-square margin-left-15 margin-top-15"
            onClick={() => deleteFormation(index)}
          >
            Supprimer
          </div>
        </div>
      )
    })

    const renderFormFormations = () => {
      return(
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              {this.state.add ? renderEditFormations() : renderEditFormations() }
              <p className="violet pointer" onClick={addFormation}>+ Ajouter une formation</p>
              <button 
                className="btn-gray-violet margin-top-60"
                >Enregistrer
              </button>
            </form>
          )}
        />
      )
    }

    const renderFormations = () => formations.map((formation, index) => {
      let formatted_date = formation.year.getFullYear()
      // if(formatted_date.length > 4){
      //   formatted_date = new Date(formatted_date).getFullYear()
      // }
      return(
        <div key={index} className="gray-box-question">
          <p className="bold">{formation.title}</p>
          <div className="flex">
            <FontAwesomeIcon icon={["fas", "suitcase"]} className="gray margin-right-15" />
            <p className="gray margin-right-30">{formation.formation_id && formation.formation_id.title ? formation.formation_id.title : formation.formation_id }</p>
            <FontAwesomeIcon icon={["fas", "calendar"]} className="gray margin-right-15" />
            <p className="gray margin-right-30">{formatted_date}</p>
          </div>
        </div>
      )
    })

    const handleClick = edit => {
      this.setState({edit: !this.state.edit})
    }

    return(
      <div className="gray-border-box">
        <div className="flex space-between">
          <h4 className="box-title">Mes formations antérieures</h4>
          {userModel == "Talent" ? <p className="pointer" onClick={handleClick}>Éditer</p> : null }
        </div>
        <h5 className="box-subtitle">{`${formations.length} formations`}</h5>
        <div>
          {this.state.edit ? renderFormFormations() : formations.length > 0 ? renderFormations() : null}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
    user: state.user,
    formations: state.formations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost, updateTalent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderFormations);
