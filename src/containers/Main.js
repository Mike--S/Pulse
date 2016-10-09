import React, { Component, PropTypes } from 'react';
import Header from './header/Header';
import LeftMenu from './LeftMenu/LeftMenu';
import Container from '../components/layout/container'
import Spinner from '../components/spinner';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as patientActions from '../actions/user/user';
import * as authActions from '../actions/auth';
import styles from '../assets/index.scss';

@cssModules(styles)
export default class Main extends Component {
  static propTypes = {
    styles: PropTypes.object,
    children: PropTypes.any.isRequired
  };

  componentWillMount() {
    this.props.loadUser({name: authActions.isLoggedIn()});
  }

  render() {
    const { styles, children, location, user } = this.props;
    if (location.pathname === '/signIn') {
      return (
        <Container main={true}>
          {children}
        </Container>
      )
    }
    else {
      if (!user || user.isFetching) {
        return (
          <div>
            <Spinner />
          </div>
        )
      }
      else {
        return (
          <div>
            <Header />
            <LeftMenu />
            <div className={styles.content}>
              <Container main={true}>
                {children}
              </Container>
            </div>
          </div>
        );
      }
    }
  }
}


function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(patientActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

