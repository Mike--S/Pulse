import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import without from 'lodash.without';
import BaseForm from '../base/form';

export default class Form extends BaseForm {
  static propTypes = {
    blockParams: PropTypes.array.isRequired
  };

  static contextTypes = {
    timeValues: PropTypes.object.isRequired
  };

  constructor() {
    super();
  }

  submitForm(event) {
    event.preventDefault();
    const timeParams = this.getTimeDataByParamIds(this.props.blockParams, this.context.timeValues);

    if (this.isFormValid(true)) {
      this.props.onSubmit({
        controlBlockId: this.props.id || '',
        timeParams: timeParams
      })
    }
  }

  getTimeDataByParamIds(ids, timeData) {
    return _.filter(timeData, (time) => {
      return _.includes(ids, time.id.split('_')[0]);
    });
  }

  render() {
    const { styles, className } = this.props;

    return(
      <form className={className}>
        {this.props.children}
      </form>
    )
  }
}
