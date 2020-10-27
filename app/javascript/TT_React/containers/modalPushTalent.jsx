import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchPost, fetchGET } from '../actions';
// import setJobColor from '../../components/setJobColor';

import ModalGuide from './modalGuide'
import ModalPushTalent from './modalPushTalent'

class TalentCard extends PureComponent {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     checked: this.props.talent.pin != false,
  //     icon: ["far", "bookmark"],
  //   };
  // }

  componentDidMount(){
    if(this.state.checked){
      this.setState({ icon: ["fas", "bookmark"] })
    }
  }

  render () {
    const talent = this.props.talent
    const headhunters = this.props.headhunters
    const pin = {
      talent_id: talent.id,
      headhunter_id: user.id,
    }

    return(
      <div className="col-xs-12 col-md-4 card-width">
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    headhunters: state.headhunters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openModalTalent, fetchPost, fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentCard);
