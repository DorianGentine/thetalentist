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
    if(this.props.filter != nextProps.filter){
      let nbTalents = 0
      const filter = nextProps.filter
      for (let i = 0; i < this.state.talents.length; i++) {
        const talent = this.state.talents[i]
        if(filter.includes("pinned") && talent.pin == false){
          nbTalents++
        }else if(filter.includes("pinned") && talent.pin != false){
          if(filter.length === 1 || filter.includes(talent.job.toLowerCase())){
            nbTalents++
          }
        }else if(filter.length === 0 || filter.includes(talent.job.toLowerCase())){
          nbTalents++
        }
      }
      this.props.updateTalents(nbTalents)
    }
  }

  render () {
    const filter = this.props.filter

    const renderSortable = () => {
      return <ReactSortable
            list={this.state.talents}
            setList={newState => {
              let newOrder = []
              for (var i = 0; i < newState.length; i++) {
                newOrder.push(newState[i].id)
              }
              this.props.fetchPost("/api/v1/talents/sort", newOrder, "PATCH")
              this.setState({ talents: newState })}
            }
          >
            {this.state.talents.map((talent, index) => (
              <TalentCard talent={talent} index={index} key={index} />
            ))}
          </ReactSortable>
    }

    const renderTalents = () => this.state.talents.map((talent, index) => {
      if(filter.includes("pinned") && talent.pin == false){
        return null
      }else if(filter.includes("pinned") && talent.pin != false){
        if(filter.length === 1 || filter.includes(talent.job.toLowerCase())){
          this.setState( nbTalents => { nbTalents: nbTalents + 1})
          return <TalentCard talent={talent} index={index} key={index} />
        }
      }else if(filter.length === 0 || filter.includes(talent.job.toLowerCase())){
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
    filter: state.filter,
    nbTalents: state.nbTalents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET, fetchPost, updateTalents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentRepertoire);
