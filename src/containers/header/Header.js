import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Container from '../../components/layout/container';
import Col from '../../components/layout/col';
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
        <Container fullH flex>
          <Col md={4} xs={12}>
            <div className={styles.user}>Еремин Виталий Викторович</div>
          </Col>
          <Col md={2} xs={12}><Clock /></Col>
          <Col md={6} xs={12}>
            <TopMenu />
          </Col>
        </Container>
      </header>
    );
  }
}
