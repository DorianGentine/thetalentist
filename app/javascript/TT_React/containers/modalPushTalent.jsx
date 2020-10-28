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
    if(!this.props.headhunters && this.props.talent){
      console.log('this.props.talent', this.props.talent)
      this.props.fetchGET('/api/v1/headhunters', "FETCH_HEADHUNTERS")
    }
  }

  render () {
    const talent = this.props.talent
    const headhunters = this.props.headhunters

    if(talent){
      console.log('talent', talent)
      const closeModal = () => {
        this.props.pushTalent(null)
      }

      return(
        <div className='modal active'>
            <div className="close-modal" onClick={closeModal}></div>
            <div className="modal-content-react">
              <p>TEEEST</p>
            </div>
        </div>
      );
    }else{
      return null
    }
  }
};

function mapStateToProps(state) {
  return {
    headhunters: state.headhunters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost, fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentCard);
