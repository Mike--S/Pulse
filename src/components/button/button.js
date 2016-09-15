import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import b from './buttons.scss';

@cssModules(b)
export default class Button extends Component {
  static propTypes = {
    options: PropTypes.object
  };

  render() {
    const { styles, options, children, className, clickFunction, label, disabled, onTouchTap } = this.props;
    var buttonClass;

    if (options) {
      switch(true) {
        case options.emphasize: {
            buttonClass = styles.emphasized;
          }
        break;
        case options.inline: {
            buttonClass = styles.inline;
          }
        break;
        case options.inlineGreen: {
            buttonClass = styles.inlineGreen;
          }
        break;
        case options.flat: {
            buttonClass = styles.flat;
          }
        break;
        case options.flatGreen: {
            buttonClass = styles.flatGreen;
          }
        break;
        case options.floatingAction: {
            buttonClass = styles.floatingAction;
          }
        break;
        case options.floatingActionGreen: {
            buttonClass = styles.floatingActionGreen;
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
    buttonClass += className ? ' ' + className : '';

    if (disabled) {
      return <button disabled={"disabled"} onTouchTap={onTouchTap} className={buttonClass} onClick={clickFunction}>
          {children}
        </button>
    }
    else {
      return <button onTouchTap={onTouchTap} className={buttonClass} onClick={clickFunction}>
        {children}
      </button>
    }

  }
}
