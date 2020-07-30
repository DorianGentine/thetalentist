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
    //   {id: 3082, title: " Université Nancy 2", created_at: "2018-10-18T07:10:41.421Z", updated_at: "2018-10-18T07:10:41.421Z", type_of_formation: null, ranking: null},
    //   {id: 3084, title: " Pierre and Marie Curie University", created_at: "2018-10-18T07:10:41.432Z", updated_at: "2018-10-18T07:10:41.432Z", type_of_formation: null, ranking: null},
    //   {id: 3207, title: " Université Sorbonne Nouvelle - Paris 3", created_at: "2018-10-18T07:10:42.244Z", updated_at: "2019-10-17T09:11:46.053Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3088, title: " Université Nice Sophia Antipolis", created_at: "2018-10-18T07:10:41.461Z", updated_at: "2018-10-18T07:10:41.461Z", type_of_formation: null, ranking: null},
    //   {id: 3097, title: " Ecole nationale supérieure des Mines de Saint-Etienne", created_at: "2018-10-18T07:10:41.503Z", updated_at: "2018-10-18T07:10:41.503Z", type_of_formation: null, ranking: null},
    //   {id: 3101, title: " Institut national des Langues et Civilisations orientales", created_at: "2018-10-18T07:10:41.521Z", updated_at: "2018-10-18T07:10:41.521Z", type_of_formation: null, ranking: null},
    //   {id: 3103, title: " Emmanuel College", created_at: "2018-10-18T07:10:41.531Z", updated_at: "2018-10-18T07:10:41.531Z", type_of_formation: null, ranking: null},
    //   {id: 3104, title: " Boston University", created_at: "2018-10-18T07:10:41.536Z", updated_at: "2018-10-18T07:10:41.536Z", type_of_formation: null, ranking: null},
    //   {id: 3105, title: " Ecole normale supérieure", created_at: "2018-10-18T07:10:41.540Z", updated_at: "2018-10-18T07:10:41.540Z", type_of_formation: null, ranking: null},
    //   {id: 3109, title: " 华东师范大学", created_at: "2018-10-18T07:10:41.557Z", updated_at: "2018-10-18T07:10:41.557Z", type_of_formation: null, ranking: null},
    //   {id: 3111, title: " Universidad Católica de Santa María", created_at: "2018-10-18T07:10:41.566Z", updated_at: "2018-10-18T07:10:41.566Z", type_of_formation: null, ranking: null},
    //   {id: 3113, title: " Uniwersytet Ekonomiczny w Krakowie", created_at: "2018-10-18T07:10:41.578Z", updated_at: "2018-10-18T07:10:41.578Z", type_of_formation: null, ranking: null},
    //   {id: 3115, title: " Università degli Studi di Pavia", created_at: "2018-10-18T07:10:41.589Z", updated_at: "2018-10-18T07:10:41.589Z", type_of_formation: null, ranking: null},
    //   {id: 3117, title: " Universidad Católica Boliviana", created_at: "2018-10-18T07:10:41.602Z", updated_at: "2018-10-18T07:10:41.602Z", type_of_formation: null, ranking: null},
    //   {id: 3118, title: " Ecole centrale de Nantes", created_at: "2018-10-18T07:10:41.607Z", updated_at: "2018-10-18T07:10:41.607Z", type_of_formation: null, ranking: null},
    //   {id: 3119, title: " Utkal University", created_at: "2018-10-18T07:10:41.611Z", updated_at: "2018-10-18T07:10:41.611Z", type_of_formation: null, ranking: null},
    //   {id: 3121, title: " Indian Institute of Management", created_at: "2018-10-18T07:10:41.620Z", updated_at: "2018-10-18T07:10:41.620Z", type_of_formation: null, ranking: null},
    //   {id: 3122, title: " University of Cape Town", created_at: "2018-10-18T07:10:41.625Z", updated_at: "2018-10-18T07:10:41.625Z", type_of_formation: null, ranking: null},
    //   {id: 3124, title: " Xi'an International Studies University", created_at: "2018-10-18T07:10:41.635Z", updated_at: "2018-10-18T07:10:41.635Z", type_of_formation: null, ranking: null},
    //   {id: 3125, title: " Saint John's University", created_at: "2018-10-18T07:10:41.641Z", updated_at: "2018-10-18T07:10:41.641Z", type_of_formation: null, ranking: null},
    //   {id: 3126, title: " Université Montpellier I", created_at: "2018-10-18T07:10:41.651Z", updated_at: "2018-10-18T07:10:41.651Z", type_of_formation: null, ranking: null},
    //   {id: 3128, title: " Université de Bourgogne", created_at: "2018-10-18T07:10:41.665Z", updated_at: "2018-10-18T07:10:41.665Z", type_of_formation: null, ranking: null},
    //   {id: 3133, title: " Hawaii Pacific University", created_at: "2018-10-18T07:10:41.705Z", updated_at: "2018-10-18T07:10:41.705Z", type_of_formation: null, ranking: null},
    //   {id: 3134, title: " Euridis Business School", created_at: "2018-10-18T07:10:41.709Z", updated_at: "2018-10-18T07:10:41.709Z", type_of_formation: null, ranking: null},
    //   {id: 3135, title: " Universite de Lorraine", created_at: "2018-10-18T07:10:41.714Z", updated_at: "2018-10-18T07:10:41.714Z", type_of_formation: null, ranking: null},
    //   {id: 3136, title: " Lycée Robert Schuman", created_at: "2018-10-18T07:10:41.721Z", updated_at: "2018-10-18T07:10:41.721Z", type_of_formation: null, ranking: null},
    //   {id: 3138, title: " Universidade de Fortaleza", created_at: "2018-10-18T07:10:41.738Z", updated_at: "2018-10-18T07:10:41.738Z", type_of_formation: null, ranking: null},
    //   {id: 3139, title: " Harrington College of Design", created_at: "2018-10-18T07:10:41.743Z", updated_at: "2018-10-18T07:10:41.743Z", type_of_formation: null, ranking: null},
    //   {id: 3141, title: " Sup Career", created_at: "2018-10-18T07:10:41.752Z", updated_at: "2018-10-18T07:10:41.752Z", type_of_formation: null, ranking: null},
    //   {id: 3143, title: " Institut d'Etudes politiques de Toulouse", created_at: "2018-10-18T07:10:41.761Z", updated_at: "2018-10-18T07:10:41.761Z", type_of_formation: null, ranking: null},
    //   {id: 3144, title: " Universiteit Maastricht", created_at: "2018-10-18T07:10:41.772Z", updated_at: "2018-10-18T07:10:41.772Z", type_of_formation: null, ranking: null},
    //   {id: 3146, title: " Institut national polytechnique de Grenoble", created_at: "2018-10-18T07:10:41.788Z", updated_at: "2018-10-18T07:10:41.788Z", type_of_formation: null, ranking: null},
    //   {id: 3148, title: " Groupe Ecole supérieure de Commerce et de Management", created_at: "2018-10-18T07:10:41.800Z", updated_at: "2018-10-18T07:10:41.800Z", type_of_formation: null, ranking: null},
    //   {id: 3149, title: " University of Rennes", created_at: "2018-10-18T07:10:41.806Z", updated_at: "2018-10-18T07:10:41.806Z", type_of_formation: null, ranking: null},
    //   {id: 3100, title: " INSEEC", created_at: "2018-10-18T07:10:41.517Z", updated_at: "2019-04-04T08:19:45.874Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3107, title: " EMLYON Business School", created_at: "2018-10-18T07:10:41.549Z", updated_at: "2019-04-04T08:19:55.028Z", type_of_formation: "Ecole De Commerce", ranking: "Top 5"},
    //   {id: 3098, title: " ESSEC - ESSEC Business School", created_at: "2018-10-18T07:10:41.508Z", updated_at: "2019-04-09T08:39:23.610Z", type_of_formation: "Ecole De Commerce", ranking: "Top 3"},
    //   {id: 3094, title: " ISAE-SUPAERO", created_at: "2018-10-18T07:10:41.490Z", updated_at: "2019-05-14T13:04:58.112Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3108, title: " HEC Montréal", created_at: "2018-10-18T07:10:41.553Z", updated_at: "2019-04-04T08:19:59.566Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3112, title: " SKEMA Business School", created_at: "2018-10-18T07:10:41.574Z", updated_at: "2019-04-04T08:20:04.976Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3127, title: " NEGOCIA - Centre international de formation à la vente et à la négociation commerciale", created_at: "2018-10-18T07:10:41.659Z", updated_at: "2019-04-04T08:20:10.157Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3110, title: " Audencia Nantes Ecole de Management", created_at: "2018-10-18T07:10:41.561Z", updated_at: "2019-04-09T08:39:29.521Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3249, title: " Ecole polytechnique", created_at: "2018-10-18T07:10:42.456Z", updated_at: "2019-04-04T08:22:17.528Z", type_of_formation: "Ecole D'ingénieur", ranking: "Top 3"},
    //   {id: 3085, title: " Université Paris Dauphine", created_at: "2018-10-18T07:10:41.437Z", updated_at: "2019-05-14T12:59:18.513Z", type_of_formation: "Comptabilité / gestion / finance ", ranking: "Top 3"},
    //   {id: 3273, title: " London School of Economics and Political Science", created_at: "2018-10-18T07:10:42.618Z", updated_at: "2019-04-04T08:22:34.456Z", type_of_formation: "Formation En Economie & Politique", ranking: ""},
    //   {id: 3413, title: " Università Commerciale 'Luigi Bocconi'", created_at: "2018-10-18T07:10:43.685Z", updated_at: "2019-04-04T08:22:47.045Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3147, title: " Grenoble Ecole de Management", created_at: "2018-10-18T07:10:41.795Z", updated_at: "2019-05-14T13:06:03.268Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3428, title: " Institut Léonard de Vinci", created_at: "2018-10-18T07:10:43.764Z", updated_at: "2019-04-04T08:22:50.468Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3445, title: " ESCE", created_at: "2018-10-18T07:10:43.870Z", updated_at: "2019-04-04T08:23:08.326Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3083, title: " ESCP Europe", created_at: "2018-10-18T07:10:41.426Z", updated_at: "2019-04-04T08:23:59.224Z", type_of_formation: "Ecole De Commerce", ranking: "Top 3"},
    //   {id: 3137, title: " ISC Paris", created_at: "2018-10-18T07:10:41.733Z", updated_at: "2019-03-29T15:10:50.947Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3140, title: " MBA ESG", created_at: "2018-10-18T07:10:41.748Z", updated_at: "2019-04-04T08:12:09.729Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3191, title: " Le Wagon", created_at: "2018-10-18T07:10:42.146Z", updated_at: "2019-04-04T08:13:42.720Z", type_of_formation: "Formation Développeur", ranking: "Top 5"},
    //   {id: 3081, title: " Sciences Po Lyon - Institut d'Etudes Politiques", created_at: "2018-10-18T07:10:41.416Z", updated_at: "2019-04-04T08:17:55.621Z", type_of_formation: "Ecole De Journalisme", ranking: ""},
    //   {id: 3090, title: " Toulouse Business School", created_at: "2018-10-18T07:10:41.470Z", updated_at: "2019-04-04T08:18:51.820Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3093, title: " HEC School of Management", created_at: "2018-10-18T07:10:41.485Z", updated_at: "2019-04-04T08:19:02.650Z", type_of_formation: "Ecole De Commerce", ranking: "Top 3"},
    //   {id: 3096, title: " CentraleSupélec", created_at: "2018-10-18T07:10:41.499Z", updated_at: "2019-04-04T08:19:20.018Z", type_of_formation: "Ecole D'ingénieur", ranking: "Top 3"},
    //   {id: 3142, title: " Université Paris X Nanterre", created_at: "2018-10-18T07:10:41.757Z", updated_at: "2019-04-04T08:21:04.354Z", type_of_formation: "Formation De Droit", ranking: ""},
    //   {id: 3159, title: " EDHEC Business School", created_at: "2018-10-18T07:10:41.884Z", updated_at: "2019-04-04T08:21:21.852Z", type_of_formation: "Ecole De Commerce", ranking: "Top 5"},
    //   {id: 3213, title: " CELSA - Ecole des hautes études en sciences de l'information et de la communication", created_at: "2018-10-18T07:10:42.270Z", updated_at: "2019-04-04T08:22:09.630Z", type_of_formation: "Ecole De Journalisme", ranking: ""},
    //   {id: 3102, title: " Université Paris-Est Créteil (UPEC)", created_at: "2018-10-18T07:10:41.526Z", updated_at: "2019-05-14T12:59:00.652Z", type_of_formation: "Comptabilité / gestion / finance", ranking: ""},
    //   {id: 3086, title: " Université Panthéon Assas (Paris II)", created_at: "2018-10-18T07:10:41.451Z", updated_at: "2019-05-14T13:06:51.444Z", type_of_formation: "Formation en droit", ranking: "Top 3"},
    //   {id: 3488, title: " Università degli Studi di Genova", created_at: "2018-10-18T07:10:44.088Z", updated_at: "2019-05-14T13:10:15.812Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3664, title: "KEDGE Business School", created_at: "2019-01-18T08:43:08.769Z", updated_at: "2019-05-14T13:10:21.509Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3431, title: " Birmingham City University", created_at: "2018-10-18T07:10:43.786Z", updated_at: "2019-05-14T13:11:53.765Z", type_of_formation: "Formation en economie & management", ranking: ""},
    //   {id: 3091, title: " Rouen Business School", created_at: "2018-10-18T07:10:41.475Z", updated_at: "2019-05-14T13:15:02.152Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3698, title: "3110", created_at: "2019-06-25T15:24:53.597Z", updated_at: "2019-06-25T15:24:53.597Z", type_of_formation: null, ranking: null},
    //   {id: 3739, title: "Ismapp", created_at: "2019-09-26T17:05:37.242Z", updated_at: "2019-09-30T13:05:10.898Z", type_of_formation: "Formation en management", ranking: ""},
    //   {id: 3153, title: " European Institute for Lobbying", created_at: "2018-10-18T07:10:41.850Z", updated_at: "2018-10-18T07:10:41.850Z", type_of_formation: null, ranking: null},
    //   {id: 3130, title: " Join Lion", created_at: "2018-10-18T07:10:41.677Z", updated_at: "2019-11-18T11:31:09.138Z", type_of_formation: "Formation en management", ranking: ""},
    //   {id: 3150, title: " ESSCA Business School - France", created_at: "2018-10-18T07:10:41.812Z", updated_at: "2020-01-21T09:15:48.542Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3123, title: " Groupe Sup de Co La Rochelle", created_at: "2018-10-18T07:10:41.630Z", updated_at: "2019-11-18T11:28:24.069Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3099, title: " École de Biologie Industrielle", created_at: "2018-10-18T07:10:41.512Z", updated_at: "2019-11-18T11:27:23.351Z", type_of_formation: "Formation en biologie", ranking: ""},
    //   {id: 3089, title: " Università di Bologna", created_at: "2018-10-18T07:10:41.465Z", updated_at: "2019-11-18T11:28:52.239Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3132, title: " EBS - European Business School Paris", created_at: "2018-10-18T07:10:41.699Z", updated_at: "2020-01-22T14:12:36.247Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3106, title: " Université René Descartes (Paris V)", created_at: "2018-10-18T07:10:41.545Z", updated_at: "2020-03-19T17:16:49.702Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3129, title: " Université de Reims Champagne-Ardenne", created_at: "2018-10-18T07:10:41.671Z", updated_at: "2020-04-22T11:17:19.263Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3114, title: " EM Strasbourg Business School", created_at: "2018-10-18T07:10:41.584Z", updated_at: "2020-06-05T14:49:17.139Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3092, title: " OpenClassrooms", created_at: "2018-10-18T07:10:41.480Z", updated_at: "2020-07-16T08:54:38.828Z", type_of_formation: "", ranking: ""},
    //   {id: 3151, title: " ESG Management School", created_at: "2018-10-18T07:10:41.822Z", updated_at: "2020-07-16T08:54:42.983Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3155, title: " Institut Supérieur Européen de Gestion", created_at: "2018-10-18T07:10:41.860Z", updated_at: "2018-10-18T07:10:41.860Z", type_of_formation: null, ranking: null},
    //   {id: 3157, title: " Ecole Nationale Supérieure des Mines de Nancy", created_at: "2018-10-18T07:10:41.873Z", updated_at: "2018-10-18T07:10:41.873Z", type_of_formation: null, ranking: null},
    //   {id: 3158, title: " Ecole centrale de Marseille", created_at: "2018-10-18T07:10:41.879Z", updated_at: "2018-10-18T07:10:41.879Z", type_of_formation: null, ranking: null},
    //   {id: 3174, title: " IGS-RH", created_at: "2018-10-18T07:10:41.972Z", updated_at: "2019-10-14T09:24:00.654Z", type_of_formation: "Formation en ressources humaines", ranking: ""},
    //   {id: 3160, title: " Universidad del Pacífico (PE)", created_at: "2018-10-18T07:10:41.891Z", updated_at: "2018-10-18T07:10:41.891Z", type_of_formation: null, ranking: null},
    //   {id: 3161, title: " INHES Institut des Hautes Etudes de sécurité", created_at: "2018-10-18T07:10:41.896Z", updated_at: "2018-10-18T07:10:41.896Z", type_of_formation: null, ranking: null},
    //   {id: 3163, title: " Göteborgs universitet", created_at: "2018-10-18T07:10:41.908Z", updated_at: "2018-10-18T07:10:41.908Z", type_of_formation: null, ranking: null},
    //   {id: 3164, title: " Saint Louis de Gonzague-Franklin", created_at: "2018-10-18T07:10:41.914Z", updated_at: "2018-10-18T07:10:41.914Z", type_of_formation: null, ranking: null},
    //   {id: 3166, title: " University of San Diego School of Business", created_at: "2018-10-18T07:10:41.924Z", updated_at: "2018-10-18T07:10:41.924Z", type_of_formation: null, ranking: null},
    //   {id: 3167, title: " Valencia Community College", created_at: "2018-10-18T07:10:41.931Z", updated_at: "2018-10-18T07:10:41.931Z", type_of_formation: null, ranking: null},
    //   {id: 3168, title: " 國立中山大學", created_at: "2018-10-18T07:10:41.937Z", updated_at: "2018-10-18T07:10:41.937Z", type_of_formation: null, ranking: null},
    //   {id: 3170, title: " Ecole supérieure d'Electronique de l'Ouest-ESEO ANGERS", created_at: "2018-10-18T07:10:41.945Z", updated_at: "2018-10-18T07:10:41.945Z", type_of_formation: null, ranking: null},
    //   {id: 3171, title: " Université du Sud Toulon Var", created_at: "2018-10-18T07:10:41.951Z", updated_at: "2018-10-18T07:10:41.951Z", type_of_formation: null, ranking: null},
    //   {id: 3173, title: " Université Blaise Pascal (Clermont-II) - Clermont-Ferrand", created_at: "2018-10-18T07:10:41.966Z", updated_at: "2018-10-18T07:10:41.966Z", type_of_formation: null, ranking: null},
    //   {id: 3743, title: "Université Paris 1 Pantheon Sorbonne", created_at: "2019-10-18T14:13:17.629Z", updated_at: "2019-10-21T10:33:18.073Z", type_of_formation: "Formation en economie & gestion", ranking: ""},
    //   {id: 3120, title: " ESGCI", created_at: "2018-10-18T07:10:41.616Z", updated_at: "2019-10-17T09:12:10.976Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3186, title: " Universidad Complutense de Madrid", created_at: "2018-10-18T07:10:42.091Z", updated_at: "2018-10-18T07:10:42.091Z", type_of_formation: null, ranking: null},
    //   {id: 3187, title: " Universidad de Santiago de Chile", created_at: "2018-10-18T07:10:42.096Z", updated_at: "2018-10-18T07:10:42.096Z", type_of_formation: null, ranking: null},
    //   {id: 3188, title: " Universidad de Extremadura", created_at: "2018-10-18T07:10:42.104Z", updated_at: "2018-10-18T07:10:42.104Z", type_of_formation: null, ranking: null},
    //   {id: 3192, title: " University of Utah - David Eccles School of Business", created_at: "2018-10-18T07:10:42.161Z", updated_at: "2018-10-18T07:10:42.161Z", type_of_formation: null, ranking: null},
    //   {id: 3193, title: " Utah State University", created_at: "2018-10-18T07:10:42.174Z", updated_at: "2018-10-18T07:10:42.174Z", type_of_formation: null, ranking: null},
    //   {id: 3194, title: " McGill University", created_at: "2018-10-18T07:10:42.179Z", updated_at: "2018-10-18T07:10:42.179Z", type_of_formation: null, ranking: null},
    //   {id: 3195, title: " Georgetown University", created_at: "2018-10-18T07:10:42.187Z", updated_at: "2018-10-18T07:10:42.187Z", type_of_formation: null, ranking: null},
    //   {id: 3196, title: " Université de Versailles Saint-Quentin-en-Yvelines", created_at: "2018-10-18T07:10:42.192Z", updated_at: "2018-10-18T07:10:42.192Z", type_of_formation: null, ranking: null},
    //   {id: 3197, title: " Université Montesquieu-Bordeaux IV", created_at: "2018-10-18T07:10:42.196Z", updated_at: "2018-10-18T07:10:42.196Z", type_of_formation: null, ranking: null},
    //   {id: 3198, title: " Universidad Nacional de Córdoba", created_at: "2018-10-18T07:10:42.202Z", updated_at: "2018-10-18T07:10:42.202Z", type_of_formation: null, ranking: null},
    //   {id: 3199, title: " Ecole nationale des Ponts et Chaussées", created_at: "2018-10-18T07:10:42.207Z", updated_at: "2018-10-18T07:10:42.207Z", type_of_formation: null, ranking: null},
    //   {id: 3200, title: " University College Cork", created_at: "2018-10-18T07:10:42.213Z", updated_at: "2018-10-18T07:10:42.213Z", type_of_formation: null, ranking: null},
    //   {id: 3202, title: " Université de Caen Normandie", created_at: "2018-10-18T07:10:42.221Z", updated_at: "2018-10-18T07:10:42.221Z", type_of_formation: null, ranking: null},
    //   {id: 3203, title: " Coventry University", created_at: "2018-10-18T07:10:42.225Z", updated_at: "2018-10-18T07:10:42.225Z", type_of_formation: null, ranking: null},
    //   {id: 3204, title: " Université de Technologie de Belfort-Montbéliard", created_at: "2018-10-18T07:10:42.229Z", updated_at: "2018-10-18T07:10:42.229Z", type_of_formation: null, ranking: null},
    //   {id: 3205, title: " IPAC", created_at: "2018-10-18T07:10:42.234Z", updated_at: "2018-10-18T07:10:42.234Z", type_of_formation: null, ranking: null},
    //   {id: 3209, title: " Università della Svizzera Italiana (USI)", created_at: "2018-10-18T07:10:42.253Z", updated_at: "2018-10-18T07:10:42.253Z", type_of_formation: null, ranking: null},
    //   {id: 3210, title: " Università Cattolica del Sacro Cuore", created_at: "2018-10-18T07:10:42.258Z", updated_at: "2018-10-18T07:10:42.258Z", type_of_formation: null, ranking: null},
    //   {id: 3211, title: " Tufts University", created_at: "2018-10-18T07:10:42.262Z", updated_at: "2018-10-18T07:10:42.262Z", type_of_formation: null, ranking: null},
    //   {id: 3212, title: " The University of Huddersfield", created_at: "2018-10-18T07:10:42.266Z", updated_at: "2018-10-18T07:10:42.266Z", type_of_formation: null, ranking: null},
    //   {id: 3214, title: " ISTH", created_at: "2018-10-18T07:10:42.274Z", updated_at: "2018-10-18T07:10:42.274Z", type_of_formation: null, ranking: null},
    //   {id: 3218, title: " HUB-EHSAL", created_at: "2018-10-18T07:10:42.291Z", updated_at: "2018-10-18T07:10:42.291Z", type_of_formation: null, ranking: null},
    //   {id: 3219, title: " IE (Instituto de Empresa)", created_at: "2018-10-18T07:10:42.295Z", updated_at: "2018-10-18T07:10:42.295Z", type_of_formation: null, ranking: null},
    //   {id: 3220, title: " Penn State University", created_at: "2018-10-18T07:10:42.300Z", updated_at: "2018-10-18T07:10:42.300Z", type_of_formation: null, ranking: null},
    //   {id: 3223, title: " University of Cambridge", created_at: "2018-10-18T07:10:42.316Z", updated_at: "2018-10-18T07:10:42.316Z", type_of_formation: null, ranking: null},
    //   {id: 3224, title: " University of California", created_at: "2018-10-18T07:10:42.321Z", updated_at: "2018-10-18T07:10:42.321Z", type_of_formation: null, ranking: null},
    //   {id: 3225, title: " Louisiana State University", created_at: "2018-10-18T07:10:42.325Z", updated_at: "2018-10-18T07:10:42.325Z", type_of_formation: null, ranking: null},
    //   {id: 3226, title: " University of New Orleans", created_at: "2018-10-18T07:10:42.330Z", updated_at: "2018-10-18T07:10:42.330Z", type_of_formation: null, ranking: null},
    //   {id: 3228, title: " University of the West of England", created_at: "2018-10-18T07:10:42.340Z", updated_at: "2018-10-18T07:10:42.340Z", type_of_formation: null, ranking: null},
    //   {id: 3232, title: " IFP - Institut français de presse", created_at: "2018-10-18T07:10:42.370Z", updated_at: "2018-10-18T07:10:42.370Z", type_of_formation: null, ranking: null},
    //   {id: 3233, title: " Time Université", created_at: "2018-10-18T07:10:42.375Z", updated_at: "2018-10-18T07:10:42.375Z", type_of_formation: null, ranking: null},
    //   {id: 3234, title: " University of Leicester", created_at: "2018-10-18T07:10:42.380Z", updated_at: "2018-10-18T07:10:42.380Z", type_of_formation: null, ranking: null},
    //   {id: 3235, title: " Rennes School of Business", created_at: "2018-10-18T07:10:42.385Z", updated_at: "2018-10-18T07:10:42.385Z", type_of_formation: null, ranking: null},
    //   {id: 3238, title: " South Bank University", created_at: "2018-10-18T07:10:42.399Z", updated_at: "2018-10-18T07:10:42.399Z", type_of_formation: null, ranking: null},
    //   {id: 3239, title: " Dublin Business School", created_at: "2018-10-18T07:10:42.403Z", updated_at: "2018-10-18T07:10:42.403Z", type_of_formation: null, ranking: null},
    //   {id: 3240, title: " EI.CESI - Ecole d'ingénieurs du CESI", created_at: "2018-10-18T07:10:42.408Z", updated_at: "2018-10-18T07:10:42.408Z", type_of_formation: null, ranking: null},
    //   {id: 3241, title: " IEMI-CMH Academy", created_at: "2018-10-18T07:10:42.413Z", updated_at: "2018-10-18T07:10:42.413Z", type_of_formation: null, ranking: null},
    //   {id: 3243, title: " University of Portsmouth", created_at: "2018-10-18T07:10:42.426Z", updated_at: "2018-10-18T07:10:42.426Z", type_of_formation: null, ranking: null},
    //   {id: 3246, title: " ICOF Lyon", created_at: "2018-10-18T07:10:42.442Z", updated_at: "2018-10-18T07:10:42.442Z", type_of_formation: null, ranking: null},
    //   {id: 3169, title: " Bordeaux Business School", created_at: "2018-10-18T07:10:41.941Z", updated_at: "2019-04-04T08:21:25.304Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3208, title: " Ecole centrale de Lyon", created_at: "2018-10-18T07:10:42.248Z", updated_at: "2019-04-04T08:21:35.120Z", type_of_formation: "Ecole D'ingénieur", ranking: "Top 3"},
    //   {id: 3247, title: " ESLSCA", created_at: "2018-10-18T07:10:42.446Z", updated_at: "2019-05-14T13:14:03.213Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3183, title: " IAE Lille", created_at: "2018-10-18T07:10:42.069Z", updated_at: "2019-05-14T13:15:32.126Z", type_of_formation: "Formation en management", ranking: ""},
    //   {id: 3179, title: " Conservatoire National des Arts et Métiers", created_at: "2018-10-18T07:10:42.027Z", updated_at: "2019-05-14T13:06:12.901Z", type_of_formation: "Ecole d'ingénieur", ranking: "Top 5"},
    //   {id: 3172, title: " IEMN-IAE", created_at: "2018-10-18T07:10:41.956Z", updated_at: "2019-05-14T13:10:56.284Z", type_of_formation: "Formation en economie & management", ranking: ""},
    //   {id: 3215, title: " Novancia Business School Paris", created_at: "2018-10-18T07:10:42.278Z", updated_at: "2019-05-14T13:14:05.828Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3162, title: " Institut Supérieur de Gestion", created_at: "2018-10-18T07:10:41.902Z", updated_at: "2019-07-16T13:59:40.290Z", type_of_formation: "Formation en gestion", ranking: ""},
    //   {id: 3201, title: " ICN Business School", created_at: "2018-10-18T07:10:42.217Z", updated_at: "2019-07-16T14:02:25.100Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3154, title: " Université Paris-Sorbonne", created_at: "2018-10-18T07:10:41.856Z", updated_at: "2019-07-16T14:08:45.027Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3231, title: " Sciences Po", created_at: "2018-10-18T07:10:42.364Z", updated_at: "2019-07-16T14:10:23.045Z", type_of_formation: "Formation en sciences politiques", ranking: ""},
    //   {id: 3237, title: " ISCOM", created_at: "2018-10-18T07:10:42.395Z", updated_at: "2019-09-06T15:00:34.994Z", type_of_formation: "Ecole de communication", ranking: ""},
    //   {id: 3176, title: " IAE de Paris", created_at: "2018-10-18T07:10:41.985Z", updated_at: "2019-09-06T15:01:17.176Z", type_of_formation: "Formation en management", ranking: ""},
    //   {id: 3180, title: " ESIEE PARIS", created_at: "2018-10-18T07:10:42.033Z", updated_at: "2019-09-06T15:01:35.476Z", type_of_formation: "Formation en technologies", ranking: ""},
    //   {id: 3248, title: " Lindenwood University", created_at: "2018-10-18T07:10:42.451Z", updated_at: "2018-10-18T07:10:42.451Z", type_of_formation: null, ranking: null},
    //   {id: 3317, title: " European Business School", created_at: "2018-10-18T07:10:42.993Z", updated_at: "2019-09-30T13:05:22.414Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3250, title: " University of California", created_at: "2018-10-18T07:10:42.462Z", updated_at: "2018-10-18T07:10:42.462Z", type_of_formation: null, ranking: null},
    //   {id: 3251, title: " Université du Maine-Le Mans-Laval", created_at: "2018-10-18T07:10:42.466Z", updated_at: "2018-10-18T07:10:42.466Z", type_of_formation: null, ranking: null},
    //   {id: 3242, title: " IAE Toulouse", created_at: "2018-10-18T07:10:42.417Z", updated_at: "2019-11-18T11:31:13.673Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3177, title: " Université Paris 8", created_at: "2018-10-18T07:10:41.994Z", updated_at: "2019-11-26T14:43:25.879Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3181, title: " Montpellier Business School", created_at: "2018-10-18T07:10:42.038Z", updated_at: "2020-01-22T14:12:41.104Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3156, title: " Imperial College London", created_at: "2018-10-18T07:10:41.865Z", updated_at: "2020-01-22T14:14:19.157Z", type_of_formation: "Formation scientifique", ranking: ""},
    //   {id: 3175, title: " IPAG", created_at: "2018-10-18T07:10:41.979Z", updated_at: "2020-01-22T14:14:29.052Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3185, title: " Polytech'Lille", created_at: "2018-10-18T07:10:42.082Z", updated_at: "2020-02-19T16:43:51.980Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3245, title: " EFAP - Ecole Française des Attachés de Presse", created_at: "2018-10-18T07:10:42.437Z", updated_at: "2020-02-19T16:25:20.422Z", type_of_formation: "Formation en journalisme", ranking: ""},
    //   {id: 3206, title: " Université de Cergy-Pontoise", created_at: "2018-10-18T07:10:42.239Z", updated_at: "2020-04-22T11:16:47.320Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3236, title: " University of Warwick", created_at: "2018-10-18T07:10:42.390Z", updated_at: "2020-04-09T16:58:53.365Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3244, title: " Université d'Angers", created_at: "2018-10-18T07:10:42.432Z", updated_at: "2020-04-22T11:18:30.270Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3217, title: " Universiteit Gent", created_at: "2018-10-18T07:10:42.286Z", updated_at: "2020-06-05T14:50:16.724Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3229, title: " IFAG", created_at: "2018-10-18T07:10:42.345Z", updated_at: "2020-07-16T08:55:17.356Z", type_of_formation: "", ranking: ""},
    //   {id: 3252, title: " CEMS - The Global Alliance in Management Education", created_at: "2018-10-18T07:10:42.471Z", updated_at: "2018-10-18T07:10:42.471Z", type_of_formation: null, ranking: null},
    //   {id: 3255, title: " Universidad Argentina de la Empresa", created_at: "2018-10-18T07:10:42.492Z", updated_at: "2018-10-18T07:10:42.492Z", type_of_formation: null, ranking: null},
    //   {id: 3257, title: " Ming Hsin University of Science and Technology", created_at: "2018-10-18T07:10:42.503Z", updated_at: "2018-10-18T07:10:42.503Z", type_of_formation: null, ranking: null},
    //   {id: 3258, title: " Institut supérieur d'Electronique de Paris", created_at: "2018-10-18T07:10:42.509Z", updated_at: "2018-10-18T07:10:42.509Z", type_of_formation: null, ranking: null},
    //   {id: 3259, title: " Stanford University Graduate School of Business", created_at: "2018-10-18T07:10:42.515Z", updated_at: "2018-10-18T07:10:42.515Z", type_of_formation: null, ranking: null},
    //   {id: 3260, title: " Leiden University", created_at: "2018-10-18T07:10:42.520Z", updated_at: "2018-10-18T07:10:42.520Z", type_of_formation: null, ranking: null},
    //   {id: 3261, title: " Università degli Studi di Padova", created_at: "2018-10-18T07:10:42.528Z", updated_at: "2018-10-18T07:10:42.528Z", type_of_formation: null, ranking: null},
    //   {id: 3262, title: " Babson College - Franklin W. Olin Graduate School of Business", created_at: "2018-10-18T07:10:42.539Z", updated_at: "2018-10-18T07:10:42.539Z", type_of_formation: null, ranking: null},
    //   {id: 3263, title: " Avans Hogeschool Breda", created_at: "2018-10-18T07:10:42.551Z", updated_at: "2018-10-18T07:10:42.551Z", type_of_formation: null, ranking: null},
    //   {id: 3264, title: " Université de Sherbrooke", created_at: "2018-10-18T07:10:42.556Z", updated_at: "2018-10-18T07:10:42.556Z", type_of_formation: null, ranking: null},
    //   {id: 3265, title: " ENSEEIHT - Ecole Nationale Supérieure d'Electrotechnique", created_at: "2018-10-18T07:10:42.561Z", updated_at: "2018-10-18T07:10:42.561Z", type_of_formation: null, ranking: null},
    //   {id: 3266, title: " IIM Ahmedabad", created_at: "2018-10-18T07:10:42.568Z", updated_at: "2018-10-18T07:10:42.568Z", type_of_formation: null, ranking: null},
    //   {id: 3267, title: " University of South Wales", created_at: "2018-10-18T07:10:42.576Z", updated_at: "2018-10-18T07:10:42.576Z", type_of_formation: null, ranking: null},
    //   {id: 3268, title: " ESAIP", created_at: "2018-10-18T07:10:42.582Z", updated_at: "2018-10-18T07:10:42.582Z", type_of_formation: null, ranking: null},
    //   {id: 3269, title: " Griffith University", created_at: "2018-10-18T07:10:42.592Z", updated_at: "2018-10-18T07:10:42.592Z", type_of_formation: null, ranking: null},
    //   {id: 3270, title: " TAFE", created_at: "2018-10-18T07:10:42.598Z", updated_at: "2018-10-18T07:10:42.598Z", type_of_formation: null, ranking: null},
    //   {id: 3271, title: " King's College London", created_at: "2018-10-18T07:10:42.603Z", updated_at: "2018-10-18T07:10:42.603Z", type_of_formation: null, ranking: null},
    //   {id: 3272, title: " Kaplan Law School", created_at: "2018-10-18T07:10:42.608Z", updated_at: "2018-10-18T07:10:42.608Z", type_of_formation: null, ranking: null},
    //   {id: 3275, title: " Fundação Getulio Vargas", created_at: "2018-10-18T07:10:42.638Z", updated_at: "2018-10-18T07:10:42.638Z", type_of_formation: null, ranking: null},
    //   {id: 3276, title: " The University of British Columbia", created_at: "2018-10-18T07:10:42.663Z", updated_at: "2018-10-18T07:10:42.663Z", type_of_formation: null, ranking: null},
    //   {id: 3277, title: " National Technical University of Ukraine 'Kyiv Polytechnic Institute'​", created_at: "2018-10-18T07:10:42.673Z", updated_at: "2018-10-18T07:10:42.673Z", type_of_formation: null, ranking: null},
    //   {id: 3278, title: " Institut national des Télécommunications", created_at: "2018-10-18T07:10:42.684Z", updated_at: "2018-10-18T07:10:42.684Z", type_of_formation: null, ranking: null},
    //   {id: 3279, title: " Boğaziçi University", created_at: "2018-10-18T07:10:42.690Z", updated_at: "2018-10-18T07:10:42.690Z", type_of_formation: null, ranking: null},
    //   {id: 3280, title: " Bilkent University", created_at: "2018-10-18T07:10:42.695Z", updated_at: "2018-10-18T07:10:42.695Z", type_of_formation: null, ranking: null},
    //   {id: 3281, title: " ESERP Business School", created_at: "2018-10-18T07:10:42.699Z", updated_at: "2018-10-18T07:10:42.699Z", type_of_formation: null, ranking: null},
    //   {id: 3282, title: " Birkbeck", created_at: "2018-10-18T07:10:42.703Z", updated_at: "2018-10-18T07:10:42.703Z", type_of_formation: null, ranking: null},
    //   {id: 3283, title: " The Manchester Metropolitan University", created_at: "2018-10-18T07:10:42.708Z", updated_at: "2018-10-18T07:10:42.708Z", type_of_formation: null, ranking: null},
    //   {id: 3284, title: " Ecole de Guerre Economique", created_at: "2018-10-18T07:10:42.712Z", updated_at: "2018-10-18T07:10:42.712Z", type_of_formation: null, ranking: null},
    //   {id: 3286, title: " New York Film Academy", created_at: "2018-10-18T07:10:42.721Z", updated_at: "2018-10-18T07:10:42.721Z", type_of_formation: null, ranking: null},
    //   {id: 3287, title: " Universitat d'Alacant", created_at: "2018-10-18T07:10:42.725Z", updated_at: "2018-10-18T07:10:42.725Z", type_of_formation: null, ranking: null},
    //   {id: 3288, title: " University of Ljubljana", created_at: "2018-10-18T07:10:42.730Z", updated_at: "2018-10-18T07:10:42.730Z", type_of_formation: null, ranking: null},
    //   {id: 3289, title: " Università degli Studi di Trento", created_at: "2018-10-18T07:10:42.741Z", updated_at: "2018-10-18T07:10:42.741Z", type_of_formation: null, ranking: null},
    //   {id: 3290, title: " Universidad de Huelva", created_at: "2018-10-18T07:10:42.759Z", updated_at: "2018-10-18T07:10:42.759Z", type_of_formation: null, ranking: null},
    //   {id: 3291, title: " Vilniaus Universitetas", created_at: "2018-10-18T07:10:42.769Z", updated_at: "2018-10-18T07:10:42.769Z", type_of_formation: null, ranking: null},
    //   {id: 3292, title: " North Carolina State University", created_at: "2018-10-18T07:10:42.799Z", updated_at: "2018-10-18T07:10:42.799Z", type_of_formation: null, ranking: null},
    //   {id: 3294, title: " Sup de V", created_at: "2018-10-18T07:10:42.812Z", updated_at: "2018-10-18T07:10:42.812Z", type_of_formation: null, ranking: null},
    //   {id: 3295, title: " Université de Bretagne Occidentale", created_at: "2018-10-18T07:10:42.823Z", updated_at: "2018-10-18T07:10:42.823Z", type_of_formation: null, ranking: null},
    //   {id: 3296, title: " Tel Aviv University", created_at: "2018-10-18T07:10:42.837Z", updated_at: "2018-10-18T07:10:42.837Z", type_of_formation: null, ranking: null},
    //   {id: 3297, title: " 성균관대학교 / Sungkyunkwan University", created_at: "2018-10-18T07:10:42.847Z", updated_at: "2018-10-18T07:10:42.847Z", type_of_formation: null, ranking: null},
    //   {id: 3298, title: " Universidad de Burgos", created_at: "2018-10-18T07:10:42.852Z", updated_at: "2018-10-18T07:10:42.852Z", type_of_formation: null, ranking: null},
    //   {id: 3299, title: " Ecole nationale supérieure d'Electronique", created_at: "2018-10-18T07:10:42.865Z", updated_at: "2018-10-18T07:10:42.865Z", type_of_formation: null, ranking: null},
    //   {id: 3300, title: " Institut d'Administration des Entreprises", created_at: "2018-10-18T07:10:42.870Z", updated_at: "2018-10-18T07:10:42.870Z", type_of_formation: null, ranking: null},
    //   {id: 3301, title: " University for the Creative Arts", created_at: "2018-10-18T07:10:42.875Z", updated_at: "2018-10-18T07:10:42.875Z", type_of_formation: null, ranking: null},
    //   {id: 3302, title: " IAE Nice (Graduate School of Management)", created_at: "2018-10-18T07:10:42.908Z", updated_at: "2018-10-18T07:10:42.908Z", type_of_formation: null, ranking: null},
    //   {id: 3303, title: " Högskolan i Skövde / University of Skövde", created_at: "2018-10-18T07:10:42.912Z", updated_at: "2018-10-18T07:10:42.912Z", type_of_formation: null, ranking: null},
    //   {id: 3304, title: " University of Nottingham - Nottingham University Business School", created_at: "2018-10-18T07:10:42.918Z", updated_at: "2018-10-18T07:10:42.918Z", type_of_formation: null, ranking: null},
    //   {id: 3305, title: " Gaston Berger Lille", created_at: "2018-10-18T07:10:42.923Z", updated_at: "2018-10-18T07:10:42.923Z", type_of_formation: null, ranking: null},
    //   {id: 3307, title: " University Paris VII", created_at: "2018-10-18T07:10:42.934Z", updated_at: "2018-10-18T07:10:42.934Z", type_of_formation: null, ranking: null},
    //   {id: 3309, title: " Sup de Luxe", created_at: "2018-10-18T07:10:42.947Z", updated_at: "2018-10-18T07:10:42.947Z", type_of_formation: null, ranking: null},
    //   {id: 3312, title: " Université de Montréal", created_at: "2018-10-18T07:10:42.969Z", updated_at: "2018-10-18T07:10:42.969Z", type_of_formation: null, ranking: null},
    //   {id: 3314, title: " Università degli Studi di Firenze", created_at: "2018-10-18T07:10:42.978Z", updated_at: "2018-10-18T07:10:42.978Z", type_of_formation: null, ranking: null},
    //   {id: 3315, title: " Liceo Scientifico", created_at: "2018-10-18T07:10:42.983Z", updated_at: "2018-10-18T07:10:42.983Z", type_of_formation: null, ranking: null},
    //   {id: 3318, title: " University of Oxford - Said Business School", created_at: "2018-10-18T07:10:42.998Z", updated_at: "2018-10-18T07:10:42.998Z", type_of_formation: null, ranking: null},
    //   {id: 3319, title: " American University of Paris", created_at: "2018-10-18T07:10:43.002Z", updated_at: "2018-10-18T07:10:43.002Z", type_of_formation: null, ranking: null},
    //   {id: 3322, title: " IAE Caen", created_at: "2018-10-18T07:10:43.013Z", updated_at: "2018-10-18T07:10:43.013Z", type_of_formation: null, ranking: null},
    //   {id: 3324, title: " Leeds Metropolitan University", created_at: "2018-10-18T07:10:43.025Z", updated_at: "2018-10-18T07:10:43.025Z", type_of_formation: null, ranking: null},
    //   {id: 3325, title: " Karlsruher Institut für Technologie (KIT)", created_at: "2018-10-18T07:10:43.030Z", updated_at: "2018-10-18T07:10:43.030Z", type_of_formation: null, ranking: null},
    //   {id: 3326, title: " Freie Universität Berlin", created_at: "2018-10-18T07:10:43.035Z", updated_at: "2018-10-18T07:10:43.035Z", type_of_formation: null, ranking: null},
    //   {id: 3327, title: " Institut d'Etudes politiques de Lille", created_at: "2018-10-18T07:10:43.039Z", updated_at: "2018-10-18T07:10:43.039Z", type_of_formation: null, ranking: null},
    //   {id: 3330, title: " Ecole du Louvre", created_at: "2018-10-18T07:10:43.057Z", updated_at: "2018-10-18T07:10:43.057Z", type_of_formation: null, ranking: null},
    //   {id: 3332, title: " Universidad Carlos III de Madrid", created_at: "2018-10-18T07:10:43.075Z", updated_at: "2018-10-18T07:10:43.075Z", type_of_formation: null, ranking: null},
    //   {id: 3333, title: " New York University", created_at: "2018-10-18T07:10:43.079Z", updated_at: "2018-10-18T07:10:43.079Z", type_of_formation: null, ranking: null},
    //   {id: 3334, title: " EPITECH", created_at: "2018-10-18T07:10:43.083Z", updated_at: "2018-10-18T07:10:43.083Z", type_of_formation: null, ranking: null},
    //   {id: 3337, title: " HEC Lausanne - The Faculty of Business and Economics of the University of Lausanne", created_at: "2018-10-18T07:10:43.102Z", updated_at: "2018-10-18T07:10:43.102Z", type_of_formation: null, ranking: null},
    //   {id: 3338, title: " Université de Geneve", created_at: "2018-10-18T07:10:43.121Z", updated_at: "2018-10-18T07:10:43.121Z", type_of_formation: null, ranking: null},
    //   {id: 3339, title: " Escuela de Organización Industrial", created_at: "2018-10-18T07:10:43.131Z", updated_at: "2018-10-18T07:10:43.131Z", type_of_formation: null, ranking: null},
    //   {id: 3340, title: " Universidad de Oviedo", created_at: "2018-10-18T07:10:43.139Z", updated_at: "2018-10-18T07:10:43.139Z", type_of_formation: null, ranking: null},
    //   {id: 3341, title: " University of Jijel", created_at: "2018-10-18T07:10:43.149Z", updated_at: "2018-10-18T07:10:43.149Z", type_of_formation: null, ranking: null},
    //   {id: 3329, title: " ESAM – School of Advanced Management and Finance", created_at: "2018-10-18T07:10:43.048Z", updated_at: "2019-05-14T13:05:05.557Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3306, title: " Ecole supérieure de commerce de Reims NEOMA Business School", created_at: "2018-10-18T07:10:42.929Z", updated_at: "2019-05-14T13:13:13.941Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3310, title: " Aix-Marseille Université", created_at: "2018-10-18T07:10:42.955Z", updated_at: "2019-05-14T13:13:13.571Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3331, title: " City University London", created_at: "2018-10-18T07:10:43.063Z", updated_at: "2019-07-16T14:00:12.397Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3308, title: " Aix-Marseille Graduate School of Management - IAE", created_at: "2018-10-18T07:10:42.942Z", updated_at: "2019-07-16T14:00:59.712Z", type_of_formation: "Formation en commerce", ranking: ""},
    //   {id: 3343, title: " Université Henri Poincaré (Nancy I)", created_at: "2018-10-18T07:10:43.161Z", updated_at: "2018-10-18T07:10:43.161Z", type_of_formation: null, ranking: null},
    //   {id: 3344, title: " Antwerp Management School", created_at: "2018-10-18T07:10:43.167Z", updated_at: "2018-10-18T07:10:43.167Z", type_of_formation: null, ranking: null},
    //   {id: 3346, title: " Niels Brock", created_at: "2018-10-18T07:10:43.180Z", updated_at: "2018-10-18T07:10:43.180Z", type_of_formation: null, ranking: null},
    //   {id: 3311, title: " CIFFOP", created_at: "2018-10-18T07:10:42.965Z", updated_at: "2019-11-18T11:27:38.525Z", type_of_formation: "Formation en ressources humaines", ranking: ""},
    //   {id: 3254, title: " Télécom SudParis", created_at: "2018-10-18T07:10:42.485Z", updated_at: "2019-11-18T11:30:17.192Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3342, title: " EMLV - École de Management Léonard de Vinci", created_at: "2018-10-18T07:10:43.155Z", updated_at: "2020-01-22T14:12:38.865Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3321, title: " Ecole Spéciale Militaire de Saint-Cyr", created_at: "2018-10-18T07:10:43.009Z", updated_at: "2020-01-07T11:25:50.077Z", type_of_formation: "Essca", ranking: ""},
    //   {id: 3345, title: " Concordia University", created_at: "2018-10-18T07:10:43.176Z", updated_at: "2020-02-19T16:42:53.531Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3253, title: " INSEAD", created_at: "2018-10-18T07:10:42.476Z", updated_at: "2020-03-19T17:19:43.408Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3336, title: " Telecom ParisTech", created_at: "2018-10-18T07:10:43.094Z", updated_at: "2020-03-19T17:21:27.860Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3335, title: " Université catholique de Louvain", created_at: "2018-10-18T07:10:43.087Z", updated_at: "2020-03-19T17:13:52.027Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3316, title: " Master in Economics", created_at: "2018-10-18T07:10:42.989Z", updated_at: "2020-04-09T16:58:18.211Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3293, title: " Vatel France", created_at: "2018-10-18T07:10:42.805Z", updated_at: "2020-07-16T08:55:00.609Z", type_of_formation: "Ecole hotelière", ranking: ""},
    //   {id: 3285, title: " Université de Nantes", created_at: "2018-10-18T07:10:42.716Z", updated_at: "2020-07-16T08:55:15.701Z", type_of_formation: "", ranking: ""},
    //   {id: 3274, title: " Tuck School of Business at Dartmouth", created_at: "2018-10-18T07:10:42.627Z", updated_at: "2020-07-16T08:55:48.500Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3347, title: " University of Technology", created_at: "2018-10-18T07:10:43.185Z", updated_at: "2018-10-18T07:10:43.185Z", type_of_formation: null, ranking: null},
    //   {id: 3349, title: " Indiana University Bloomington", created_at: "2018-10-18T07:10:43.196Z", updated_at: "2018-10-18T07:10:43.196Z", type_of_formation: null, ranking: null},
    //   {id: 3350, title: " Rotterdam School of Management", created_at: "2018-10-18T07:10:43.205Z", updated_at: "2018-10-18T07:10:43.205Z", type_of_formation: null, ranking: null},
    //   {id: 3351, title: " Pôle Paris Alternance (PPA)", created_at: "2018-10-18T07:10:43.212Z", updated_at: "2018-10-18T07:10:43.212Z", type_of_formation: null, ranking: null},
    //   {id: 3352, title: " Harvard University", created_at: "2018-10-18T07:10:43.220Z", updated_at: "2018-10-18T07:10:43.220Z", type_of_formation: null, ranking: null},
    //   {id: 3354, title: " Lund University School of Economics and Management", created_at: "2018-10-18T07:10:43.238Z", updated_at: "2018-10-18T07:10:43.238Z", type_of_formation: null, ranking: null},
    //   {id: 3355, title: " Institut supérieur d'électronique et du numérique", created_at: "2018-10-18T07:10:43.250Z", updated_at: "2018-10-18T07:10:43.250Z", type_of_formation: null, ranking: null},
    //   {id: 3356, title: " San Diego State University-California State University", created_at: "2018-10-18T07:10:43.264Z", updated_at: "2018-10-18T07:10:43.264Z", type_of_formation: null, ranking: null},
    //   {id: 3357, title: " Escuela Colombiana de Ingeniería 'Julio Garavito'", created_at: "2018-10-18T07:10:43.270Z", updated_at: "2018-10-18T07:10:43.270Z", type_of_formation: null, ranking: null},
    //   {id: 3358, title: " IESE Business School - University of Navarra", created_at: "2018-10-18T07:10:43.286Z", updated_at: "2018-10-18T07:10:43.286Z", type_of_formation: null, ranking: null},
    //   {id: 3360, title: " Michigan State University", created_at: "2018-10-18T07:10:43.309Z", updated_at: "2018-10-18T07:10:43.309Z", type_of_formation: null, ranking: null},
    //   {id: 3361, title: " Northeastern University", created_at: "2018-10-18T07:10:43.318Z", updated_at: "2018-10-18T07:10:43.318Z", type_of_formation: null, ranking: null},
    //   {id: 3362, title: " University College Dublin", created_at: "2018-10-18T07:10:43.332Z", updated_at: "2018-10-18T07:10:43.332Z", type_of_formation: null, ranking: null},
    //   {id: 3363, title: " The Wharton School", created_at: "2018-10-18T07:10:43.347Z", updated_at: "2018-10-18T07:10:43.347Z", type_of_formation: null, ranking: null},
    //   {id: 3364, title: " Universidade Federal de Santa Catarina", created_at: "2018-10-18T07:10:43.356Z", updated_at: "2018-10-18T07:10:43.356Z", type_of_formation: null, ranking: null},
    //   {id: 3365, title: " Carnegie Mellon University - Tepper School of Business", created_at: "2018-10-18T07:10:43.371Z", updated_at: "2018-10-18T07:10:43.371Z", type_of_formation: null, ranking: null},
    //   {id: 3366, title: " University of Minnesota-Twin Cities", created_at: "2018-10-18T07:10:43.390Z", updated_at: "2018-10-18T07:10:43.390Z", type_of_formation: null, ranking: null},
    //   {id: 3367, title: " Tongji University", created_at: "2018-10-18T07:10:43.401Z", updated_at: "2018-10-18T07:10:43.401Z", type_of_formation: null, ranking: null},
    //   {id: 3368, title: " Ecole nationale supérieure de l'Electronique et de ses Applications", created_at: "2018-10-18T07:10:43.415Z", updated_at: "2018-10-18T07:10:43.415Z", type_of_formation: null, ranking: null},
    //   {id: 3369, title: " ISEFAC Alternance", created_at: "2018-10-18T07:10:43.422Z", updated_at: "2018-10-18T07:10:43.422Z", type_of_formation: null, ranking: null},
    //   {id: 3370, title: " Polytech'Paris-UPMC", created_at: "2018-10-18T07:10:43.431Z", updated_at: "2018-10-18T07:10:43.431Z", type_of_formation: null, ranking: null},
    //   {id: 3371, title: " Lycée Français de Saint Domingue", created_at: "2018-10-18T07:10:43.449Z", updated_at: "2018-10-18T07:10:43.449Z", type_of_formation: null, ranking: null},
    //   {id: 3372, title: " Ecole Nationale Supérieure d'Informatique et de Mathématiques Appliquées de Grenoble", created_at: "2018-10-18T07:10:43.463Z", updated_at: "2018-10-18T07:10:43.463Z", type_of_formation: null, ranking: null},
    //   {id: 3374, title: " The University of Queensland", created_at: "2018-10-18T07:10:43.473Z", updated_at: "2018-10-18T07:10:43.473Z", type_of_formation: null, ranking: null},
    //   {id: 3376, title: " Kaplan Professional", created_at: "2018-10-18T07:10:43.487Z", updated_at: "2018-10-18T07:10:43.487Z", type_of_formation: null, ranking: null},
    //   {id: 3348, title: " Columbia Business School", created_at: "2018-10-18T07:10:43.190Z", updated_at: "2019-10-17T09:11:57.133Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3378, title: " Columbia University in the City of New York", created_at: "2018-10-18T07:10:43.495Z", updated_at: "2018-10-18T07:10:43.495Z", type_of_formation: null, ranking: null},
    //   {id: 3381, title: " Glion Institute of Higher Education", created_at: "2018-10-18T07:10:43.508Z", updated_at: "2018-10-18T07:10:43.508Z", type_of_formation: null, ranking: null},
    //   {id: 3382, title: " IAE de Poitiers", created_at: "2018-10-18T07:10:43.513Z", updated_at: "2018-10-18T07:10:43.513Z", type_of_formation: null, ranking: null},
    //   {id: 3384, title: " Universidad San Pablo-CEU", created_at: "2018-10-18T07:10:43.527Z", updated_at: "2018-10-18T07:10:43.527Z", type_of_formation: null, ranking: null},
    //   {id: 3385, title: " Institut national des Sciences appliquées de Rouen", created_at: "2018-10-18T07:10:43.532Z", updated_at: "2018-10-18T07:10:43.532Z", type_of_formation: null, ranking: null},
    //   {id: 3386, title: " ESIEA", created_at: "2018-10-18T07:10:43.539Z", updated_at: "2018-10-18T07:10:43.539Z", type_of_formation: null, ranking: null},
    //   {id: 3389, title: " Sciences Po Strasbourg", created_at: "2018-10-18T07:10:43.557Z", updated_at: "2018-10-18T07:10:43.557Z", type_of_formation: null, ranking: null},
    //   {id: 3390, title: " Harvard Extension School", created_at: "2018-10-18T07:10:43.562Z", updated_at: "2018-10-18T07:10:43.562Z", type_of_formation: null, ranking: null},
    //   {id: 3391, title: " Universiteit van Tilburg", created_at: "2018-10-18T07:10:43.566Z", updated_at: "2018-10-18T07:10:43.566Z", type_of_formation: null, ranking: null},
    //   {id: 3392, title: " Polytech'Nice-Sophia", created_at: "2018-10-18T07:10:43.570Z", updated_at: "2018-10-18T07:10:43.570Z", type_of_formation: null, ranking: null},
    //   {id: 3394, title: " Griffith College Dublin", created_at: "2018-10-18T07:10:43.583Z", updated_at: "2018-10-18T07:10:43.583Z", type_of_formation: null, ranking: null},
    //   {id: 3395, title: " Université du Havre", created_at: "2018-10-18T07:10:43.588Z", updated_at: "2018-10-18T07:10:43.588Z", type_of_formation: null, ranking: null},
    //   {id: 3396, title: " Universidad Torcuato di Tella", created_at: "2018-10-18T07:10:43.594Z", updated_at: "2018-10-18T07:10:43.594Z", type_of_formation: null, ranking: null},
    //   {id: 3397, title: " IESA", created_at: "2018-10-18T07:10:43.598Z", updated_at: "2018-10-18T07:10:43.598Z", type_of_formation: null, ranking: null},
    //   {id: 3398, title: " Université de Metz", created_at: "2018-10-18T07:10:43.604Z", updated_at: "2018-10-18T07:10:43.604Z", type_of_formation: null, ranking: null},
    //   {id: 3399, title: " Université catholique de Lille", created_at: "2018-10-18T07:10:43.609Z", updated_at: "2018-10-18T07:10:43.609Z", type_of_formation: null, ranking: null},
    //   {id: 3400, title: " Columbia University School of Law", created_at: "2018-10-18T07:10:43.615Z", updated_at: "2018-10-18T07:10:43.615Z", type_of_formation: null, ranking: null},
    //   {id: 3401, title: " University of Pennsylvania", created_at: "2018-10-18T07:10:43.624Z", updated_at: "2018-10-18T07:10:43.624Z", type_of_formation: null, ranking: null},
    //   {id: 3402, title: " University College London", created_at: "2018-10-18T07:10:43.628Z", updated_at: "2018-10-18T07:10:43.628Z", type_of_formation: null, ranking: null},
    //   {id: 3403, title: " Escuela Bancaria y Comercial", created_at: "2018-10-18T07:10:43.632Z", updated_at: "2018-10-18T07:10:43.632Z", type_of_formation: null, ranking: null},
    //   {id: 3404, title: " The Open University", created_at: "2018-10-18T07:10:43.636Z", updated_at: "2018-10-18T07:10:43.636Z", type_of_formation: null, ranking: null},
    //   {id: 3405, title: " University of Bath", created_at: "2018-10-18T07:10:43.640Z", updated_at: "2018-10-18T07:10:43.640Z", type_of_formation: null, ranking: null},
    //   {id: 3406, title: " Wine & Spirit Education Trust", created_at: "2018-10-18T07:10:43.644Z", updated_at: "2018-10-18T07:10:43.644Z", type_of_formation: null, ranking: null},
    //   {id: 3408, title: " Université d'Auvergne (Clermont-Ferrand I)", created_at: "2018-10-18T07:10:43.654Z", updated_at: "2018-10-18T07:10:43.654Z", type_of_formation: null, ranking: null},
    //   {id: 3409, title: " University of Sindh", created_at: "2018-10-18T07:10:43.658Z", updated_at: "2018-10-18T07:10:43.658Z", type_of_formation: null, ranking: null},
    //   {id: 3410, title: " National Chengchi University", created_at: "2018-10-18T07:10:43.664Z", updated_at: "2018-10-18T07:10:43.664Z", type_of_formation: null, ranking: null},
    //   {id: 3411, title: " Hofstra University", created_at: "2018-10-18T07:10:43.673Z", updated_at: "2018-10-18T07:10:43.673Z", type_of_formation: null, ranking: null},
    //   {id: 3412, title: " EEMI - L'École Européenne des Métiers de l'Internet", created_at: "2018-10-18T07:10:43.679Z", updated_at: "2018-10-18T07:10:43.679Z", type_of_formation: null, ranking: null},
    //   {id: 3375, title: " IÉSEG School of Management", created_at: "2018-10-18T07:10:43.482Z", updated_at: "2019-09-30T13:05:15.524Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3414, title: " Golden Gate University", created_at: "2018-10-18T07:10:43.692Z", updated_at: "2018-10-18T07:10:43.692Z", type_of_formation: null, ranking: null},
    //   {id: 3415, title: " ESCEN Ecole Supérieure de Commerce et d'Economie Numérique", created_at: "2018-10-18T07:10:43.699Z", updated_at: "2018-10-18T07:10:43.699Z", type_of_formation: null, ranking: null},
    //   {id: 3416, title: " Singapore Management University", created_at: "2018-10-18T07:10:43.703Z", updated_at: "2018-10-18T07:10:43.703Z", type_of_formation: null, ranking: null},
    //   {id: 3417, title: " Universidade de Trás-os-Montes e Alto Douro", created_at: "2018-10-18T07:10:43.711Z", updated_at: "2018-10-18T07:10:43.711Z", type_of_formation: null, ranking: null},
    //   {id: 3418, title: " l'Ecole de Coaching IFG", created_at: "2018-10-18T07:10:43.720Z", updated_at: "2018-10-18T07:10:43.720Z", type_of_formation: null, ranking: null},
    //   {id: 3419, title: " Sciences Po Grenoble", created_at: "2018-10-18T07:10:43.727Z", updated_at: "2018-10-18T07:10:43.727Z", type_of_formation: null, ranking: null},
    //   {id: 3420, title: " State University of New York College at Oswego", created_at: "2018-10-18T07:10:43.732Z", updated_at: "2018-10-18T07:10:43.732Z", type_of_formation: null, ranking: null},
    //   {id: 3421, title: " Cologne University of Applied Sciences", created_at: "2018-10-18T07:10:43.736Z", updated_at: "2018-10-18T07:10:43.736Z", type_of_formation: null, ranking: null},
    //   {id: 3422, title: " Ecole nationale supérieure de Mécanique et des Microtechniques", created_at: "2018-10-18T07:10:43.740Z", updated_at: "2018-10-18T07:10:43.740Z", type_of_formation: null, ranking: null},
    //   {id: 3423, title: " RMIT University", created_at: "2018-10-18T07:10:43.743Z", updated_at: "2018-10-18T07:10:43.743Z", type_of_formation: null, ranking: null},
    //   {id: 3424, title: " Université de Valenciennes et du Hainaut-Cambrésis", created_at: "2018-10-18T07:10:43.748Z", updated_at: "2018-10-18T07:10:43.748Z", type_of_formation: null, ranking: null},
    //   {id: 3425, title: " CQUniversity", created_at: "2018-10-18T07:10:43.752Z", updated_at: "2018-10-18T07:10:43.752Z", type_of_formation: null, ranking: null},
    //   {id: 3426, title: " Durham University", created_at: "2018-10-18T07:10:43.757Z", updated_at: "2018-10-18T07:10:43.757Z", type_of_formation: null, ranking: null},
    //   {id: 3427, title: " Universidad de San Andrés", created_at: "2018-10-18T07:10:43.761Z", updated_at: "2018-10-18T07:10:43.761Z", type_of_formation: null, ranking: null},
    //   {id: 3705, title: "CNED", created_at: "2019-09-19T09:28:24.910Z", updated_at: "2019-10-21T10:31:30.467Z", type_of_formation: "Formation à distance", ranking: ""},
    //   {id: 3432, title: " California State University", created_at: "2018-10-18T07:10:43.791Z", updated_at: "2018-10-18T07:10:43.791Z", type_of_formation: null, ranking: null},
    //   {id: 3433, title: " Luxembourg School of Business", created_at: "2018-10-18T07:10:43.799Z", updated_at: "2018-10-18T07:10:43.799Z", type_of_formation: null, ranking: null},
    //   {id: 3434, title: " Solvay Business School", created_at: "2018-10-18T07:10:43.805Z", updated_at: "2018-10-18T07:10:43.805Z", type_of_formation: null, ranking: null},
    //   {id: 3429, title: " Brown University", created_at: "2018-10-18T07:10:43.771Z", updated_at: "2019-04-04T08:22:54.732Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3383, title: " Institut catholique de Paris", created_at: "2018-10-18T07:10:43.517Z", updated_at: "2019-07-16T14:01:55.031Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3379, title: " Université Jean Moulin (Lyon III)", created_at: "2018-10-18T07:10:43.500Z", updated_at: "2019-07-16T14:02:22.419Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3430, title: " Universidad del Salvador", created_at: "2018-10-18T07:10:43.778Z", updated_at: "2019-05-14T13:04:41.198Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3373, title: " Ecole supérieure de Commerce de Pau", created_at: "2018-10-18T07:10:43.468Z", updated_at: "2019-07-16T14:03:25.976Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3359, title: " Aarhus Business School", created_at: "2018-10-18T07:10:43.297Z", updated_at: "2019-07-16T14:03:49.220Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3435, title: " Facultés universitaires 'Saint-Louis'", created_at: "2018-10-18T07:10:43.812Z", updated_at: "2018-10-18T07:10:43.812Z", type_of_formation: null, ranking: null},
    //   {id: 3436, title: " Facultés universitaires 'Saint-Louis'", created_at: "2018-10-18T07:10:43.819Z", updated_at: "2018-10-18T07:10:43.819Z", type_of_formation: null, ranking: null},
    //   {id: 3437, title: " Vatel Mauritius", created_at: "2018-10-18T07:10:43.826Z", updated_at: "2018-10-18T07:10:43.826Z", type_of_formation: null, ranking: null},
    //   {id: 3438, title: " 南京航空航天大学", created_at: "2018-10-18T07:10:43.839Z", updated_at: "2018-10-18T07:10:43.839Z", type_of_formation: null, ranking: null},
    //   {id: 3439, title: " La Fabrique - L'école des métiers de la mode et de la décoration", created_at: "2018-10-18T07:10:43.844Z", updated_at: "2018-10-18T07:10:43.844Z", type_of_formation: null, ranking: null},
    //   {id: 3440, title: " ISIPCA", created_at: "2018-10-18T07:10:43.848Z", updated_at: "2018-10-18T07:10:43.848Z", type_of_formation: null, ranking: null},
    //   {id: 3407, title: " IDRAC Business School", created_at: "2018-10-18T07:10:43.650Z", updated_at: "2020-02-19T16:44:05.342Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3388, title: " GOBELINS", created_at: "2018-10-18T07:10:43.551Z", updated_at: "2020-07-16T08:55:02.047Z", type_of_formation: "", ranking: ""},
    //   {id: 3387, title: " American University of Beirut", created_at: "2018-10-18T07:10:43.545Z", updated_at: "2020-03-19T17:25:52.474Z", type_of_formation: "Formation scientifique", ranking: ""},
    //   {id: 3380, title: " Université de Picardie Jules Verne (Amiens)", created_at: "2018-10-18T07:10:43.504Z", updated_at: "2020-07-16T08:55:03.875Z", type_of_formation: "", ranking: ""},
    //   {id: 3441, title: " University of Wisconsin-Madison", created_at: "2018-10-18T07:10:43.852Z", updated_at: "2018-10-18T07:10:43.852Z", type_of_formation: null, ranking: null},
    //   {id: 3443, title: " Dublin City University", created_at: "2018-10-18T07:10:43.859Z", updated_at: "2018-10-18T07:10:43.859Z", type_of_formation: null, ranking: null},
    //   {id: 3216, title: " Université François Rabelais de Tours", created_at: "2018-10-18T07:10:42.282Z", updated_at: "2019-10-21T10:32:25.519Z", type_of_formation: "Formation en commerce", ranking: ""},
    //   {id: 3446, title: " Queensland University of Technology", created_at: "2018-10-18T07:10:43.873Z", updated_at: "2018-10-18T07:10:43.873Z", type_of_formation: null, ranking: null},
    //   {id: 3447, title: " Institute of Chartered Accountants in England and Wales", created_at: "2018-10-18T07:10:43.879Z", updated_at: "2018-10-18T07:10:43.879Z", type_of_formation: null, ranking: null},
    //   {id: 3448, title: " ISIT", created_at: "2018-10-18T07:10:43.883Z", updated_at: "2018-10-18T07:10:43.883Z", type_of_formation: null, ranking: null},
    //   {id: 3449, title: " Macquarie University", created_at: "2018-10-18T07:10:43.888Z", updated_at: "2018-10-18T07:10:43.888Z", type_of_formation: null, ranking: null},
    //   {id: 3450, title: " University of California", created_at: "2018-10-18T07:10:43.894Z", updated_at: "2018-10-18T07:10:43.894Z", type_of_formation: null, ranking: null},
    //   {id: 3451, title: " Ecole spéciale des Travaux publics", created_at: "2018-10-18T07:10:43.898Z", updated_at: "2018-10-18T07:10:43.898Z", type_of_formation: null, ranking: null},
    //   {id: 3452, title: " Middlesex University", created_at: "2018-10-18T07:10:43.902Z", updated_at: "2018-10-18T07:10:43.902Z", type_of_formation: null, ranking: null},
    //   {id: 3453, title: " Dublin Institute of Technology", created_at: "2018-10-18T07:10:43.906Z", updated_at: "2018-10-18T07:10:43.906Z", type_of_formation: null, ranking: null},
    //   {id: 3454, title: " The University of Wolverhampton", created_at: "2018-10-18T07:10:43.911Z", updated_at: "2018-10-18T07:10:43.911Z", type_of_formation: null, ranking: null},
    //   {id: 3455, title: " University of Amsterdam", created_at: "2018-10-18T07:10:43.915Z", updated_at: "2018-10-18T07:10:43.915Z", type_of_formation: null, ranking: null},
    //   {id: 3456, title: " London Business School", created_at: "2018-10-18T07:10:43.927Z", updated_at: "2018-10-18T07:10:43.927Z", type_of_formation: null, ranking: null},
    //   {id: 3457, title: " Erasmus Universiteit Rotterdam", created_at: "2018-10-18T07:10:43.933Z", updated_at: "2018-10-18T07:10:43.933Z", type_of_formation: null, ranking: null},
    //   {id: 3458, title: " Université Paul Sabatier (Toulouse III)", created_at: "2018-10-18T07:10:43.939Z", updated_at: "2018-10-18T07:10:43.939Z", type_of_formation: null, ranking: null},
    //   {id: 3459, title: " Milwaukee Area Technical College", created_at: "2018-10-18T07:10:43.943Z", updated_at: "2018-10-18T07:10:43.943Z", type_of_formation: null, ranking: null},
    //   {id: 3460, title: " Curtin University of Technology", created_at: "2018-10-18T07:10:43.947Z", updated_at: "2018-10-18T07:10:43.947Z", type_of_formation: null, ranking: null},
    //   {id: 3461, title: " ESP Ecole Supérieure de Publicité", created_at: "2018-10-18T07:10:43.951Z", updated_at: "2018-10-18T07:10:43.951Z", type_of_formation: null, ranking: null},
    //   {id: 3462, title: " International University of Applied Sciences Bad Honnef · Bonn (IUBH)", created_at: "2018-10-18T07:10:43.959Z", updated_at: "2018-10-18T07:10:43.959Z", type_of_formation: null, ranking: null},
    //   {id: 3463, title: " Victoria University", created_at: "2018-10-18T07:10:43.965Z", updated_at: "2018-10-18T07:10:43.965Z", type_of_formation: null, ranking: null},
    //   {id: 3464, title: " Danmarks Tekniske Universitet", created_at: "2018-10-18T07:10:43.970Z", updated_at: "2018-10-18T07:10:43.970Z", type_of_formation: null, ranking: null},
    //   {id: 3465, title: " Université de Liège", created_at: "2018-10-18T07:10:43.974Z", updated_at: "2018-10-18T07:10:43.974Z", type_of_formation: null, ranking: null},
    //   {id: 3468, title: " École des sciences de la gestion (ESG UQAM)", created_at: "2018-10-18T07:10:43.988Z", updated_at: "2018-10-18T07:10:43.988Z", type_of_formation: null, ranking: null},
    //   {id: 3471, title: " Sarah Lawrence College", created_at: "2018-10-18T07:10:44.008Z", updated_at: "2018-10-18T07:10:44.008Z", type_of_formation: null, ranking: null},
    //   {id: 3472, title: " University of Bedfordshire", created_at: "2018-10-18T07:10:44.014Z", updated_at: "2018-10-18T07:10:44.014Z", type_of_formation: null, ranking: null},
    //   {id: 3473, title: " University of Stirling", created_at: "2018-10-18T07:10:44.018Z", updated_at: "2018-10-18T07:10:44.018Z", type_of_formation: null, ranking: null},
    //   {id: 3474, title: " Московский Государственный Институт Международных Отношений (Университет) МИД России (МГИМО)", created_at: "2018-10-18T07:10:44.022Z", updated_at: "2018-10-18T07:10:44.022Z", type_of_formation: null, ranking: null},
    //   {id: 3475, title: " Grenoble IAE", created_at: "2018-10-18T07:10:44.027Z", updated_at: "2018-10-18T07:10:44.027Z", type_of_formation: null, ranking: null},
    //   {id: 3476, title: " Staffordshire University", created_at: "2018-10-18T07:10:44.031Z", updated_at: "2018-10-18T07:10:44.031Z", type_of_formation: null, ranking: null},
    //   {id: 3477, title: " Babson College", created_at: "2018-10-18T07:10:44.037Z", updated_at: "2018-10-18T07:10:44.037Z", type_of_formation: null, ranking: null},
    //   {id: 3478, title: " 清华大学", created_at: "2018-10-18T07:10:44.041Z", updated_at: "2018-10-18T07:10:44.041Z", type_of_formation: null, ranking: null},
    //   {id: 3480, title: " Ecole internationale de management de paris (EIMP)", created_at: "2018-10-18T07:10:44.050Z", updated_at: "2018-10-18T07:10:44.050Z", type_of_formation: null, ranking: null},
    //   {id: 3481, title: " University of Maryland - Robert H. Smith School of Business", created_at: "2018-10-18T07:10:44.055Z", updated_at: "2018-10-18T07:10:44.055Z", type_of_formation: null, ranking: null},
    //   {id: 3482, title: " Harvard University", created_at: "2018-10-18T07:10:44.059Z", updated_at: "2018-10-18T07:10:44.059Z", type_of_formation: null, ranking: null},
    //   {id: 3483, title: " SAA - School of Management", created_at: "2018-10-18T07:10:44.063Z", updated_at: "2018-10-18T07:10:44.063Z", type_of_formation: null, ranking: null},
    //   {id: 3484, title: " Ecole supérieure de Commerce de Clermont-Ferrand", created_at: "2018-10-18T07:10:44.066Z", updated_at: "2018-10-18T07:10:44.066Z", type_of_formation: null, ranking: null},
    //   {id: 3485, title: " Kungliga tekniska högskolan", created_at: "2018-10-18T07:10:44.070Z", updated_at: "2018-10-18T07:10:44.070Z", type_of_formation: null, ranking: null},
    //   {id: 3486, title: " Polytech'Orléans", created_at: "2018-10-18T07:10:44.079Z", updated_at: "2018-10-18T07:10:44.079Z", type_of_formation: null, ranking: null},
    //   {id: 3487, title: " Universidad Autónoma de Madrid", created_at: "2018-10-18T07:10:44.083Z", updated_at: "2018-10-18T07:10:44.083Z", type_of_formation: null, ranking: null},
    //   {id: 3490, title: " Ecole des Mines de Douai", created_at: "2018-10-18T07:10:44.096Z", updated_at: "2018-10-18T07:10:44.096Z", type_of_formation: null, ranking: null},
    //   {id: 3491, title: " Universidade Federal do Rio de Janeiro", created_at: "2018-10-18T07:10:44.100Z", updated_at: "2018-10-18T07:10:44.100Z", type_of_formation: null, ranking: null},
    //   {id: 3492, title: " ESIGETEL - École Supérieure d'Ingénieurs en Informatique et Génie des Télécommunications", created_at: "2018-10-18T07:10:44.104Z", updated_at: "2018-10-18T07:10:44.104Z", type_of_formation: null, ranking: null},
    //   {id: 3493, title: " American University", created_at: "2018-10-18T07:10:44.108Z", updated_at: "2018-10-18T07:10:44.108Z", type_of_formation: null, ranking: null},
    //   {id: 3494, title: " Växjö University", created_at: "2018-10-18T07:10:44.112Z", updated_at: "2018-10-18T07:10:44.112Z", type_of_formation: null, ranking: null},
    //   {id: 3495, title: " Université du Littoral Côte d'Opale", created_at: "2018-10-18T07:10:44.119Z", updated_at: "2018-10-18T07:10:44.119Z", type_of_formation: null, ranking: null},
    //   {id: 3497, title: " Institut catholique d'Arts et Métiers", created_at: "2018-10-18T07:10:44.127Z", updated_at: "2018-10-18T07:10:44.127Z", type_of_formation: null, ranking: null},
    //   {id: 3498, title: " 國立臺灣大學", created_at: "2018-10-18T07:10:44.132Z", updated_at: "2018-10-18T07:10:44.132Z", type_of_formation: null, ranking: null},
    //   {id: 3500, title: " IAE Gustave Eiffel", created_at: "2018-10-18T07:10:44.142Z", updated_at: "2018-10-18T07:10:44.142Z", type_of_formation: null, ranking: null},
    //   {id: 3501, title: " Harvard Business School", created_at: "2018-10-18T07:10:44.146Z", updated_at: "2018-10-18T07:10:44.146Z", type_of_formation: null, ranking: null},
    //   {id: 3502, title: " Stanford University", created_at: "2018-10-18T07:10:44.150Z", updated_at: "2018-10-18T07:10:44.150Z", type_of_formation: null, ranking: null},
    //   {id: 3503, title: " Université d'Avignon et des Pays de Vaucluse", created_at: "2018-10-18T07:10:44.157Z", updated_at: "2018-10-18T07:10:44.157Z", type_of_formation: null, ranking: null},
    //   {id: 3504, title: " IUT de Montpellier-Sète", created_at: "2018-10-18T07:10:44.161Z", updated_at: "2018-10-18T07:10:44.161Z", type_of_formation: null, ranking: null},
    //   {id: 3505, title: " Humboldt-Universität zu Berlin", created_at: "2018-10-18T07:10:44.166Z", updated_at: "2018-10-18T07:10:44.166Z", type_of_formation: null, ranking: null},
    //   {id: 3506, title: " Stockholm School of Economics", created_at: "2018-10-18T07:10:44.171Z", updated_at: "2018-10-18T07:10:44.171Z", type_of_formation: null, ranking: null},
    //   {id: 3508, title: " KU Leuven", created_at: "2018-10-18T07:10:44.180Z", updated_at: "2018-10-18T07:10:44.180Z", type_of_formation: null, ranking: null},
    //   {id: 3509, title: " Московский Государственный Лингвистический Университет (МГЛУ)", created_at: "2018-10-18T07:10:44.185Z", updated_at: "2018-10-18T07:10:44.185Z", type_of_formation: null, ranking: null},
    //   {id: 3510, title: " EPF", created_at: "2018-10-18T07:10:44.189Z", updated_at: "2018-10-18T07:10:44.189Z", type_of_formation: null, ranking: null},
    //   {id: 3512, title: " Beijing Foreign Studies University", created_at: "2018-10-18T07:10:44.202Z", updated_at: "2018-10-18T07:10:44.202Z", type_of_formation: null, ranking: null},
    //   {id: 3514, title: " Centre de Formation des Journalistes", created_at: "2018-10-18T07:10:44.213Z", updated_at: "2018-10-18T07:10:44.213Z", type_of_formation: null, ranking: null},
    //   {id: 3515, title: " Universidad de Chile", created_at: "2018-10-18T07:10:44.219Z", updated_at: "2018-10-18T07:10:44.219Z", type_of_formation: null, ranking: null},
    //   {id: 3516, title: " Xavier Institute of Management", created_at: "2018-10-18T07:10:44.223Z", updated_at: "2018-10-18T07:10:44.223Z", type_of_formation: null, ranking: null},
    //   {id: 3517, title: " University of Abertay Dundee", created_at: "2018-10-18T07:10:44.228Z", updated_at: "2018-10-18T07:10:44.228Z", type_of_formation: null, ranking: null},
    //   {id: 3518, title: " University of Chicago", created_at: "2018-10-18T07:10:44.233Z", updated_at: "2018-10-18T07:10:44.233Z", type_of_formation: null, ranking: null},
    //   {id: 3519, title: " ENSP - Ecole Nationale Supérieure de la Police", created_at: "2018-10-18T07:10:44.236Z", updated_at: "2018-10-18T07:10:44.236Z", type_of_formation: null, ranking: null},
    //   {id: 3520, title: " Université de Perpignan Via Domitia", created_at: "2018-10-18T07:10:44.241Z", updated_at: "2018-10-18T07:10:44.241Z", type_of_formation: null, ranking: null},
    //   {id: 3521, title: " Université Bordeaux Montaigne (ex - Bordeaux 3)", created_at: "2018-10-18T07:10:44.246Z", updated_at: "2018-10-18T07:10:44.246Z", type_of_formation: null, ranking: null},
    //   {id: 3522, title: " University of Oxford", created_at: "2018-10-18T07:10:44.250Z", updated_at: "2018-10-18T07:10:44.250Z", type_of_formation: null, ranking: null},
    //   {id: 3523, title: " Ludwig-Maximilians Universität München", created_at: "2018-10-18T07:10:44.255Z", updated_at: "2018-10-18T07:10:44.255Z", type_of_formation: null, ranking: null},
    //   {id: 3524, title: " Aston University", created_at: "2018-10-18T07:10:44.259Z", updated_at: "2018-10-18T07:10:44.259Z", type_of_formation: null, ranking: null},
    //   {id: 3479, title: " Université de Technologie de Troyes", created_at: "2018-10-18T07:10:44.045Z", updated_at: "2019-04-04T08:23:16.983Z", type_of_formation: "Ecole D'ingénieur", ranking: ""},
    //   {id: 3442, title: " Ecole nationale d'Ingénieurs des Techniques des Industries agricoles et alimentaires", created_at: "2018-10-18T07:10:43.855Z", updated_at: "2019-05-27T08:05:57.816Z", type_of_formation: "Formation en agronomie", ranking: "Top 5"},
    //   {id: 3525, title: " International School of Geneva", created_at: "2018-10-18T07:10:44.264Z", updated_at: "2018-10-18T07:10:44.264Z", type_of_formation: null, ranking: null},
    //   {id: 3526, title: " Brunel University London", created_at: "2018-10-18T07:10:44.268Z", updated_at: "2018-10-18T07:10:44.268Z", type_of_formation: null, ranking: null},
    //   {id: 3527, title: " Linköping University", created_at: "2018-10-18T07:10:44.273Z", updated_at: "2018-10-18T07:10:44.273Z", type_of_formation: null, ranking: null},
    //   {id: 3528, title: " Institut G4", created_at: "2018-10-18T07:10:44.278Z", updated_at: "2018-10-18T07:10:44.278Z", type_of_formation: null, ranking: null},
    //   {id: 3529, title: " Queen's University", created_at: "2018-10-18T07:10:44.282Z", updated_at: "2018-10-18T07:10:44.282Z", type_of_formation: null, ranking: null},
    //   {id: 3530, title: " ENSTA Bretagne", created_at: "2018-10-18T07:10:44.286Z", updated_at: "2018-10-18T07:10:44.286Z", type_of_formation: null, ranking: null},
    //   {id: 3531, title: " École Supérieure d'Électricité", created_at: "2018-10-18T07:10:44.290Z", updated_at: "2018-10-18T07:10:44.290Z", type_of_formation: null, ranking: null},
    //   {id: 3469, title: " University of Virginia Darden School of Business", created_at: "2018-10-18T07:10:43.993Z", updated_at: "2019-12-09T15:10:34.247Z", type_of_formation: "Istec", ranking: ""},
    //   {id: 3467, title: " The University of Edinburgh", created_at: "2018-10-18T07:10:43.983Z", updated_at: "2019-11-26T14:44:07.601Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3496, title: " IUT Paris Descartes", created_at: "2018-10-18T07:10:44.123Z", updated_at: "2019-12-10T11:20:22.147Z", type_of_formation: "Formation en gestion", ranking: ""},
    //   {id: 3511, title: " Emory University - Goizueta Business School", created_at: "2018-10-18T07:10:44.193Z", updated_at: "2020-03-19T17:16:08.476Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3507, title: " ESG Ecoles de commerce", created_at: "2018-10-18T07:10:44.176Z", updated_at: "2020-03-19T17:20:12.373Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3444, title: " Université Rennes II - Haute-Bretagne", created_at: "2018-10-18T07:10:43.864Z", updated_at: "2020-03-19T17:23:05.687Z", type_of_formation: "Formation en sciences sociales", ranking: ""},
    //   {id: 3499, title: " Institute of Technology", created_at: "2018-10-18T07:10:44.137Z", updated_at: "2020-04-09T16:58:26.724Z", type_of_formation: "Formation en technologique", ranking: ""},
    //   {id: 3533, title: " The Ohio State University", created_at: "2018-10-18T07:10:44.299Z", updated_at: "2018-10-18T07:10:44.299Z", type_of_formation: null, ranking: null},
    //   {id: 3534, title: " Institut d'Etudes politiques de Rennes", created_at: "2018-10-18T07:10:44.307Z", updated_at: "2018-10-18T07:10:44.307Z", type_of_formation: null, ranking: null},
    //   {id: 3535, title: " Universidad Autónoma de Querétaro", created_at: "2018-10-18T07:10:44.311Z", updated_at: "2018-10-18T07:10:44.311Z", type_of_formation: null, ranking: null},
    //   {id: 3536, title: " Fundación Universidad de las Américas Puebla", created_at: "2018-10-18T07:10:44.321Z", updated_at: "2018-10-18T07:10:44.321Z", type_of_formation: null, ranking: null},
    //   {id: 3537, title: " Stockholm School of Entrepreneurship", created_at: "2018-10-18T07:10:44.327Z", updated_at: "2018-10-18T07:10:44.327Z", type_of_formation: null, ranking: null},
    //   {id: 3538, title: " The University of Sheffield", created_at: "2018-10-18T07:10:44.340Z", updated_at: "2018-10-18T07:10:44.340Z", type_of_formation: null, ranking: null},
    //   {id: 3540, title: " London School of Business and Finance LSBF", created_at: "2018-10-18T07:10:44.353Z", updated_at: "2018-10-18T07:10:44.353Z", type_of_formation: null, ranking: null},
    //   {id: 3541, title: " Udacity", created_at: "2018-10-18T07:10:44.359Z", updated_at: "2018-10-18T07:10:44.359Z", type_of_formation: null, ranking: null},
    //   {id: 3542, title: " Groupe ESC Troyes", created_at: "2018-10-18T07:10:44.363Z", updated_at: "2018-10-18T07:10:44.363Z", type_of_formation: null, ranking: null},
    //   {id: 3543, title: " Högskolan i Halmstad", created_at: "2018-10-18T07:10:44.367Z", updated_at: "2018-10-18T07:10:44.367Z", type_of_formation: null, ranking: null},
    //   {id: 3544, title: " National University of Ireland", created_at: "2018-10-18T07:10:44.372Z", updated_at: "2018-10-18T07:10:44.372Z", type_of_formation: null, ranking: null},
    //   {id: 3545, title: " Fachhochschule Regensburg", created_at: "2018-10-18T07:10:44.377Z", updated_at: "2018-10-18T07:10:44.377Z", type_of_formation: null, ranking: null},
    //   {id: 3546, title: " IICP", created_at: "2018-10-18T07:10:44.383Z", updated_at: "2018-10-18T07:10:44.383Z", type_of_formation: null, ranking: null},
    //   {id: 3547, title: " Jacobs University Bremen", created_at: "2018-10-18T07:10:44.389Z", updated_at: "2018-10-18T07:10:44.389Z", type_of_formation: null, ranking: null},
    //   {id: 3549, title: " Ensae ParisTech", created_at: "2018-10-18T07:10:44.399Z", updated_at: "2018-10-18T07:10:44.399Z", type_of_formation: null, ranking: null},
    //   {id: 3550, title: " Université de Salerno (Italie)", created_at: "2018-10-18T07:10:44.404Z", updated_at: "2018-10-18T07:10:44.404Z", type_of_formation: null, ranking: null},
    //   {id: 3551, title: " The University of Salford", created_at: "2018-10-18T07:10:44.408Z", updated_at: "2018-10-18T07:10:44.408Z", type_of_formation: null, ranking: null},
    //   {id: 3552, title: " Université Laval", created_at: "2018-10-18T07:10:44.413Z", updated_at: "2018-10-18T07:10:44.413Z", type_of_formation: null, ranking: null},
    //   {id: 3553, title: " University of Alberta", created_at: "2018-10-18T07:10:44.417Z", updated_at: "2018-10-18T07:10:44.417Z", type_of_formation: null, ranking: null},
    //   {id: 3554, title: " Shanghai University of Finance and Economics", created_at: "2018-10-18T07:10:44.421Z", updated_at: "2018-10-18T07:10:44.421Z", type_of_formation: null, ranking: null},
    //   {id: 3556, title: " École des Ponts Business School", created_at: "2018-10-18T07:10:44.433Z", updated_at: "2018-10-18T07:10:44.433Z", type_of_formation: null, ranking: null},
    //   {id: 3557, title: " Emory University", created_at: "2018-10-18T07:10:44.442Z", updated_at: "2018-10-18T07:10:44.442Z", type_of_formation: null, ranking: null},
    //   {id: 3558, title: " University of North Carolina at Chapel Hill", created_at: "2018-10-18T07:10:44.447Z", updated_at: "2018-10-18T07:10:44.447Z", type_of_formation: null, ranking: null},
    //   {id: 3559, title: " Institut Français du Design - Ecole Camondo", created_at: "2018-10-18T07:10:44.452Z", updated_at: "2018-10-18T07:10:44.452Z", type_of_formation: null, ranking: null},
    //   {id: 3560, title: " University of Hamburg", created_at: "2018-10-18T07:10:44.456Z", updated_at: "2018-10-18T07:10:44.456Z", type_of_formation: null, ranking: null},
    //   {id: 3561, title: " Yale University - Yale School of Management", created_at: "2018-10-18T07:10:44.461Z", updated_at: "2018-10-18T07:10:44.461Z", type_of_formation: null, ranking: null},
    //   {id: 3564, title: " The Institute of Directors", created_at: "2018-10-18T07:10:44.475Z", updated_at: "2018-10-18T07:10:44.475Z", type_of_formation: null, ranking: null},
    //   {id: 3565, title: " University of Illinois at Urbana-Champaign", created_at: "2018-10-18T07:10:44.482Z", updated_at: "2018-10-18T07:10:44.482Z", type_of_formation: null, ranking: null},
    //   {id: 3567, title: " Luleå tekniska universitet", created_at: "2018-10-18T07:10:44.497Z", updated_at: "2018-10-18T07:10:44.497Z", type_of_formation: null, ranking: null},
    //   {id: 3568, title: " Ecole Nationale Supérieure de Géologie", created_at: "2018-10-18T07:10:44.501Z", updated_at: "2018-10-18T07:10:44.501Z", type_of_formation: null, ranking: null},
    //   {id: 3569, title: " University of Westminster", created_at: "2018-10-18T07:10:44.506Z", updated_at: "2018-10-18T07:10:44.506Z", type_of_formation: null, ranking: null},
    //   {id: 3570, title: " Institut Supérieur d'Etudes en Alternance du Management", created_at: "2018-10-18T07:10:44.511Z", updated_at: "2018-10-18T07:10:44.511Z", type_of_formation: null, ranking: null},
    //   {id: 3571, title: " Universidad de Palermo", created_at: "2018-10-18T07:10:44.515Z", updated_at: "2018-10-18T07:10:44.515Z", type_of_formation: null, ranking: null},
    //   {id: 3572, title: " Fachhochschul-Studiengänge Kufstein Tirol", created_at: "2018-10-18T07:10:44.520Z", updated_at: "2018-10-18T07:10:44.520Z", type_of_formation: null, ranking: null},
    //   {id: 3573, title: " University of Leeds", created_at: "2018-10-18T07:10:44.525Z", updated_at: "2018-10-18T07:10:44.525Z", type_of_formation: null, ranking: null},
    //   {id: 3574, title: " University of Birmingham", created_at: "2018-10-18T07:10:44.530Z", updated_at: "2018-10-18T07:10:44.530Z", type_of_formation: null, ranking: null},
    //   {id: 3575, title: " San Francisco State University", created_at: "2018-10-18T07:10:44.535Z", updated_at: "2018-10-18T07:10:44.535Z", type_of_formation: null, ranking: null},
    //   {id: 3576, title: " International School of Business", created_at: "2018-10-18T07:10:44.539Z", updated_at: "2018-10-18T07:10:44.539Z", type_of_formation: null, ranking: null},
    //   {id: 3577, title: " Kingston University", created_at: "2018-10-18T07:10:44.546Z", updated_at: "2018-10-18T07:10:44.546Z", type_of_formation: null, ranking: null},
    //   {id: 3578, title: " SciencesCom - Audencia Group", created_at: "2018-10-18T07:10:44.552Z", updated_at: "2018-10-18T07:10:44.552Z", type_of_formation: null, ranking: null},
    //   {id: 3580, title: " Universidad de Zaragoza", created_at: "2018-10-18T07:10:44.566Z", updated_at: "2018-10-18T07:10:44.566Z", type_of_formation: null, ranking: null},
    //   {id: 3581, title: " Shanghai International Studies University", created_at: "2018-10-18T07:10:44.571Z", updated_at: "2018-10-18T07:10:44.571Z", type_of_formation: null, ranking: null},
    //   {id: 3582, title: " The Institute of Direct and Digital Marketing", created_at: "2018-10-18T07:10:44.576Z", updated_at: "2018-10-18T07:10:44.576Z", type_of_formation: null, ranking: null},
    //   {id: 3583, title: " State University of New York at Stony Brook", created_at: "2018-10-18T07:10:44.581Z", updated_at: "2018-10-18T07:10:44.581Z", type_of_formation: null, ranking: null},
    //   {id: 3584, title: " Ecole internationale des Sciences du Traitement de l'Information", created_at: "2018-10-18T07:10:44.586Z", updated_at: "2018-10-18T07:10:44.586Z", type_of_formation: null, ranking: null},
    //   {id: 3585, title: " Boston College", created_at: "2018-10-18T07:10:44.592Z", updated_at: "2018-10-18T07:10:44.592Z", type_of_formation: null, ranking: null},
    //   {id: 3586, title: " Hochschule Heilbronn - Hochschule für Technik und Wirtschaft", created_at: "2018-10-18T07:10:44.597Z", updated_at: "2018-10-18T07:10:44.597Z", type_of_formation: null, ranking: null},
    //   {id: 3587, title: " Université de Savoie", created_at: "2018-10-18T07:10:44.601Z", updated_at: "2018-10-18T07:10:44.601Z", type_of_formation: null, ranking: null},
    //   {id: 3588, title: " National Technical University of Athens", created_at: "2018-10-18T07:10:44.607Z", updated_at: "2018-10-18T07:10:44.607Z", type_of_formation: null, ranking: null},
    //   {id: 3593, title: " International Space University", created_at: "2018-10-18T07:10:44.635Z", updated_at: "2018-10-18T07:10:44.635Z", type_of_formation: null, ranking: null},
    //   {id: 3594, title: " Colorado School of Mines", created_at: "2018-10-18T07:10:44.639Z", updated_at: "2018-10-18T07:10:44.639Z", type_of_formation: null, ranking: null},
    //   {id: 3595, title: " Universidad Politécnica de Madrid", created_at: "2018-10-18T07:10:44.644Z", updated_at: "2018-10-18T07:10:44.644Z", type_of_formation: null, ranking: null},
    //   {id: 3597, title: " Università degli Studi di Parma", created_at: "2018-10-18T07:10:44.659Z", updated_at: "2018-10-18T07:10:44.659Z", type_of_formation: null, ranking: null},
    //   {id: 3599, title: " Lycée Français Charles de Gaulle de Londres", created_at: "2018-10-18T07:10:44.669Z", updated_at: "2018-10-18T07:10:44.669Z", type_of_formation: null, ranking: null},
    //   {id: 3600, title: " 한국과학기술원(KAIST)", created_at: "2018-10-18T07:10:44.674Z", updated_at: "2018-10-18T07:10:44.674Z", type_of_formation: null, ranking: null},
    //   {id: 3601, title: " IUT d'Aix Marseille", created_at: "2018-10-18T07:10:44.682Z", updated_at: "2018-10-18T07:10:44.682Z", type_of_formation: null, ranking: null},
    //   {id: 3603, title: " Wirtschaftsuniversität Wien", created_at: "2018-10-18T07:10:44.696Z", updated_at: "2018-10-18T07:10:44.696Z", type_of_formation: null, ranking: null},
    //   {id: 3604, title: " The American College of Greece", created_at: "2018-10-18T07:10:44.703Z", updated_at: "2018-10-18T07:10:44.703Z", type_of_formation: null, ranking: null},
    //   {id: 3605, title: " Universitat Pompeu Fabra", created_at: "2018-10-18T07:10:44.708Z", updated_at: "2018-10-18T07:10:44.708Z", type_of_formation: null, ranking: null},
    //   {id: 3606, title: " Institut Français de la Mode", created_at: "2018-10-18T07:10:44.714Z", updated_at: "2018-10-18T07:10:44.714Z", type_of_formation: null, ranking: null},
    //   {id: 3607, title: " LUISS Business School", created_at: "2018-10-18T07:10:44.719Z", updated_at: "2018-10-18T07:10:44.719Z", type_of_formation: null, ranking: null},
    //   {id: 3608, title: " University of Mannheim", created_at: "2018-10-18T07:10:44.724Z", updated_at: "2018-10-18T07:10:44.724Z", type_of_formation: null, ranking: null},
    //   {id: 3221, title: " Université Paris 13", created_at: "2018-10-18T07:10:42.307Z", updated_at: "2019-05-14T13:14:58.616Z", type_of_formation: "Formation en economie et sciences sociales", ranking: ""},
    //   {id: 3539, title: " Universidad de Los Andes", created_at: "2018-10-18T07:10:44.345Z", updated_at: "2019-05-14T13:03:19.613Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3598, title: " Université Toulouse 1 Capitole", created_at: "2018-10-18T07:10:44.664Z", updated_at: "2019-05-27T08:06:32.643Z", type_of_formation: "Formation en sciences sociales", ranking: ""},
    //   {id: 3699, title: "ecole architecture Louis 2", created_at: "2019-07-03T10:48:15.637Z", updated_at: "2019-07-16T14:02:55.618Z", type_of_formation: "Formation en architecture", ranking: ""},
    //   {id: 3591, title: " 서울대학교 / Seoul National University", created_at: "2018-10-18T07:10:44.626Z", updated_at: "2019-07-16T14:04:52.332Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3548, title: " Utrecht University", created_at: "2018-10-18T07:10:44.394Z", updated_at: "2019-07-16T14:11:33.892Z", type_of_formation: "Formation scientifique", ranking: ""},
    //   {id: 3562, title: " ISTEC - Ecole Supérieure de Commerce et de Marketing", created_at: "2018-10-18T07:10:44.466Z", updated_at: "2019-09-06T15:00:38.438Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3377, title: " ESME-Sudria | Ecole Spéciale de Mécanique et d'Electricité", created_at: "2018-10-18T07:10:43.491Z", updated_at: "2019-09-30T12:23:35.744Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3555, title: " HEC Paris - Ecole 42 - Télécom ParisTech", created_at: "2018-10-18T07:10:44.426Z", updated_at: "2019-09-30T12:23:40.918Z", type_of_formation: "Ecole de commerce", ranking: "Top 3"},
    //   {id: 3742, title: "Université Montpellier III", created_at: "2019-10-17T11:55:05.243Z", updated_at: "2019-10-21T10:32:51.119Z", type_of_formation: "Formation en sciences sociales", ranking: ""},
    //   {id: 3609, title: " Institution des Chartreux", created_at: "2018-10-18T07:10:44.728Z", updated_at: "2018-10-18T07:10:44.728Z", type_of_formation: null, ranking: null},
    //   {id: 3610, title: " Groupe Ecole supérieure de Commerce de Dijon-Bourgogne", created_at: "2018-10-18T07:10:44.737Z", updated_at: "2018-10-18T07:10:44.737Z", type_of_formation: null, ranking: null},
    //   {id: 3611, title: " Instituto Superior Técnico", created_at: "2018-10-18T07:10:44.752Z", updated_at: "2018-10-18T07:10:44.752Z", type_of_formation: null, ranking: null},
    //   {id: 3614, title: " Fairleigh Dickinson University", created_at: "2018-10-18T07:10:44.773Z", updated_at: "2018-10-18T07:10:44.773Z", type_of_formation: null, ranking: null},
    //   {id: 3616, title: " Sogang University", created_at: "2018-10-18T07:10:44.800Z", updated_at: "2018-10-18T07:10:44.800Z", type_of_formation: null, ranking: null},
    //   {id: 3617, title: " Duke University", created_at: "2018-10-18T07:10:44.806Z", updated_at: "2018-10-18T07:10:44.806Z", type_of_formation: null, ranking: null},
    //   {id: 3592, title: " Sup de Pub - Groupe INSEEC", created_at: "2018-10-18T07:10:44.631Z", updated_at: "2019-11-26T14:45:43.596Z", type_of_formation: "Ecole de communication", ranking: ""},
    //   {id: 3532, title: " Lycée Sainte-Geneviève", created_at: "2018-10-18T07:10:44.295Z", updated_at: "2019-11-26T14:43:46.694Z", type_of_formation: "Lycée", ranking: ""},
    //   {id: 3589, title: " Supélec", created_at: "2018-10-18T07:10:44.612Z", updated_at: "2019-12-10T11:22:45.992Z", type_of_formation: "Ecole d'ingénieur", ranking: "Top 3"},
    //   {id: 3590, title: " IFP School", created_at: "2018-10-18T07:10:44.619Z", updated_at: "2019-12-10T11:23:55.591Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3579, title: " Sciences Po Aix", created_at: "2018-10-18T07:10:44.557Z", updated_at: "2020-03-19T17:16:16.949Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3613, title: " Université de Technologie de Compiègne", created_at: "2018-10-18T07:10:44.766Z", updated_at: "2020-04-30T14:51:14.139Z", type_of_formation: "Formation en technologie", ranking: ""},
    //   {id: 3596, title: " Université d'Evry-Val d'Essonne", created_at: "2018-10-18T07:10:44.649Z", updated_at: "2020-04-22T11:15:43.228Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3602, title: " IGR-IAE Rennes", created_at: "2018-10-18T07:10:44.688Z", updated_at: "2020-03-19T17:23:24.929Z", type_of_formation: "Formation en gestion", ranking: ""},
    //   {id: 3618, title: " Pontificia Universidad Católica del Perú", created_at: "2018-10-18T07:10:44.814Z", updated_at: "2018-10-18T07:10:44.814Z", type_of_formation: null, ranking: null},
    //   {id: 3619, title: " Universität Regensburg", created_at: "2018-10-18T07:10:44.821Z", updated_at: "2018-10-18T07:10:44.821Z", type_of_formation: null, ranking: null},
    //   {id: 3620, title: " University of Helsinki", created_at: "2018-10-18T07:10:44.827Z", updated_at: "2018-10-18T07:10:44.827Z", type_of_formation: null, ranking: null},
    //   {id: 3621, title: " ESADE Business School", created_at: "2018-10-18T07:10:44.844Z", updated_at: "2018-10-18T07:10:44.844Z", type_of_formation: null, ranking: null},
    //   {id: 3622, title: " University of California", created_at: "2018-10-18T07:10:44.858Z", updated_at: "2018-10-18T07:10:44.858Z", type_of_formation: null, ranking: null},
    //   {id: 3624, title: " New York University - Leonard N. Stern School of Business", created_at: "2018-10-18T07:10:44.894Z", updated_at: "2018-10-18T07:10:44.894Z", type_of_formation: null, ranking: null},
    //   {id: 3625, title: " EESAB (École Européenne Supérieure d'Art de Bretagne)", created_at: "2018-10-18T07:10:44.900Z", updated_at: "2018-10-18T07:10:44.900Z", type_of_formation: null, ranking: null},
    //   {id: 3626, title: " Politechnika Gdańska", created_at: "2018-10-18T07:10:44.905Z", updated_at: "2018-10-18T07:10:44.905Z", type_of_formation: null, ranking: null},
    //   {id: 3627, title: " The University of Texas at Austin", created_at: "2018-10-18T07:10:44.909Z", updated_at: "2018-10-18T07:10:44.909Z", type_of_formation: null, ranking: null},
    //   {id: 3628, title: " Napier University", created_at: "2018-10-18T07:10:44.914Z", updated_at: "2018-10-18T07:10:44.914Z", type_of_formation: null, ranking: null},
    //   {id: 3629, title: " Ipesup", created_at: "2018-10-18T07:10:44.924Z", updated_at: "2018-10-18T07:10:44.924Z", type_of_formation: null, ranking: null},
    //   {id: 3630, title: " University of Ottawa / Université d'Ottawa", created_at: "2018-10-18T07:10:44.929Z", updated_at: "2018-10-18T07:10:44.929Z", type_of_formation: null, ranking: null},
    //   {id: 3631, title: " Delhi University", created_at: "2018-10-18T07:10:44.936Z", updated_at: "2018-10-18T07:10:44.936Z", type_of_formation: null, ranking: null},
    //   {id: 3633, title: " ICD Business School", created_at: "2018-10-18T07:10:44.949Z", updated_at: "2018-10-18T07:10:44.949Z", type_of_formation: null, ranking: null},
    //   {id: 3634, title: " Nanyang Technological University", created_at: "2018-10-18T07:10:44.954Z", updated_at: "2018-10-18T07:10:44.954Z", type_of_formation: null, ranking: null},
    //   {id: 3635, title: " Boston University School of Law", created_at: "2018-10-18T07:10:44.959Z", updated_at: "2018-10-18T07:10:44.959Z", type_of_formation: null, ranking: null},
    //   {id: 3636, title: " University of St.Gallen", created_at: "2018-10-18T07:10:44.963Z", updated_at: "2018-10-18T07:10:44.963Z", type_of_formation: null, ranking: null},
    //   {id: 3637, title: " University of Greenwich", created_at: "2018-10-18T07:10:44.968Z", updated_at: "2018-10-18T07:10:44.968Z", type_of_formation: null, ranking: null},
    //   {id: 3639, title: " IIM Lucknow", created_at: "2018-10-18T07:10:44.977Z", updated_at: "2018-10-18T07:10:44.977Z", type_of_formation: null, ranking: null},
    //   {id: 3640, title: " École des Mines de Nantes", created_at: "2018-10-18T07:10:44.982Z", updated_at: "2018-10-18T07:10:44.982Z", type_of_formation: null, ranking: null},
    //   {id: 3641, title: " Pôle d'Enseignement supérieur et de Recherche agronomique de Rennes", created_at: "2018-10-18T07:10:44.987Z", updated_at: "2018-10-18T07:10:44.987Z", type_of_formation: null, ranking: null},
    //   {id: 3642, title: " Universidade Federal do Ceará", created_at: "2018-10-18T07:10:44.991Z", updated_at: "2018-10-18T07:10:44.991Z", type_of_formation: null, ranking: null},
    //   {id: 3643, title: " Glyndŵr University", created_at: "2018-10-18T07:10:44.996Z", updated_at: "2018-10-18T07:10:44.996Z", type_of_formation: null, ranking: null},
    //   {id: 3612, title: " l'IAE Lyon : école de Management rattachée à l'Université Jean Moulin Lyon 3", created_at: "2018-10-18T07:10:44.758Z", updated_at: "2019-05-14T13:15:10.399Z", type_of_formation: "Formation en management", ranking: ""},
    //   {id: 3638, title: " Ecole centrale d'Electronique", created_at: "2018-10-18T07:10:44.972Z", updated_at: "2019-07-16T14:03:32.174Z", type_of_formation: "Ecole d'ingénieur", ranking: "Top 3"},
    //   {id: 3623, title: " University of California", created_at: "2018-10-18T07:10:44.876Z", updated_at: "2019-07-16T14:08:36.942Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3665, title: "3249", created_at: "2019-06-24T15:16:47.442Z", updated_at: "2019-07-16T14:10:47.345Z", type_of_formation: "Formation en ingénieurie", ranking: ""},
    //   {id: 3706, title: "ICAM", created_at: "2019-09-25T12:50:18.018Z", updated_at: "2019-09-30T13:04:56.965Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3700, title: "lauraschool", created_at: "2019-07-15T15:45:55.548Z", updated_at: "2019-07-16T14:11:46.677Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3087, title: " EDC Paris Business School", created_at: "2018-10-18T07:10:41.456Z", updated_at: "2019-09-30T13:05:13.302Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3644, title: " Universidad Antonio de Nebrija", created_at: "2018-10-18T07:10:45.000Z", updated_at: "2018-10-18T07:10:45.000Z", type_of_formation: null, ranking: null},
    //   {id: 3189, title: " MINES ParisTech", created_at: "2018-10-18T07:10:42.116Z", updated_at: "2019-07-16T14:02:36.497Z", type_of_formation: "Ecole d'ingénieur", ranking: "Top 3"},
    //   {id: 3184, title: " Université des Sciences et Technologies de Lille (Lille I)", created_at: "2018-10-18T07:10:42.077Z", updated_at: "2019-07-16T14:03:23.040Z", type_of_formation: "Formation en sciences & technologies", ranking: ""},
    //   {id: 3095, title: " Université Panthéon Sorbonne (Paris I)", created_at: "2018-10-18T07:10:41.494Z", updated_at: "2019-07-16T14:03:43.009Z", type_of_formation: "Comptabilité / gestion / finance ", ranking: ""},
    //   {id: 3740, title: "University of Kent", created_at: "2019-10-02T13:42:26.473Z", updated_at: "2019-10-14T09:23:41.303Z", type_of_formation: "Formation en commerce", ranking: ""},
    //   {id: 3701, title: "ISG+Epita", created_at: "2019-07-19T16:29:19.993Z", updated_at: "2019-09-06T14:59:32.973Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3741, title: "University of California San Diego", created_at: "2019-10-08T10:22:07.757Z", updated_at: "2019-10-14T09:23:37.082Z", type_of_formation: "Formation en commerce", ranking: ""},
    //   {id: 3702, title: "Web School Factory", created_at: "2019-07-22T14:48:02.643Z", updated_at: "2019-09-06T15:00:07.523Z", type_of_formation: "Formation en management numérique", ranking: ""},
    //   {id: 3182, title: " IAE Montpellier", created_at: "2018-10-18T07:10:42.058Z", updated_at: "2019-10-14T09:23:25.328Z", type_of_formation: "Formation en commerce", ranking: ""},
    //   {id: 3703, title: "iut belfort montbéliars", created_at: "2019-07-22T19:39:53.509Z", updated_at: "2019-09-06T15:01:10.969Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3649, title: " Ecole Supérieure de Management en Alternance (ESM-A)", created_at: "2018-10-18T07:10:45.027Z", updated_at: "2019-04-04T08:23:25.527Z", type_of_formation: "Ecole De Commerce", ranking: ""},
    //   {id: 3661, title: " AgroParisTech - Institut des sciences et industries du vivant et de l'environnement", created_at: "2018-10-18T07:10:45.105Z", updated_at: "2019-04-04T08:23:40.090Z", type_of_formation: "Ecole D'agronomie", ranking: "Top 3"},
    //   {id: 3652, title: " Institut International du Multimédia", created_at: "2018-10-18T07:10:45.046Z", updated_at: "2019-05-27T07:58:08.486Z", type_of_formation: "Formation en multimédia", ranking: ""},
    //   {id: 3646, title: " International Business School", created_at: "2018-10-18T07:10:45.011Z", updated_at: "2019-07-16T14:08:29.623Z", type_of_formation: "Formation en ingénieurie", ranking: ""},
    //   {id: 3645, title: " Southeast University", created_at: "2018-10-18T07:10:45.005Z", updated_at: "2018-10-18T07:10:45.005Z", type_of_formation: null, ranking: null},
    //   {id: 3647, title: " Université de Montréal - Ecole polytechnique de Montréal", created_at: "2018-10-18T07:10:45.017Z", updated_at: "2018-10-18T07:10:45.017Z", type_of_formation: null, ranking: null},
    //   {id: 3648, title: " ENC Lycée Blomet", created_at: "2018-10-18T07:10:45.021Z", updated_at: "2018-10-18T07:10:45.021Z", type_of_formation: null, ranking: null},
    //   {id: 3650, title: " Université de Carthage", created_at: "2018-10-18T07:10:45.031Z", updated_at: "2018-10-18T07:10:45.031Z", type_of_formation: null, ranking: null},
    //   {id: 3651, title: " Politecnico di Milano", created_at: "2018-10-18T07:10:45.036Z", updated_at: "2018-10-18T07:10:45.036Z", type_of_formation: null, ranking: null},
    //   {id: 3653, title: " Texas A&M International University", created_at: "2018-10-18T07:10:45.053Z", updated_at: "2018-10-18T07:10:45.053Z", type_of_formation: null, ranking: null},
    //   {id: 3654, title: " Université de Haute-Alsace Mulhouse-Colmar", created_at: "2018-10-18T07:10:45.059Z", updated_at: "2018-10-18T07:10:45.059Z", type_of_formation: null, ranking: null},
    //   {id: 3655, title: " University of California", created_at: "2018-10-18T07:10:45.063Z", updated_at: "2018-10-18T07:10:45.063Z", type_of_formation: null, ranking: null},
    //   {id: 3656, title: " Bond University", created_at: "2018-10-18T07:10:45.070Z", updated_at: "2018-10-18T07:10:45.070Z", type_of_formation: null, ranking: null},
    //   {id: 3657, title: " Universidad Adolfo Ibáñez", created_at: "2018-10-18T07:10:45.079Z", updated_at: "2018-10-18T07:10:45.079Z", type_of_formation: null, ranking: null},
    //   {id: 3658, title: " Thunderbird School of Global Management", created_at: "2018-10-18T07:10:45.084Z", updated_at: "2018-10-18T07:10:45.084Z", type_of_formation: null, ranking: null},
    //   {id: 3659, title: " 对外经济贸易大学", created_at: "2018-10-18T07:10:45.089Z", updated_at: "2018-10-18T07:10:45.089Z", type_of_formation: null, ranking: null},
    //   {id: 3660, title: " Fachhochschule Frankfurt am Main", created_at: "2018-10-18T07:10:45.098Z", updated_at: "2018-10-18T07:10:45.098Z", type_of_formation: null, ranking: null},
    //   {id: 3662, title: " Universitat Politècnica de València (UPV)", created_at: "2018-10-18T07:10:45.110Z", updated_at: "2018-10-18T07:10:45.110Z", type_of_formation: null, ranking: null},
    //   {id: 3663, title: " EURECOM", created_at: "2018-10-18T07:10:45.115Z", updated_at: "2018-10-18T07:10:45.115Z", type_of_formation: null, ranking: null},
    //   {id: 3489, title: " EPF Ecole d'Ingénieurs", created_at: "2018-10-18T07:10:44.092Z", updated_at: "2019-11-18T11:28:17.000Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3230, title: " HEI - Hautes Etudes d'Ingénieur", created_at: "2018-10-18T07:10:42.359Z", updated_at: "2019-11-18T11:30:21.080Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3165, title: " Université Paris-Est Marne-la-Vallée", created_at: "2018-10-18T07:10:41.920Z", updated_at: "2019-11-18T11:28:46.211Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3152, title: " Université Paris Sud (Paris XI)", created_at: "2018-10-18T07:10:41.838Z", updated_at: "2019-11-18T11:23:41.141Z", type_of_formation: "Formation scientifique", ranking: ""},
    //   {id: 3744, title: "Institut F2I", created_at: "2019-10-30T10:44:09.368Z", updated_at: "2019-11-18T11:24:00.757Z", type_of_formation: "Formation en informatique", ranking: ""},
    //   {id: 3256, title: " SUPINFO - The International Institute of Information Technology", created_at: "2018-10-18T07:10:42.497Z", updated_at: "2019-11-18T11:26:51.939Z", type_of_formation: "Formation en ingéniérie", ranking: ""},
    //   {id: 3778, title: "MBA", created_at: "2019-11-05T21:33:13.330Z", updated_at: "2019-11-18T11:27:10.320Z", type_of_formation: "Formation en administration", ranking: ""},
    //   {id: 3145, title: " University of Bristol", created_at: "2018-10-18T07:10:41.777Z", updated_at: "2019-11-18T11:27:59.324Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3779, title: "The Design Crew", created_at: "2019-11-14T11:33:33.801Z", updated_at: "2019-11-18T11:28:12.098Z", type_of_formation: "Formation en design", ranking: ""},
    //   {id: 3777, title: "Universidade de São Paulo", created_at: "2019-11-05T15:17:04.611Z", updated_at: "2019-11-18T11:29:42.799Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3563, title: " Massachusetts Institute of Technology - Sloan School of Management", created_at: "2018-10-18T07:10:44.471Z", updated_at: "2019-11-18T11:29:47.174Z", type_of_formation: "Formation en management", ranking: ""},
    //   {id: 3393, title: " Université de Poitiers", created_at: "2018-10-18T07:10:43.578Z", updated_at: "2019-11-18T11:30:04.936Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3353, title: " Institut national des Sciences appliquées de Lyon", created_at: "2018-10-18T07:10:43.228Z", updated_at: "2019-11-18T11:31:25.607Z", type_of_formation: "Formation scientifique", ranking: ""},
    //   {id: 3513, title: " École Hôtelière Savoie Léman", created_at: "2018-10-18T07:10:44.207Z", updated_at: "2019-11-18T15:54:09.027Z", type_of_formation: "Formation en hôtellerie", ranking: ""},
    //   {id: 3781, title: "Strate", created_at: "2019-11-19T22:58:24.148Z", updated_at: "2019-11-26T14:42:56.459Z", type_of_formation: "Ecole de design", ranking: ""},
    //   {id: 3783, title: "Efficom", created_at: "2019-11-20T17:47:34.915Z", updated_at: "2019-11-26T14:43:22.071Z", type_of_formation: "Ecole de communication", ranking: ""},
    //   {id: 3131, title: " Ecole centrale de Lille", created_at: "2018-10-18T07:10:41.683Z", updated_at: "2019-11-26T14:42:27.852Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3785, title: "ESRA", created_at: "2019-11-21T16:35:17.462Z", updated_at: "2019-11-26T14:43:39.849Z", type_of_formation: "Formation en audiovisuel", ranking: ""},
    //   {id: 3786, title: "ISTEC", created_at: "2019-11-26T10:05:30.275Z", updated_at: "2019-11-26T14:44:38.545Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3782, title: "Sup de web", created_at: "2019-11-20T17:46:38.650Z", updated_at: "2019-11-26T14:45:06.939Z", type_of_formation: "Formation web", ranking: ""},
    //   {id: 3704, title: "", created_at: "2019-07-31T13:29:43.946Z", updated_at: "2019-11-27T16:33:10.084Z", type_of_formation: "Opérations", ranking: ""},
    //   {id: 3780, title: "EISTI", created_at: "2019-11-19T12:54:49.112Z", updated_at: "2019-11-26T14:42:44.082Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3784, title: "IUT de vannes", created_at: "2019-11-20T17:47:34.923Z", updated_at: "2019-11-26T14:44:29.706Z", type_of_formation: "Formation en management", ranking: ""},
    //   {id: 3787, title: "IESA arts&culture", created_at: "2019-11-28T15:33:25.444Z", updated_at: "2019-11-28T15:33:25.444Z", type_of_formation: null, ranking: null},
    //   {id: 3788, title: "IUT DE SAINT DENIS", created_at: "2019-12-05T13:18:59.297Z", updated_at: "2019-12-10T10:27:07.884Z", type_of_formation: "Formation en technologie", ranking: ""},
    //   {id: 3789, title: "Aveiro University", created_at: "2019-12-05T20:42:05.554Z", updated_at: "2019-12-10T11:20:44.167Z", type_of_formation: "Formation en commerce", ranking: ""},
    //   {id: 3791, title: "Universite Hebraique de Jerusalem", created_at: "2019-12-05T22:41:26.072Z", updated_at: "2019-12-10T11:21:36.046Z", type_of_formation: "Formation en sciences economiques", ranking: ""},
    //   {id: 3793, title: "ESCEM", created_at: "2019-12-10T09:01:41.023Z", updated_at: "2019-12-10T11:22:59.493Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3790, title: "Technion", created_at: "2019-12-05T22:41:00.780Z", updated_at: "2019-12-10T11:23:23.250Z", type_of_formation: "Formation en technologies", ranking: ""},
    //   {id: 3792, title: "Cesacom", created_at: "2019-12-07T04:42:31.069Z", updated_at: "2019-12-10T11:23:38.494Z", type_of_formation: "Ecole de communication", ranking: ""},
    //   {id: 3794, title: "Université Rennes 1", created_at: "2019-12-17T10:32:35.248Z", updated_at: "2019-12-17T14:45:59.270Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3320, title: " Massachusetts Institute of Technology", created_at: "2018-10-18T07:10:43.006Z", updated_at: "2019-12-18T09:18:28.476Z", type_of_formation: "Formation en technologies", ranking: ""},
    //   {id: 3795, title: "Ecole Centrale Paris", created_at: "2019-12-17T21:38:46.074Z", updated_at: "2019-12-18T09:18:34.806Z", type_of_formation: "Ecole d'ingénieur", ranking: "Top 3"},
    //   {id: 3222, title: " Tecnológico de Monterrey", created_at: "2018-10-18T07:10:42.312Z", updated_at: "2020-03-19T17:15:26.964Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3797, title: "ecole de commerce de Tou", created_at: "2019-12-19T08:35:07.400Z", updated_at: "2019-12-19T14:10:28.109Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3852, title: "Agrosup", created_at: "2020-02-26T10:26:02.224Z", updated_at: "2020-03-19T17:16:34.154Z", type_of_formation: "Formation en agronomie", ranking: ""},
    //   {id: 3470, title: " IUT (Institut Universitaire de Technologie)", created_at: "2018-10-18T07:10:44.003Z", updated_at: "2020-03-19T17:16:40.652Z", type_of_formation: "Formation en gestion", ranking: ""},
    //   {id: 3854, title: "Mbway", created_at: "2020-03-05T11:00:59.046Z", updated_at: "2020-03-19T17:17:05.903Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3798, title: "Maison d'Education de la Légion d'Honneur", created_at: "2020-01-05T20:27:43.464Z", updated_at: "2020-01-07T11:25:55.356Z", type_of_formation: "Commerce", ranking: "Essca"},
    //   {id: 3796, title: "Mastère spécialié", created_at: "2019-12-19T08:34:40.555Z", updated_at: "2020-01-10T11:41:55.763Z", type_of_formation: "Product", ranking: "Essca"},
    //   {id: 3566, title: " Télécom Ecole de Management", created_at: "2018-10-18T07:10:44.487Z", updated_at: "2020-01-15T15:01:43.617Z", type_of_formation: "Seo", ranking: "Essca"},
    //   {id: 3809, title: "zerg", created_at: "2020-01-21T11:58:24.967Z", updated_at: "2020-01-21T11:58:24.967Z", type_of_formation: null, ranking: null},
    //   {id: 3799, title: "Ecole Hôteliere de Lausanne", created_at: "2020-01-08T10:04:06.976Z", updated_at: "2020-01-22T14:11:55.448Z", type_of_formation: "Formation hotelière", ranking: ""},
    //   {id: 3800, title: "Pescara", created_at: "2020-01-08T16:12:08.310Z", updated_at: "2020-01-22T14:12:21.641Z", type_of_formation: "Forma", ranking: ""},
    //   {id: 3855, title: "UBS", created_at: "2020-03-06T05:50:58.539Z", updated_at: "2020-03-19T17:17:34.257Z", type_of_formation: "Formation en ingéniérie", ranking: ""},
    //   {id: 3856, title: "IFAE", created_at: "2020-03-10T10:45:52.473Z", updated_at: "2020-03-19T17:19:24.980Z", type_of_formation: "Formation en ingénieurie", ranking: ""},
    //   {id: 3804, title: "IHECF", created_at: "2020-01-12T20:38:10.991Z", updated_at: "2020-01-22T14:17:02.393Z", type_of_formation: "Formation en comptabilité", ranking: ""},
    //   {id: 3313, title: " Université Grenoble Alpes", created_at: "2018-10-18T07:10:42.973Z", updated_at: "2020-03-19T17:20:04.679Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3803, title: "CRA", created_at: "2020-01-10T15:06:53.327Z", updated_at: "2020-02-10T11:29:12.201Z", type_of_formation: "Cardiologs", ranking: ""},
    //   {id: 3865, title: "Supoptique", created_at: "2020-04-27T08:42:44.301Z", updated_at: "2020-07-16T08:54:34.818Z", type_of_formation: "", ranking: ""},
    //   {id: 3857, title: "Aftec", created_at: "2020-03-10T10:45:52.479Z", updated_at: "2020-03-19T17:20:33.201Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3850, title: "ISGP", created_at: "2020-02-20T16:44:24.476Z", updated_at: "2020-03-19T17:22:16.490Z", type_of_formation: "Formation en gestion", ranking: ""},
    //   {id: 3851, title: "PSB", created_at: "2020-02-24T09:29:58.637Z", updated_at: "2020-03-19T17:22:19.119Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3805, title: "Université Gaston Berger", created_at: "2020-01-12T22:06:19.969Z", updated_at: "2020-02-19T14:54:22.841Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3806, title: "EIML Paris", created_at: "2020-01-14T17:33:51.702Z", updated_at: "2020-02-19T14:54:41.938Z", type_of_formation: "Ecole de marketing", ranking: ""},
    //   {id: 3807, title: "Université lille III", created_at: "2020-01-20T10:15:59.236Z", updated_at: "2020-02-19T14:54:45.380Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3810, title: "ESLSCA", created_at: "2020-01-21T18:57:36.968Z", updated_at: "2020-02-19T14:54:56.561Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3178, title: " Arts et Métiers ParisTech - École Nationale Supérieure d'Arts et Métiers", created_at: "2018-10-18T07:10:42.006Z", updated_at: "2020-02-19T14:55:20.645Z", type_of_formation: "Ecole d'ingénieur", ranking: "Top 5"},
    //   {id: 3808, title: "ESDES", created_at: "2020-01-20T10:57:44.848Z", updated_at: "2020-02-19T16:25:40.855Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3863, title: "EPHEC", created_at: "2020-04-22T14:20:31.258Z", updated_at: "2020-06-05T14:49:11.502Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3632, title: " Fudan University", created_at: "2018-10-18T07:10:44.941Z", updated_at: "2020-02-19T16:43:13.393Z", type_of_formation: "Formation en economie ", ranking: ""},
    //   {id: 3845, title: "Vatel Brussels", created_at: "2020-02-17T11:40:49.995Z", updated_at: "2020-02-19T16:43:57.898Z", type_of_formation: "Formation en hotellerie", ranking: ""},
    //   {id: 3846, title: "ESC Rennes", created_at: "2020-02-17T18:57:21.567Z", updated_at: "2020-02-19T16:44:00.910Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3849, title: "Institut des médias", created_at: "2020-02-19T11:13:51.972Z", updated_at: "2020-02-19T16:44:15.086Z", type_of_formation: "Formation en journalisme", ranking: ""},
    //   {id: 3848, title: "IUT Amiens", created_at: "2020-02-18T09:57:58.023Z", updated_at: "2020-03-19T17:25:13.610Z", type_of_formation: "Formation technologique", ranking: ""},
    //   {id: 3844, title: "Cifacom", created_at: "2020-02-07T15:59:54.131Z", updated_at: "2020-03-19T17:14:21.679Z", type_of_formation: "Formation en graphisme et audiovisuel", ranking: ""},
    //   {id: 3847, title: "IAE d'Amiens", created_at: "2020-02-18T09:57:40.291Z", updated_at: "2020-03-19T17:14:49.400Z", type_of_formation: "Formation en gestion", ranking: ""},
    //   {id: 3858, title: "ISEG", created_at: "2020-03-23T14:08:35.799Z", updated_at: "2020-04-09T16:58:07.612Z", type_of_formation: "Ecole de marketing", ranking: ""},
    //   {id: 3116, title: " Ecole nationale supérieure des Télécommunications de Bretagne / ENST Bretagne", created_at: "2018-10-18T07:10:41.597Z", updated_at: "2020-04-09T16:58:36.955Z", type_of_formation: "Ecole de communication", ranking: ""},
    //   {id: 3615, title: " Northwestern University - Kellogg School of Management", created_at: "2018-10-18T07:10:44.783Z", updated_at: "2020-04-09T16:58:45.673Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3466, title: " Royal Holloway", created_at: "2018-10-18T07:10:43.978Z", updated_at: "2020-04-22T11:15:59.850Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3859, title: "NEOMA BUSINESS SCHOOL", created_at: "2020-04-19T06:46:15.815Z", updated_at: "2020-04-22T11:16:03.466Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3861, title: "Sport Management School", created_at: "2020-04-21T10:06:43.210Z", updated_at: "2020-04-22T11:16:08.298Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3860, title: "Université Paris 10 Nanterre", created_at: "2020-04-21T08:40:48.866Z", updated_at: "2020-04-22T11:18:08.790Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3868, title: "Sciences Po Toulouse", created_at: "2020-05-04T12:57:55.305Z", updated_at: "2020-06-05T14:49:25.583Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3870, title: "Master RH", created_at: "2020-05-05T10:46:23.744Z", updated_at: "2020-06-05T14:49:43.196Z", type_of_formation: "Formation en ressources humaines", ranking: ""},
    //   {id: 3864, title: "ETS PARIS", created_at: "2020-04-24T09:34:03.360Z", updated_at: "2020-04-30T14:50:26.977Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3323, title: " Ecole de Management de Normandie", created_at: "2018-10-18T07:10:43.018Z", updated_at: "2020-04-30T14:50:29.605Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3866, title: "fghjk", created_at: "2020-04-27T14:03:47.783Z", updated_at: "2020-04-30T14:50:32.588Z", type_of_formation: "", ranking: ""},
    //   {id: 3867, title: "EPH", created_at: "2020-04-29T10:02:11.828Z", updated_at: "2020-04-30T14:50:56.346Z", type_of_formation: "Ecole de communication", ranking: ""},
    //   {id: 3906, title: "HEC Paris", created_at: "2020-05-10T16:43:07.969Z", updated_at: "2020-05-10T16:43:07.969Z", type_of_formation: null, ranking: null},
    //   {id: 3811, title: "siadep", created_at: "2020-01-23T09:53:56.351Z", updated_at: "2020-05-22T13:40:03.029Z", type_of_formation: "Seo", ranking: ""},
    //   {id: 3915, title: "Master", created_at: "2020-05-22T14:57:15.046Z", updated_at: "2020-05-22T14:57:15.046Z", type_of_formation: null, ranking: null},
    //   {id: 3862, title: "CREPS", created_at: "2020-04-21T10:06:54.547Z", updated_at: "2020-06-05T14:48:55.135Z", type_of_formation: "Formation sportive", ranking: ""},
    //   {id: 3871, title: "ISEE", created_at: "2020-05-06T16:26:49.633Z", updated_at: "2020-06-05T14:49:58.088Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3905, title: "Ecole Polytechnique Fédérale de Lausanne", created_at: "2020-05-10T16:42:31.226Z", updated_at: "2020-06-05T14:50:12.637Z", type_of_formation: "Ecole d'ingénieur", ranking: "Top 3"},
    //   {id: 3907, title: "Le Laptop", created_at: "2020-05-12T09:26:54.480Z", updated_at: "2020-06-05T14:50:37.463Z", type_of_formation: "Formation en ux", ranking: ""},
    //   {id: 3908, title: "Estienne", created_at: "2020-05-12T09:28:12.340Z", updated_at: "2020-06-05T14:50:54.037Z", type_of_formation: "", ranking: ""},
    //   {id: 3910, title: "université Paris 5", created_at: "2020-05-14T14:54:27.577Z", updated_at: "2020-06-05T14:51:14.281Z", type_of_formation: "Formation en economie", ranking: ""},
    //   {id: 3918, title: "brighton university", created_at: "2020-06-08T10:05:19.300Z", updated_at: "2020-06-08T10:05:19.300Z", type_of_formation: null, ranking: null},
    //   {id: 3920, title: "Brighton University", created_at: "2020-06-10T20:56:35.200Z", updated_at: "2020-06-10T20:56:35.200Z", type_of_formation: null, ranking: null},
    //   {id: 3926, title: "Itescia", created_at: "2020-07-02T20:35:02.799Z", updated_at: "2020-07-02T20:35:02.799Z", type_of_formation: null, ranking: null},
    //   {id: 3869, title: "ENSEIRB-MATMECA", created_at: "2020-05-04T20:04:49.438Z", updated_at: "2020-07-16T08:54:40.055Z", type_of_formation: "", ranking: ""},
    //   {id: 3872, title: "INEE", created_at: "2020-05-06T16:33:00.202Z", updated_at: "2020-07-16T08:54:46.265Z", type_of_formation: "", ranking: ""},
    //   {id: 3909, title: "ecole supérieur d'hôtelleries", created_at: "2020-05-13T15:14:52.421Z", updated_at: "2020-07-16T08:55:11.815Z", type_of_formation: "Ecole hotelière", ranking: ""},
    //   {id: 3911, title: "EFAB", created_at: "2020-05-15T14:45:43.082Z", updated_at: "2020-07-16T08:55:13.115Z", type_of_formation: "", ranking: ""},
    //   {id: 3913, title: "burgundy school of business", created_at: "2020-05-20T09:26:35.248Z", updated_at: "2020-07-16T08:55:21.330Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3914, title: "Master E-business & E-marketing", created_at: "2020-05-21T14:30:15.592Z", updated_at: "2020-07-16T08:55:24.679Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3916, title: "Licence", created_at: "2020-05-22T14:57:15.054Z", updated_at: "2020-07-16T08:55:26.005Z", type_of_formation: "", ranking: ""},
    //   {id: 3919, title: "Ecoris", created_at: "2020-06-09T08:01:18.580Z", updated_at: "2020-07-16T08:55:31.843Z", type_of_formation: "", ranking: ""},
    //   {id: 3921, title: "Télécom Paris", created_at: "2020-06-11T22:08:45.219Z", updated_at: "2020-07-16T08:55:35.122Z", type_of_formation: "", ranking: ""},
    //   {id: 3922, title: "ESADE", created_at: "2020-06-14T17:48:45.956Z", updated_at: "2020-07-16T08:55:36.142Z", type_of_formation: "", ranking: ""},
    //   {id: 3923, title: "isep", created_at: "2020-06-22T07:07:45.868Z", updated_at: "2020-07-16T08:55:42.196Z", type_of_formation: "", ranking: ""},
    //   {id: 3924, title: "Icademie", created_at: "2020-06-29T16:58:36.308Z", updated_at: "2020-07-16T08:55:43.928Z", type_of_formation: "", ranking: ""},
    //   {id: 3925, title: "ESTACA", created_at: "2020-06-29T17:05:02.333Z", updated_at: "2020-07-16T08:55:51.540Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3853, title: "Maîtrise", created_at: "2020-02-26T14:32:31.038Z", updated_at: "2020-07-09T12:51:44.967Z", type_of_formation: "Ux ", ranking: ""},
    //   {id: 3928, title: "Lycée Louise Weiss", created_at: "2020-07-15T16:12:50.895Z", updated_at: "2020-07-15T16:12:50.895Z", type_of_formation: null, ranking: null},
    //   {id: 3912, title: "Université Strasbourg", created_at: "2020-05-18T11:41:05.565Z", updated_at: "2020-07-16T08:55:18.399Z", type_of_formation: "", ranking: ""},
    //   {id: 3917, title: "University of St Andrews", created_at: "2020-06-02T18:43:11.480Z", updated_at: "2020-07-16T08:55:27.760Z", type_of_formation: "", ranking: ""},
    //   {id: 3227, title: " ESC Amiens", created_at: "2018-10-18T07:10:42.335Z", updated_at: "2020-07-16T08:55:30.933Z", type_of_formation: "Ecole de commerce", ranking: ""},
    //   {id: 3190, title: " Efrei - Ecole d'ingénieur généraliste en informatique et technologies du numérique", created_at: "2018-10-18T07:10:42.129Z", updated_at: "2020-07-16T08:55:40.539Z", type_of_formation: "Ecole d'ingénieur", ranking: ""},
    //   {id: 3927, title: "Institut Supérieur Vidal", created_at: "2020-07-03T09:41:18.948Z", updated_at: "2020-07-16T08:55:53.122Z", type_of_formation: "", ranking: ""},
    //   {id: 3929, title: "IIM", created_at: "2020-07-15T16:13:06.648Z", updated_at: "2020-07-16T08:55:54.925Z", type_of_formation: "", ranking: ""}
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
          getOptionLabel={option => option.title} 
          getOptionValue={option => option.id}
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
