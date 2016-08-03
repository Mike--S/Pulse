import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import b from './buttons.scss';

@cssModules(b)
export default class Button extends Component {
  static propTypes = {
    options: PropTypes.object
  };

  render() {
    const { styles, options, children, className, clickFunction, disabled } = this.props;
    const { onTouchTap } = this.props;
    var buttonClass;
    if (options) {
      switch(true) {
        case options.emphasize: {
            buttonClass = styles.buttonEmphasized;
          }
        break;
        case options.inline: {
            buttonClass = styles.buttonInline;
          }
        break;
        case options.inlineGreen: {
            buttonClass = styles.buttonInlineGreen;
          }
        break;
        case options.flat: {
            buttonClass = styles.buttonFlat;
          }
        break;
        case options.ftatGreen: {
            buttonClass = styles.buttonFlatGreen;
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
