import React, { Component, PropTypes } from 'react';
import Button from '../../components/button/button';

export default class AddParamButton extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {className} = this.props;

    return <Button options={{floatingAction: true}} className={className}>123</Button>
  }
}
