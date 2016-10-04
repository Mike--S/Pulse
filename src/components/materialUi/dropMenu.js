import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Button from '../button/button';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

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
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {data, role} = this.props;
    const yesNoMenuItems = [
      <MenuItem primaryText="Подтвердить" />,
      <MenuItem primaryText="Отказаться" />
    ];

    switch (role) {
      case 'Patient':
        return(
          <div>
            <Button onTouchTap={this.handleTouchTap}>{data.title}</Button>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
              <Menu desktop={true}>
                <MenuItem primaryText={'Посмотреть анкету ' + data.id } />
                {data.invitation && data.invitation.date ?
                  <MenuItem primaryText={'Приглашение на прием ' + data.invitation.date }
                  rightIcon={<ArrowDropRight />}
                  menuItems={yesNoMenuItems}/> : ''
                }
                <MenuItem primaryText="Записаться на прием" />
                <Divider />
                <MenuItem primaryText="Отказаться от лечащего врача" />
              </Menu>
            </Popover>
          </div>
        );
        break;
      default:
        return (<Button onTouchTap={this.handleTouchTap}>{title}</Button>)
    }

  }
}
