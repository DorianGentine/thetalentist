import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ReactSortable } from "react-sortablejs";

import { fetchGET, fetchPost, updateTalents } from '../actions';

import TalentCard from './talentCard'

class TalentRepertoire extends Component {
  constructor(props) {
    super(props)
    this.state = {
      admin: false,
      talents: null,
    };
  }

  handlePagy(promise){
    const current_page = promise.pagy.page
    const last_page = promise.pagy.last
    if(current_page < last_page && last_page != 1){
      fetch(promise.pagy.next_url, {method: "GET", headers: { 'Content-Type': 'application/json'}})
      .then(r => r.json())
      .then(body => {
        const talents = this.state.talents
        const totalTalents = talents.concat(body.talents)
        this.setState({
          talents: totalTalents
        })
        this.handlePagy(body)
      })
    }else if(last_page != 1){
      const result = {
        pagy: promise.pagy,
        talents: this.state.talents
      }
      this.props.updateTalents(result)
    }
  }

  componentDidMount(){
    if(this.props.talents === null){
      const that = this
      this.props.fetchGET('/api/v1/talents/repertoire_pagy', "FETCH_TALENTS", function(promise){
        that.handlePagy(promise)
      })
    }else{
      this.setState({
        admin: this.props.user.is_a_model == "Talentist",
        talents: this.props.talents.talents,
      })
      this.props.updateNbTalents(this.props.talents.pagy.count)
    }
  }

  toDisplay = (talent, filter) => {
    // FILTRE METIER A SUPPRIMER
      const talentJob = talent.job.toLowerCase()
      const jobsToDelete = [
        "opérations",
        "rh",
        "finance",
        "finances",
        "digital",
        "developper"
      ]
      if(jobsToDelete.includes(talentJob)){
        return false
      }
    // END
    const displayRem = () => {
      const remTalent = Math.abs(parseInt(talent.next_aventure.remuneration, 10))/10
      const remFilter = parseInt(filter.remFilter, 10)
      if(filter.remFilter == 0){
        return true
      }
      // Affiche rem de 30 si remFilter en dessous de 30
      if(remFilter <= 3 && remTalent <= 3){
        return true
      }
      // N'affiche pas les rem de -150 si remFilter à 150
      if(remFilter == 15 && remTalent < 15){
        return false
      }
      // Affiche rem de 100-150 quand remFilter dépasse 100
      if(remFilter >= 10 && remTalent >= 10){
        return true
      }
      // Affiche rem compris dans la vingtaine de remFilter
      if(remTalent < remFilter + 1 && remTalent >= remFilter - 1){
        return true
      }
    }
    const displayMobility = () => {
      if(filter.mobilityFilter.length == 0){
        return true
      }else{
        let toD = false
        if(talent.next_aventure.mobilities){
          for (let i = 0; i < talent.next_aventure.mobilities.length; i++) {
            const title = talent.next_aventure.mobilities[i].title;
            if(filter.mobilityFilter.includes(title.toLowerCase())){
              toD = true
            }
          }
        }
        return toD
      }
    }
    if(filter.pinFilter && talent.pin == false){
      return false
    }
    if(filter.jobFilter.length != 0 && !filter.jobFilter.includes(talent.job.toLowerCase())){
      return false
    }
    if(!displayRem()){
      return false
    }
    if(!displayMobility()){
      return false
    }
    return true
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.talents != nextProps.talents && this.props.talents === null){
      this.setState({
        talents: nextProps.talents.talents,
      })
      this.props.updateNbTalents(nextProps.talents.pagy.count)
    }
    if(this.props.user != nextProps.user && this.props.user === null){
      this.setState({
        admin: nextProps.user.is_a_model == "Talentist",
      })
    }
    if(this.props.filter != nextProps.filter){
      let nbTalents = 0
      const filter = nextProps.filter
      for (let i = 0; i < this.state.talents.length; i++) {
        const talent = this.state.talents[i];
        if(this.toDisplay(talent, filter))
        nbTalents++
        if(i + 1 == this.state.talents.length){
          this.props.updateNbTalents(nbTalents)
          nbTalents = 0
        }
      }
    }
  }

  render () {
    const filter = this.props.filter

    const handleEnd = () => {
      let newOrder = []
      for (var i = 0; i < this.state.talents.length; i++) {
        newOrder.push(this.state.talents[i].id)
      }
      this.props.fetchPost("/api/v1/talents/sort", newOrder, "PATCH")
    }

    const renderSortable = () => {
      return <ReactSortable
            list={this.state.talents}
            onEnd={handleEnd}
            setList={newState => this.setState({ talents: newState })}
          >
            {this.state.talents.map((talent, index) => (
              <TalentCard talent={talent} index={index} key={index} />
            ))}
          </ReactSortable>
    }

    const renderTalents = () => this.state.talents.map((talent, index) => {
      if(this.toDisplay(talent, filter)){
        return <TalentCard talent={talent} index={index} key={index} />
      }
    })

    if(this.state.talents != null && this.state.admin && filter.empty()){
      return(
        <div className="row">
          {renderSortable()}
        </div>
      );
    }else if(this.state.talents != null){
      return(
        <div className="row">
          {renderTalents()}
        </div>
      )
    }else{
      return <p className="text-align-center">Chargement...</p>
    }
  }
};

function mapStateToProps(state) {
  return {
    talents: state.talents,
    nbTalents: state.nbTalents,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost, updateTalents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentRepertoire);
