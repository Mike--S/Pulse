import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import dl from './dropList.scss';
import utils from '../../assets/utils.scss';
import Button from '../../components/button/button';

@cssModules([dl, utils])

export default class dropList extends Component {
  static propTypes = {
    deviceList: PropTypes.array,
  };

  titleClick() {

  }

  render() {
    const { styles, title, devices, buttonText } = this.props;
    const dl = styles[0];
    const u = styles[1];

    let deviceList = devices ? devices.map((device)=>{
      return (
        <li className={dl.device}>
          <span>{device.name}</span>
          <span>{device.id}</span>
        </li>
      );
    }) : '';

    return (
      <div>
        <div className={dl.title} onClick={this.titleClick}>{title}</div>
        <ul className={u.clearSpaces + ' ' + dl.list}>
          {deviceList}
        </ul>
        <Button options={ {emphasize:true} }>{buttonText}</Button>
      </div>
    )
  }
}

