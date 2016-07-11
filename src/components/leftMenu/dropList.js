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

  constructor() {
    super();

    this.state = {
      opened: true
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(event) {
    this.setState({opened: !this.state.opened});
    var element = event.target;
    var body = document.querySelector('body');

    setTimeout(()=> {
      document.querySelectorAll('nav')[1].scrollTop += element.nextSibling.offsetHeight;
    });
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
        <div className={dl.title} onClick={this.toggleMenu}>{title}</div>
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

