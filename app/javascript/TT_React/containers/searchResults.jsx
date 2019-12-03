import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET, actionTest } from '../actions';

class TalentRepertoire extends Component {
  render () {
    let nbTalents = 0
    let text, textStrong
    if(this.props.talents != null){
      nbTalents = this.props.talents.talents.length
    }

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
      <div className="container margin-bottom-30">
        <p id="search-results"><strong>{textStrong}</strong>{text}</p>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talents: state.talents,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     fetchGET: fetchGET,
//   }, dispatch);
// }

export default connect(mapStateToProps, null)(TalentRepertoire);
