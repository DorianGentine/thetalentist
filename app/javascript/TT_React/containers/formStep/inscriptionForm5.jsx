import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchGET } from '../../actions';
import { setFormContainerClass } from '../../../components/formContainerClass';

import CheckBoxForm from '../form/checkBoxForm'
import MessageMagda from './messageMagda'


class InscriptionForm5 extends Component {

  componentDidMount(){
    if (this.props.sectors === null) {
      this.props.fetchGET('/api/v1/sectors', "FETCH_SECTORS")
    }
  }

  render () {
    const actualStep = this.props.stepForm
    let sectors = this.props.sectors
    if(sectors != null){
      sectors = sectors.sectors
    }

    return(
      <div className={setFormContainerClass(actualStep, 5)}>
        <MessageMagda
          text1={`Tu peux maintenant ajouter jusqu'à 3 secteurs d'activité, et ainsi davantage cibler ta recherche.`}
          text2={`Quels sont les secteurs que tu privilégies ?`}
        />
        <CheckBoxForm name="next_aventure_attributes[sector_ids]" limit={3} choices={sectors} formValue={this.props.formValue}/>
        <button
          className="btn-violet-square margin-left-55"
          type="submit"
          disabled={this.props.submitting || this.props.formValue.next_aventure_attributes.sector_ids.length == 0}>
          Étape suivante
        </button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    sectors: state.sectors,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGET }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionForm5);
