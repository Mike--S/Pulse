import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from 'diary.scss';

@cssModules(styles)

export default class diary extends Component {
  static propTypes = {

  };

  render() {
    const { styles } = this.props;

  }
}
