import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import Creatable from 'react-select/creatable';

import { fetchGET, fetchPost } from '../../actions';
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
    let color = {backgroundColor: "#E5E6ED", color: "#273243"}
    
    if (this.props.color) {
      color = this.props.color
    }
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
        title: undefined,
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


    let disabled = {
      state: false,
      className: "btn-gray-violet margin-top-60",
      message: "Enregistrer"
    }
    const validate = values => {
      const errors = {}
      for (let i = 0; i < values.talent_formations_attributes.length; i++) {
        const formation = values.talent_formations_attributes[i];
        if (formation.formation_id != null && formation.title != undefined) {
          disabled.state = false
          disabled.className = "btn-gray-violet margin-top-60"
          disabled.message = "Enregistrer"
        }else if(formation.title == undefined ||
          formation.formation_id == null) {
            disabled.state = true
            disabled.className = "btn-gray-violet margin-top-60 red-background white not-allowed"
            disabled.message = `Tous les intitulés, noms d'établissements et années d'obtention doivent être remplis`
        }
      }

      return errors
    }

    const valuesFilter = values => {
      const valuesToSend = {}
      const preValues = initialValues
      if(this.state.deleted || preValues.talent_formations_attributes != values.talent_formations_attributes){
        valuesToSend.talent_formations_attributes = JSON.parse(JSON.stringify(values.talent_formations_attributes))
      } 
      if(this.state.deleted){
        for (let i = 0; i < this.state.deletedFormationsIds.length; i++) {
          const formationId = this.state.deletedFormationsIds[i];
          const deletedFormation = {
            id: formationId,
            _destroy: true
          }
          valuesToSend.talent_formations_attributes.push(deletedFormation)
        }
      }

      if(valuesToSend.talent_formations_attributes){
        for (let i = 0; i < valuesToSend.talent_formations_attributes.length; i++) {
          const formation = valuesToSend.talent_formations_attributes[i];
          if (typeof formation.formation_id == "object") {
            if(formation.formation_id.id != ""){
              formation.formation_id = formation.formation_id.id
            }else{
              formation.formation_id = formation.formation_id.title
            }
          }
          delete formation.created_at
          delete formation.updated_at
          delete formation.ranking
          delete formation.talent_id
          delete formation.level
        }
      }
      return valuesToSend
    }

    const onSubmit = values => {
      const valuesToSend = valuesFilter(values)
      if(Object.keys(valuesToSend).length > 0){
        fetch(`/api/v1/talents/${talent.talent.id}`, {method: "PATCH", body: JSON.stringify(valuesToSend), headers: { 'Content-Type': 'application/json'}})
          .then(r => {
            if(r.ok){
              this.props.fetchGET(`/api/v1/talents/${talent.talent.id}`, "FETCH_TALENT")
              this.setState({
                deleted: false,
                deletedExperiencesIds: [],
                edit: false
              })
              for (let i = 0; i < values.talent_formations_attributes.length; i++) {
                const formation = values.talent_formations_attributes[i];
                if(!formation.formation_id.id){
                  this.props.fetchGET('/api/v1/formations', "FETCH_FORMATIONS",
                    () => {this.props.fetchGET(`/api/v1/talents/${talent.talent.id}`, "FETCH_TALENT")}
                  )
                }
              }
            }
          })
      }
    }

    const ReactSelectAdapter = ({ input, ...rest }) => {
      const isValidNewOption = (inputValue, selectValue, selectOptions) => {
        if (
          inputValue.trim().length === 0 ||
          selectOptions.find(option => option.title === inputValue)
        ){
          return false;
        }
        return true;
      }
      return (
        <Creatable 
          {...input} 
          {...rest}
          closeMenuOnSelect={true}
          onChange={(value) => {
            input.onChange(value)
          }}
          getOptionLabel={option => option.title} 
          getOptionValue={option => option.id}
          getNewOptionData={(inputValue, optionLabel) => ({
            id: "",
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
                disabled={disabled.state}
                className={disabled.className}
                >{disabled.message}
              </button>
            </form>
          )}
        />
      )
    }

    const renderFormations = () => formations.map((formation, index) => {
      let formatted_date = formation.year
      if(typeof formatted_date == "Object"){
        formatted_date = formatted_date.getFullYear()
      }else{
        formatted_date = new Date(formatted_date).getFullYear()
      }
      return(
        <div key={index} className="gray-box-question">
          <p className="bold">{formation.title}</p>
          <div className="flex flex-wrap">
            <div className="flex">
              <FontAwesomeIcon icon={["fas", "suitcase"]} className="gray margin-right-15" />
              <p className="gray margin-right-30">{formation.formation_id && formation.formation_id.title ? formation.formation_id.title : formation.formation_id }</p>
            </div>
            <div className="flex">
              <FontAwesomeIcon icon={["fas", "calendar"]} className="gray margin-right-15" />
              <p className="gray margin-right-30">{formatted_date}</p>
            </div>
          </div>
        </div>
      )
    })

    const handleClick = edit => {
      this.setState({edit: !this.state.edit})
    }

    return(
      <div className="gray-border-box" style={{borderColor: color.backgroundColor}}>
        <div className="flex space-between">
          <h4 className="box-title">Mes formations antérieures</h4>
          {userModel == "Talent" ? 
            <div className="btn-expand-green" onClick={handleClick}>
              <span><FontAwesomeIcon className="white" icon={["fas", "pen"]}/></span>
            </div>
          : null }
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
  return bindActionCreators({ fetchGET, fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderFormations);
