import React, { Component, PropTypes } from 'react';
import Button from '../../components/button/button';

export default class AddParamButton extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {className, clickFunction} = this.props;

    return <Button clickFunction={clickFunction} options={{floatingAction: true}} className={className}>+</Button>
  }
}
