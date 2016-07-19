import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
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
    const { styles } = this.props;

    return (
      <header className={styles.header}>
        <Container fullH>
          <FlexContainer fullH alignItems={true}>
            <Col md={4} xs={4/*12*/}>
              <div className={styles.user}>Еремин Виталий Викторович</div>
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
