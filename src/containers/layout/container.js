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
    const { styles, fullH, flex } = this.props;
    let l = styles[0];
    let u = styles[1];
    const additionalClass = fullH ? ' ' + u.fullH : '';

    if (flex) {
      return (
        <div className={l.container + additionalClass}>
          <div className={l.flexContainer + additionalClass}>
            {this.props.children}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className={l.container + additionalClass}>
          {this.props.children}
        </div>
      );
    }
  }
}


