import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Button from '../button/button';

//@cssModules()
export default class MenuBlock extends Component {
  static propTypes = {

  };

  constructor() {
    super();

    this.state = {
      open: false
    };

  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {title} = this.props;

    return(
      <div>
        <Button onTouchTap={this.handleTouchTap}>{title}</Button>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu width={'200px'} desktop={true}>
            <MenuItem primaryText="Посмотреть анкету" />
            <MenuItem primaryText="Приглашение на прием 31.10.14 10:30" />
            <MenuItem primaryText="Записаться на прием" />
            <Divider />
            <MenuItem primaryText="Подать заявку на лечащего врача" disabled={true} />
            <MenuItem primaryText="Отказаться от лечащего врача" />
          </Menu>
        </Popover>
      </div>
    )
  }
}
