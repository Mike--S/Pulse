import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './layout.scss';

@cssModules(styles)

export default class Col extends Component {
  static propTypes = {
    styles: PropTypes.object
  };

  render() {
    const { styles, xs, md, sm, f, children } = this.props;
    const xsClass = xs ? styles['colXS' + xs] + ' ' : '';
    const mdClass = md ? styles['col' + md] + ' ' : '';
    const smClass = sm ? styles['colSM' + sm] + ' ' : '';

    return (
      <div className={xsClass + mdClass + smClass + ' ' + styles.colFullHeight}>
        {children}
      </div>
    );
  }
}


