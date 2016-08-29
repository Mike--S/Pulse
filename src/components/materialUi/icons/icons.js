import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from '../../../assets/icons.scss';

@cssModules(styles)

export default class extends Component {
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
      case 'remove':
        return (
          <svg className={styles.iconsCommon} fill={styles.IconExpandColor} height={styles.IconHeight} viewBox={'0 0 ' + styles.IconHeight + ' ' + styles.IconWidth} width={styles.IconWidth}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        );
      default: return(
        <div></div>
      )
    }
  }
}

