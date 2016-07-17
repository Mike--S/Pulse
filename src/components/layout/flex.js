import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import layout from './layout.scss';
import utils from '../../assets/utils.scss';

@cssModules([layout, utils])

export class FlexContainer extends Component {
  static propTypes = {
    styles: PropTypes.object
  };

  render() {
    const { styles, fullH } = this.props;
    let l = styles[0];
    let u = styles[1];
    let additionalClass = fullH ? ' ' + u.fullH : '';

    return (
      <div className={l.flexContainer + additionalClass}>
        {this.props.children}
      </div>
    )
  }
}

@cssModules(layout)

export class Col extends Component {
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


