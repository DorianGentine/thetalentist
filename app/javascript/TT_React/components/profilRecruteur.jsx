import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET } from '../actions';

import Navbar from '../containers/navbar'

class ProfilRecruteur extends Component {

  render () {
    return(
      <div>
        <Navbar path="profilRecruteur" />
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     conversations: state.conversations,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(null, null)(ProfilRecruteur);
