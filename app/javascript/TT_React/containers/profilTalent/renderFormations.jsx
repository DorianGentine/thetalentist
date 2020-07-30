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
    // let ecoles = {
    //   formations: [
    //     {id: 3793, title: "ESCEM", created_at: "2019-12-10T09:01:41.023Z", updated_at: "2019-12-10T11:22:59.493Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3790, title: "Technion", created_at: "2019-12-05T22:41:00.780Z", updated_at: "2019-12-10T11:23:23.250Z", type_of_formation: "Formation en technologies"},
    //     {id: 3792, title: "Cesacom", created_at: "2019-12-07T04:42:31.069Z", updated_at: "2019-12-10T11:23:38.494Z", type_of_formation: "Ecole de communication"},
    //     {id: 3794, title: "Université Rennes 1", created_at: "2019-12-17T10:32:35.248Z", updated_at: "2019-12-17T14:45:59.270Z", type_of_formation: "Formation en economie "},
    //     {id: 3320, title: " Massachusetts Institute of Technology", created_at: "2018-10-18T07:10:43.006Z", updated_at: "2019-12-18T09:18:28.476Z", type_of_formation: "Formation en technologies"},
    //     {id: 3795, title: "Ecole Centrale Paris", created_at: "2019-12-17T21:38:46.074Z", updated_at: "2019-12-18T09:18:34.806Z", type_of_formation: "Ecole d'ingénieur"},
    //     {id: 3222, title: " Tecnológico de Monterrey", created_at: "2018-10-18T07:10:42.312Z", updated_at: "2020-03-19T17:15:26.964Z", type_of_formation: "Ecole d'ingénieur"},
    //     {id: 3797, title: "ecole de commerce de Tou", created_at: "2019-12-19T08:35:07.400Z", updated_at: "2019-12-19T14:10:28.109Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3852, title: "Agrosup", created_at: "2020-02-26T10:26:02.224Z", updated_at: "2020-03-19T17:16:34.154Z", type_of_formation: "Formation en agronomie"},
    //     {id: 3470, title: " IUT (Institut Universitaire de Technologie)", created_at: "2018-10-18T07:10:44.003Z", updated_at: "2020-03-19T17:16:40.652Z", type_of_formation: "Formation en gestion"},
    //     {id: 3854, title: "Mbway", created_at: "2020-03-05T11:00:59.046Z", updated_at: "2020-03-19T17:17:05.903Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3798, title: "Maison d'Education de la Légion d'Honneur", created_at: "2020-01-05T20:27:43.464Z", updated_at: "2020-01-07T11:25:55.356Z", type_of_formation: "Commerce"},
    //     {id: 3796, title: "Mastère spécialié", created_at: "2019-12-19T08:34:40.555Z", updated_at: "2020-01-10T11:41:55.763Z", type_of_formation: "Product"},
    //     {id: 3566, title: " Télécom Ecole de Management", created_at: "2018-10-18T07:10:44.487Z", updated_at: "2020-01-15T15:01:43.617Z", type_of_formation: "Seo"},
    //     {id: 3809, title: "zerg", created_at: "2020-01-21T11:58:24.967Z", updated_at: "2020-01-21T11:58:24.967Z", type_of_formation: null},
    //     {id: 3799, title: "Ecole Hôteliere de Lausanne", created_at: "2020-01-08T10:04:06.976Z", updated_at: "2020-01-22T14:11:55.448Z", type_of_formation: "Formation hotelière"},
    //     {id: 3800, title: "Pescara", created_at: "2020-01-08T16:12:08.310Z", updated_at: "2020-01-22T14:12:21.641Z", type_of_formation: "Forma"},
    //     {id: 3855, title: "UBS", created_at: "2020-03-06T05:50:58.539Z", updated_at: "2020-03-19T17:17:34.257Z", type_of_formation: "Formation en ingéniérie"},
    //     {id: 3856, title: "IFAE", created_at: "2020-03-10T10:45:52.473Z", updated_at: "2020-03-19T17:19:24.980Z", type_of_formation: "Formation en ingénieurie"},
    //     {id: 3804, title: "IHECF", created_at: "2020-01-12T20:38:10.991Z", updated_at: "2020-01-22T14:17:02.393Z", type_of_formation: "Formation en comptabilité"},
    //     {id: 3313, title: " Université Grenoble Alpes", created_at: "2018-10-18T07:10:42.973Z", updated_at: "2020-03-19T17:20:04.679Z", type_of_formation: "Formation en economie"},
    //     {id: 3803, title: "CRA", created_at: "2020-01-10T15:06:53.327Z", updated_at: "2020-02-10T11:29:12.201Z", type_of_formation: "Cardiologs"},
    //     {id: 3865, title: "Supoptique", created_at: "2020-04-27T08:42:44.301Z", updated_at: "2020-07-16T08:54:34.818Z", type_of_formation: ""},
    //     {id: 3857, title: "Aftec", created_at: "2020-03-10T10:45:52.479Z", updated_at: "2020-03-19T17:20:33.201Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3850, title: "ISGP", created_at: "2020-02-20T16:44:24.476Z", updated_at: "2020-03-19T17:22:16.490Z", type_of_formation: "Formation en gestion"},
    //     {id: 3851, title: "PSB", created_at: "2020-02-24T09:29:58.637Z", updated_at: "2020-03-19T17:22:19.119Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3805, title: "Université Gaston Berger", created_at: "2020-01-12T22:06:19.969Z", updated_at: "2020-02-19T14:54:22.841Z", type_of_formation: "Formation en economie "},
    //     {id: 3806, title: "EIML Paris", created_at: "2020-01-14T17:33:51.702Z", updated_at: "2020-02-19T14:54:41.938Z", type_of_formation: "Ecole de marketing"},
    //     {id: 3807, title: "Université lille III", created_at: "2020-01-20T10:15:59.236Z", updated_at: "2020-02-19T14:54:45.380Z", type_of_formation: "Formation en economie "},
    //     {id: 3810, title: "ESLSCA", created_at: "2020-01-21T18:57:36.968Z", updated_at: "2020-02-19T14:54:56.561Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3178, title: " Arts et Métiers ParisTech - École Nationale Supérieure d'Arts et Métiers", created_at: "2018-10-18T07:10:42.006Z", updated_at: "2020-02-19T14:55:20.645Z", type_of_formation: "Ecole d'ingénieur"},
    //     {id: 3808, title: "ESDES", created_at: "2020-01-20T10:57:44.848Z", updated_at: "2020-02-19T16:25:40.855Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3863, title: "EPHEC", created_at: "2020-04-22T14:20:31.258Z", updated_at: "2020-06-05T14:49:11.502Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3632, title: " Fudan University", created_at: "2018-10-18T07:10:44.941Z", updated_at: "2020-02-19T16:43:13.393Z", type_of_formation: "Formation en economie "},
    //     {id: 3845, title: "Vatel Brussels", created_at: "2020-02-17T11:40:49.995Z", updated_at: "2020-02-19T16:43:57.898Z", type_of_formation: "Formation en hotellerie"},
    //     {id: 3846, title: "ESC Rennes", created_at: "2020-02-17T18:57:21.567Z", updated_at: "2020-02-19T16:44:00.910Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3849, title: "Institut des médias", created_at: "2020-02-19T11:13:51.972Z", updated_at: "2020-02-19T16:44:15.086Z", type_of_formation: "Formation en journalisme"},
    //     {id: 3848, title: "IUT Amiens", created_at: "2020-02-18T09:57:58.023Z", updated_at: "2020-03-19T17:25:13.610Z", type_of_formation: "Formation technologique"},
    //     {id: 3844, title: "Cifacom", created_at: "2020-02-07T15:59:54.131Z", updated_at: "2020-03-19T17:14:21.679Z", type_of_formation: "Formation en graphisme et audiovisuel"},
    //     {id: 3847, title: "IAE d'Amiens", created_at: "2020-02-18T09:57:40.291Z", updated_at: "2020-03-19T17:14:49.400Z", type_of_formation: "Formation en gestion"},
    //     {id: 3858, title: "ISEG", created_at: "2020-03-23T14:08:35.799Z", updated_at: "2020-04-09T16:58:07.612Z", type_of_formation: "Ecole de marketing"},
    //     {id: 3116, title: " Ecole nationale supérieure des Télécommunications de Bretagne / ENST Bretagne", created_at: "2018-10-18T07:10:41.597Z", updated_at: "2020-04-09T16:58:36.955Z", type_of_formation: "Ecole de communication"},
    //     {id: 3615, title: " Northwestern University - Kellogg School of Management", created_at: "2018-10-18T07:10:44.783Z", updated_at: "2020-04-09T16:58:45.673Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3466, title: " Royal Holloway", created_at: "2018-10-18T07:10:43.978Z", updated_at: "2020-04-22T11:15:59.850Z", type_of_formation: "Formation en economie"},
    //     {id: 3859, title: "NEOMA BUSINESS SCHOOL", created_at: "2020-04-19T06:46:15.815Z", updated_at: "2020-04-22T11:16:03.466Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3861, title: "Sport Management School", created_at: "2020-04-21T10:06:43.210Z", updated_at: "2020-04-22T11:16:08.298Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3860, title: "Université Paris 10 Nanterre", created_at: "2020-04-21T08:40:48.866Z", updated_at: "2020-04-22T11:18:08.790Z", type_of_formation: "Formation en economie"},
    //     {id: 3868, title: "Sciences Po Toulouse", created_at: "2020-05-04T12:57:55.305Z", updated_at: "2020-06-05T14:49:25.583Z", type_of_formation: "Ecole d'ingénieur"},
    //     {id: 3870, title: "Master RH", created_at: "2020-05-05T10:46:23.744Z", updated_at: "2020-06-05T14:49:43.196Z", type_of_formation: "Formation en ressources humaines"},
    //     {id: 3864, title: "ETS PARIS", created_at: "2020-04-24T09:34:03.360Z", updated_at: "2020-04-30T14:50:26.977Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3323, title: " Ecole de Management de Normandie", created_at: "2018-10-18T07:10:43.018Z", updated_at: "2020-04-30T14:50:29.605Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3866, title: "fghjk", created_at: "2020-04-27T14:03:47.783Z", updated_at: "2020-04-30T14:50:32.588Z", type_of_formation: ""},
    //     {id: 3867, title: "EPH", created_at: "2020-04-29T10:02:11.828Z", updated_at: "2020-04-30T14:50:56.346Z", type_of_formation: "Ecole de communication"},
    //     {id: 3906, title: "HEC Paris", created_at: "2020-05-10T16:43:07.969Z", updated_at: "2020-05-10T16:43:07.969Z", type_of_formation: null},
    //     {id: 3811, title: "siadep", created_at: "2020-01-23T09:53:56.351Z", updated_at: "2020-05-22T13:40:03.029Z", type_of_formation: "Seo"},
    //     {id: 3915, title: "Master", created_at: "2020-05-22T14:57:15.046Z", updated_at: "2020-05-22T14:57:15.046Z", type_of_formation: null},
    //     {id: 3862, title: "CREPS", created_at: "2020-04-21T10:06:54.547Z", updated_at: "2020-06-05T14:48:55.135Z", type_of_formation: "Formation sportive"},
    //     {id: 3871, title: "ISEE", created_at: "2020-05-06T16:26:49.633Z", updated_at: "2020-06-05T14:49:58.088Z", type_of_formation: "Formation en economie"},
    //     {id: 3905, title: "Ecole Polytechnique Fédérale de Lausanne", created_at: "2020-05-10T16:42:31.226Z", updated_at: "2020-06-05T14:50:12.637Z", type_of_formation: "Ecole d'ingénieur"},
    //     {id: 3907, title: "Le Laptop", created_at: "2020-05-12T09:26:54.480Z", updated_at: "2020-06-05T14:50:37.463Z", type_of_formation: "Formation en ux"},
    //     {id: 3908, title: "Estienne", created_at: "2020-05-12T09:28:12.340Z", updated_at: "2020-06-05T14:50:54.037Z", type_of_formation: ""},
    //     {id: 3910, title: "université Paris 5", created_at: "2020-05-14T14:54:27.577Z", updated_at: "2020-06-05T14:51:14.281Z", type_of_formation: "Formation en economie"},
    //     {id: 3918, title: "brighton university", created_at: "2020-06-08T10:05:19.300Z", updated_at: "2020-06-08T10:05:19.300Z", type_of_formation: null},
    //     {id: 3920, title: "Brighton University", created_at: "2020-06-10T20:56:35.200Z", updated_at: "2020-06-10T20:56:35.200Z", type_of_formation: null},
    //     {id: 3926, title: "Itescia", created_at: "2020-07-02T20:35:02.799Z", updated_at: "2020-07-02T20:35:02.799Z", type_of_formation: null},
    //     {id: 3869, title: "ENSEIRB-MATMECA", created_at: "2020-05-04T20:04:49.438Z", updated_at: "2020-07-16T08:54:40.055Z", type_of_formation: ""},
    //     {id: 3872, title: "INEE", created_at: "2020-05-06T16:33:00.202Z", updated_at: "2020-07-16T08:54:46.265Z", type_of_formation: ""},
    //     {id: 3909, title: "ecole supérieur d'hôtelleries", created_at: "2020-05-13T15:14:52.421Z", updated_at: "2020-07-16T08:55:11.815Z", type_of_formation: "Ecole hotelière"},
    //     {id: 3911, title: "EFAB", created_at: "2020-05-15T14:45:43.082Z", updated_at: "2020-07-16T08:55:13.115Z", type_of_formation: ""},
    //     {id: 3913, title: "burgundy school of business", created_at: "2020-05-20T09:26:35.248Z", updated_at: "2020-07-16T08:55:21.330Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3914, title: "Master E-business & E-marketing", created_at: "2020-05-21T14:30:15.592Z", updated_at: "2020-07-16T08:55:24.679Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3916, title: "Licence", created_at: "2020-05-22T14:57:15.054Z", updated_at: "2020-07-16T08:55:26.005Z", type_of_formation: ""},
    //     {id: 3919, title: "Ecoris", created_at: "2020-06-09T08:01:18.580Z", updated_at: "2020-07-16T08:55:31.843Z", type_of_formation: ""},
    //     {id: 3921, title: "Télécom Paris", created_at: "2020-06-11T22:08:45.219Z", updated_at: "2020-07-16T08:55:35.122Z", type_of_formation: ""},
    //     {id: 3922, title: "ESADE", created_at: "2020-06-14T17:48:45.956Z", updated_at: "2020-07-16T08:55:36.142Z", type_of_formation: ""},
    //     {id: 3923, title: "isep", created_at: "2020-06-22T07:07:45.868Z", updated_at: "2020-07-16T08:55:42.196Z", type_of_formation: ""},
    //     {id: 3924, title: "Icademie", created_at: "2020-06-29T16:58:36.308Z", updated_at: "2020-07-16T08:55:43.928Z", type_of_formation: ""},
    //     {id: 3925, title: "ESTACA", created_at: "2020-06-29T17:05:02.333Z", updated_at: "2020-07-16T08:55:51.540Z", type_of_formation: "Ecole d'ingénieur"},
    //     {id: 3853, title: "Maîtrise", created_at: "2020-02-26T14:32:31.038Z", updated_at: "2020-07-09T12:51:44.967Z", type_of_formation: "Ux "},
    //     {id: 3928, title: "Lycée Louise Weiss", created_at: "2020-07-15T16:12:50.895Z", updated_at: "2020-07-15T16:12:50.895Z", type_of_formation: null},
    //     {id: 3912, title: "Université Strasbourg", created_at: "2020-05-18T11:41:05.565Z", updated_at: "2020-07-16T08:55:18.399Z", type_of_formation: ""},
    //     {id: 3917, title: "University of St Andrews", created_at: "2020-06-02T18:43:11.480Z", updated_at: "2020-07-16T08:55:27.760Z", type_of_formation: ""},
    //     {id: 3227, title: " ESC Amiens", created_at: "2018-10-18T07:10:42.335Z", updated_at: "2020-07-16T08:55:30.933Z", type_of_formation: "Ecole de commerce"},
    //     {id: 3190, title: " Efrei - Ecole d'ingénieur généraliste en informatique et technologies du numérique", created_at: "2018-10-18T07:10:42.129Z", updated_at: "2020-07-16T08:55:40.539Z", type_of_formation: "Ecole d'ingénieur"},
    //     {id: 3927, title: "Institut Supérieur Vidal", created_at: "2020-07-03T09:41:18.948Z", updated_at: "2020-07-16T08:55:53.122Z", type_of_formation: ""},
    //     {id: 3929, title: "IIM", created_at: "2020-07-15T16:13:06.648Z", updated_at: "2020-07-16T08:55:54.925Z", type_of_formation: ""},
    // ]}

    if(ecoles){
      console.log('ecoles', ecoles)
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
      console.log('values', values)
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
            if(formation.formation_id.id){
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

    const returnOptions = () => {
      console.log('ecoles', ecoles)
      return ecoles
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
              options={returnOptions()}
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
