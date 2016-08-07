import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import without from 'lodash.without';

export default class Form extends Component {
  static propTypes = {
    blockParams: PropTypes.array.isRequired
  };

  static childContextTypes = {
    submitForm: PropTypes.func,
    registerValidation: PropTypes.func,
    isFormValid: PropTypes.func
  };

  static contextTypes = {
    timeValues: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.validations = [];

    this.getTimeDataByParamIds = this.getTimeDataByParamIds.bind(this);
    this.registerValidation = this.registerValidation.bind(this);
    this.removeValidation = this.removeValidation.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    const timeParams = this.getTimeDataByParamIds(this.props.blockParams, this.context.timeValues);

    if (this.isFormValid(true)) {
      this.props.onSubmit({
        controlBlockId: this.props.id,
        timeParams: timeParams
      })
    }
  }

  getTimeDataByParamIds(ids, timeData) {
    return _.filter(timeData, (time) => {
      return _.includes(ids, time.id.split('_')[0]);
    });
  }

  registerValidation(isValidFunc) {
    this.validations = [...this.validations, isValidFunc];
    return this.removeValidation.bind(null, isValidFunc);
  }

  removeValidation(ref) {
    this.validations = without(this.validations, ref);
  }

  isFormValid(showErrors) {
    return this.validations.reduce(
      (memo, isValidFunc) => {
        return isValidFunc(showErrors) && memo
      }, true)
  }

  getChildContext() {
    return {
      registerValidation: this.registerValidation,
      isFormValid: this.isFormValid,
      submitForm: this.submitForm
    };
  };

  render() {
    const { styles, className } = this.props;

    return(
      <form className={className}>
        {this.props.children}
      </form>
    )
  }
}
