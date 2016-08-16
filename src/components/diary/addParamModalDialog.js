import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Dialog from 'material-ui/Dialog';
import styles from './addParamModalDialog.scss';

@cssModules(styles)

export default class AddParamModalDialog extends Component {
  static propTypes = {
    closeFunction: PropTypes.func
  };

  render(){
    const { styles, open, closeFunction } = this.props;

    return <Dialog
        title="Scrollable Dialog"
        modal={false}
        open={open}
        onRequestClose={closeFunction}
        autoScrollBodyContent={true} />
  }
}
