import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import Button from '../button/button';
import MenuBlock from '../materialUi/dropMenu';

import bb from './buttonsBlock.scss';
import utils from '../../assets/utils.scss';

@cssModules([bb, utils])
export default class ButtonsBlock extends Component {
  static propTypes = {
    buttonTitles: PropTypes.array.isRequired
  };

  render() {
    const { styles, buttonData, title, role } = this.props;

    let bb = styles[0];
    let utils = styles[1];

    let buttonsList = buttonData.map((data, index) => {
      switch(role) {
        case 'Patient':
          return (
            <li key={"buttonItem" + index} className={bb.buttonItem}>
              <MenuBlock role="Patient" data={data}/>
            </li>
          );
          break;
        case 'Devices':
          return (
            <li key={"buttonItem" + index} className={bb.buttonItem}>
              <Button>{data}</Button>
            </li>
          );
          break;
        default :
          return (
            <li key={"buttonItem" + index} className={bb.buttonItem}>
              <Button>{data.title}</Button>
            </li>
          )
      }
    });
    if (!buttonData.length) {
      return(
        <div></div>
      )
    }
    else {
      return(
        <section className={bb.buttonsBlock}>
          <h3 className={bb.title}>{title}</h3>
          <ul className={utils.clearSpaces}>{buttonsList}</ul>
        </section>
      )
    }
  }
}
