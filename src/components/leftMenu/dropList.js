import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import dl from './dropList.scss';
import utils from '../../assets/utils.scss';
import leftMenu from '../../containers/LeftMenu/leftMenu.scss'

import Button from '../../components/button/button';
import Icons from '../materialUi/icons/icons';

@cssModules([dl, utils, leftMenu])

export default class dropList extends Component {
  static propTypes = {
    deviceList: PropTypes.array
  };

  constructor() {
    super();

    this.state = {
      opened: true
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(lm, dl) {
    this.setState({opened: !this.state.opened});
    var element = document.querySelector('.' + dl.title);

    setTimeout(()=> {
      document.querySelector('.' + lm.leftMenu).scrollTop += element.nextSibling ? element.nextSibling.offsetHeight : 0;
    });
  }

  render() {
    const { styles, title, devices, buttonText } = this.props;
    const dl = styles[0];
    const u = styles[1];
    const lm = styles[2];

    let deviceList = devices ? devices.map((device, index)=>{
      return (
        <li key={"device" + index} className={dl.device}>
          <span>{device.name}</span>
          <span className={u.right}>{device.id}</span>
        </li>
      );
    }) : '';

    return (
      <div>
        <div className={dl.title} onClick={this.toggleMenu.bind(this, lm, dl)}>
          {title}
          <span className={dl.icon}><Icons iconName={this.state.opened ? "expand" : "collapse"} /></span>
        </div>
        <section style={ {'display' : this.state.opened ? 'block':'none' } }>
          <ul className={u.clearSpaces + ' ' + dl.list}>
            {deviceList}
          </ul>
          <Button options={ {emphasize:true} }>{buttonText}</Button>
        </section>
      </div>
    )
  }
}

