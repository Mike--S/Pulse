import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from '../../../assets/icons.scss';

@cssModules(styles)

export default class  extends Component {
  static propTypes = {
    iconName: PropTypes.string.isRequired
  };

  render() {
    const { styles, iconName } = this.props;
    switch (iconName) {
      case 'expand':
        return (
          <svg fill={styles.IconExpandColor} height={styles.IconHeight} viewBox={'0 0 ' + styles.IconHeight + ' ' + styles.IconWidth} width={styles.IconWidth}>
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        );
      case 'collapse':
        return (
          <svg fill={styles.IconExpandColor} height={styles.IconHeight} viewBox={'0 0 ' + styles.IconHeight + ' ' + styles.IconWidth} width={styles.IconWidth}>
            <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        );
      default: return(
        <div></div>
      )
    }
  }
}

