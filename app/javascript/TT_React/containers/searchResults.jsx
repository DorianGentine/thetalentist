import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET, actionTest } from '../actions';

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textFilter: [],
      nbTalents: 0,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(this.props.filter)
    console.log(nextProps.filter)
    if(this.props.filter != nextProps.filter){
      this.setState({ textFilter: nextProps.filter})
      console.log("next", this.state.textFilter.stringify())
    }

    if(this.props.talents != nextProps.talents){
      this.setState({ nbTalents: nextProps.talents.talents.length})
    }
  }

  render () {
    let nbTalents = this.state.nbTalents
    let text, textStrong
    // if(this.props.talents != null){
    //   nbTalents = this.props.talents.talents.length
    // }

    if(nbTalents > 1){
      textStrong = `${nbTalents} profils`
      text = " correspondent à votre recherche"
    }else if(nbTalents == 1){
      textStrong = `${nbTalents} profil`
      text = " correspond à votre recherche"
    }else{
      textStrong = "Aucun profil"
      text = " ne correspond à votre recherche"
    }

    return(
      <div className="">
        <p>{`Résultats: ${nbTalents} talents filtrés`}</p>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talents: state.talents,
    filter: state.filter,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     fetchGET: fetchGET,
//   }, dispatch);
// }

export default connect(mapStateToProps, null)(SearchResults);
