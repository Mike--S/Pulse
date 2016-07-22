import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import cssModules from 'react-css-modules';
import routes from '../config/routes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../assets/variables.scss';

@cssModules(styles)

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { store, history, styles } = this.props;

    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: styles.darkGreen
      }
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
          <Router history={history} routes={routes} />
        </Provider>
      </MuiThemeProvider>
    );
  }
}
