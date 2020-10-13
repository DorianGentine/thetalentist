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

  componentDidMount(){
    if(this.props.talents === null){
      this.props.fetchGET('/api/v1/talents/repertoire', "FETCH_TALENTS")
    }else{
      this.setState({
        admin: this.props.talents.user.admin,
        talents: this.props.talents.talents,
      })
      this.props.updateTalents(this.props.talents.talents.length)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.talents != nextProps.talents && this.props.talents === null){
      this.setState({
        admin: nextProps.talents.user.admin,
        talents: nextProps.talents.talents,
      })
      this.props.updateTalents(nextProps.talents.talents.length)
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
          for (let i = 0; i < talent.next_aventure.mobilities.length; i++) {
            const title = talent.next_aventure.mobilities[i].title;
            if(filter.mobilityFilter.includes(title.toLowerCase())){
              toD = true
            }
          }
          return toD
        }
      }

      const toDisplay = () => {
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

      if(toDisplay()){
        return <TalentCard talent={talent} index={index} key={index} />
      }
    })

    if(this.state.talents != null && this.state.admin && filter.length === 0){
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
    // filter: state.filter,
    nbTalents: state.nbTalents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost, updateTalents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentRepertoire);
