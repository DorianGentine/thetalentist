import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { fetchGET } from '../../actions';
// import setJobColor from '../../../components/setJobColor';

// import Navbar from '../containers/navbar'

class Formations extends Component {

  render () {
    let talent = this.props.talent
    let formations = []
    if(talent){
      formations = talent.formations
    }

    const renderFormations = () => {
      return <p>SALUT</p>
    }

    return(
      <div>
        <div className="section-h3-wrap">
          <h3 className="section-h3">Formations</h3>
          <span className="after"></span>
        </div>

        <div className="gray-border-box">
          <h4 className="box-title">Mes formations antérieures</h4>
          <h5 className="box-subtitle">{`${formations.length} formations`}</h5>
          <div>
            {formations.length > 0 ? renderFormations() : null}
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    talent: state.talent,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(mapStateToProps, null)(Formations);
