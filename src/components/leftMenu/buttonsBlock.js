import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import Button from '../button/button';
import MenuBlock from '../materialUi/dropMenu';

import lm from './leftMenu.scss';
import utils from '../../assets/utils.scss';

@cssModules([lm, utils])
export default class ButtonsBlock extends Component {
  static propTypes = {
    buttonTitles: PropTypes.array.isRequired
  };

  render() {
    const { styles, buttonTitles, title, role } = this.props;

    let lm = styles[0];
    let utils = styles[1];

    let buttonsList = buttonTitles.map((title)=>{
      switch(role) {
        case 'Patient':
          return (
            <li className={lm.buttonItem}>
              <MenuBlock role="Patient" title={title}/>
            </li>
          );
          break;
        default :
          return (
            <li className={lm.buttonItem}>
              <Button>{title}</Button>
            </li>
          )
      }
    });
    if (!buttonTitles.length) {
      return(
        <div></div>
      )
    }
    else {
      return(
        <section className={lm.buttonsBlock}>
          <h3 className={lm.title}>{title}</h3>
          <ul className={utils.clearSpaces}>{buttonsList}</ul>
        </section>
      )
    }
  }
}
