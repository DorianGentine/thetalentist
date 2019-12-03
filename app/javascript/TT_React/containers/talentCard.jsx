import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET } from '../actions';

class TalentCard extends Component {

  render () {
    const talent = this.props.talent

    return(
      <div>
        <h1>{talent.first_name}</h1>
      </div>
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     talents: state.talents,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(null, null)(TalentCard);
