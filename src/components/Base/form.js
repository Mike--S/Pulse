import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import without from 'lodash.without';

export default class BaseForm extends Component {
  static propTypes = {
  };

  static childContextTypes = {
    submitForm: PropTypes.func,
    registerValidation: PropTypes.func,
    isFormValid: PropTypes.func
  };

  constructor() {
    super();
    this.validations = [];

    this.registerValidation = this.registerValidation.bind(this);
    this.removeValidation = this.removeValidation.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();

    if (this.isFormValid(true)) {
      this.props.onSubmit()
    }
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
    const { className } = this.props;

    return(
      <form className={className}>
        {this.props.children}
      </form>
    )
  }
}
