import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from 'formBlock.scss';

@cssModules(styles)

export default class FormBlock extends Component {
  static propTypes = {

  };

  render() {
    const { styles } = this.props;
    return (
      <article>

      </article>
    )
  }
}
