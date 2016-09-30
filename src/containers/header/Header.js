import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import Container from '../../components/layout/container';
import {Col, FlexContainer} from '../../components/layout/flex';
import Clock from '../../components/Clock';
import TopMenu from '../../components/topMenu/topMenu';
import h from './header.scss';

@cssModules(h)

export default class Header extends Component {
  static propTypes = {
    styles: PropTypes.object,
    h: PropTypes.object
  };

  render() {
    const { styles, user } = this.props;

    return (
      <header className={styles.header}>
        <Container fullH>
          <FlexContainer fullH alignItems={'center'}>
            <Col md={4} xs={4/*12*/}>
              <div className={styles.user}>{user.fio}</div>
            </Col>
            <Col md={2} xs={2/*12*/}><Clock /></Col>
            <Col md={6} xs={6/*12*/}>
              <TopMenu />
            </Col>
          </FlexContainer>
        </Container>
      </header>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.patient
  }
}

export default connect(mapStateToProps)(Header);
