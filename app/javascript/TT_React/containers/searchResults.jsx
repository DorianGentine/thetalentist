import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET, actionTest } from '../actions';

class SearchResults extends Component {
  render () {
    let nbTalents = this.props.nbTalents
    let text

    if(nbTalents > 1){
      text = `${nbTalents} profils correspondent à votre recherche`
    }else if(nbTalents == 1){
      text = `${nbTalents} profil correspond à votre recherche`
    }else{
      text = "Aucun profil ne correspond à votre recherche"
    }

    return(
      <div className="">
        <p>{`Résultats: ${text}`}</p>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talents: state.talents,
    filter: state.filter,
    nbTalents: state.nbTalents,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     fetchGET: fetchGET,
//   }, dispatch);
// }

export default connect(mapStateToProps, null)(SearchResults);
