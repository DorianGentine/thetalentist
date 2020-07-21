import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import DatePicker from "react-datepicker";

// import { fetchGET } from '../../actions';

class RenderDatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: this.props.startDate,
      edited: false,
    };
  }

  handleChange = (date) => {
    this.setState({
      startDate: date,
      edited: true,
    })
  }

  render () {
    const name = this.props.name
    const minDate = this.props.minDate || false

    const ReactDatePickerAdapter = ({input}) => {
      let minDate = false
      let selected = this.state.startDate
      // if(typeof this.props.startDate != "Object"){
      //   console.log('this.props.startDate', this.props.startDate)
      //   this.props.startDate = new Date(this.props.startDate)
      // }
      if(this.props.startDate.getFullYear() == 1970 && !this.state.edited){
        selected = null
      }
      console.log('this.props.startDate', this.props.startDate)
      return(
          <DatePicker
          {...input}
          selected={selected}
          className="edit-gray-box-input"
          dateFormat={this.props.showYearPicker ? "yyyy" : "MM/yyyy" }
          isClearable={input.name.includes('years')}
          minDate={minDate ? new Date(minDate) : false}
          showYearPicker={this.props.showYearPicker}
          showMonthYearPicker={this.props.showMonthYearPicker}
          showFullMonthYearPicker={this.props.showMonthYearPicker}
          onChange={(value) => {
            input.onChange(value)
            this.handleChange(value)
          }}
        />
      )
    }

    return(
      <Field 
        name={name}
        component={ReactDatePickerAdapter}
      />
    );
  }
};

// function mapStateToProps(state) {
//   return {
//     talent: state.talent,
//     user: state.user,
//     companyTypes: state.companyTypes,
//     startups: state.startups,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchGET }, dispatch);
// }

export default connect(null, null)(RenderDatePicker);
