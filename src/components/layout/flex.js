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
    const { styles, fullH, alignItems } = this.props;
    let l = styles[0];
    let u = styles[1];
    let additionalClass = fullH ? ' ' + u.fullH : '';
    additionalClass += alignItems ? ' ' + l.flexContainerCentred: '';

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
    const { styles, xs, md, sm, lg, children, options } = this.props;
    let additionalClass = options && options.indents ? "Indented" : "";
    const xsClass = xs ? styles['colXS' + xs + additionalClass ]  + ' ' : '';
    const mdClass = md ? styles['col' + md + additionalClass] + ' ' : '';
    const smClass = sm ? styles['colSM' + sm + additionalClass] + ' ' : '';
    const lgClass = lg ? styles['colLG' + lg + additionalClass] + ' ' : '';

    return (
      <div className={xsClass + mdClass + smClass + lgClass + ' '}>
        {children}
      </div>
    );
  }
}


