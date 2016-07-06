import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import b from './buttons.scss';

@cssModules(b)
export default class Button extends Component {
  static propTypes = {
    options: PropTypes.object
  };

  render() {
    const { styles, options, children } = this.props;
    const { onTouchTap } = this.props;
    var buttonClass;
    if (options) {
      switch(true) {
        case options.emphasize: {
            buttonClass = styles.buttonEmphasized;
          }
        break;
        default: {
            buttonClass = styles.button;
          }
      }
    }
    else {
      buttonClass = styles.button;
    }

    return (
      <button onTouchTap={onTouchTap} className={buttonClass}>
        {children}
      </button>
    );
  }
}
