import React, { Component, PropTypes } from 'react';
import Button from '../button/button';

export default class SubmitButton extends Component {
  static propTypes = {

  };

  static contextTypes = {
    submitForm: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

  }

  render() {
    const { styles, className } = this.props;

    return (
      <Button
        className={className}
        options={{inlineGreen: true}}
        clickFunction={this.context.submitForm}>
        ЗАПИСАТЬ
      </Button>
    )
  }
}
