import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './spinner.scss';

@cssModules(styles)

export default class Spinner extends Component {
  static propTypes = {

  };

  render() {
    const { styles } = this.props;

    return (
      <div className={styles.pulse}></div>
    )
  }
}
