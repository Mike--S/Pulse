import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import layout from './layout.scss';
import utils from '../../assets/utils.scss';

@cssModules([layout, utils])

export default class Container extends Component {
  static propTypes = {
    styles: PropTypes.object
  };

  render() {
    const { styles, fullH, main } = this.props;
    let l = styles[0];
    let u = styles[1];
    let additionalClass = fullH ? ' ' + u.fullH : '';

    return (
      <div className={main ? l.mainContainer : l.container + additionalClass}>
        {this.props.children}
      </div>
    );
  }
}


