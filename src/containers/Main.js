import React, { Component, PropTypes } from 'react';
import Header from './header/Header';
import LeftMenu from '../containers/leftMenu/leftMenu';
import Container from '../components/layout/container'
import cssModules from 'react-css-modules';
import styles from '../assets/index.scss';

@cssModules(styles)
export default class Main extends Component {
  static propTypes = {
    styles: PropTypes.object,
    children: PropTypes.any.isRequired
  };

  render() {
    const { styles, children } = this.props;

    return (
      <div>
        <Header />
        <LeftMenu />
        <div className={styles.content}>
          <Container>
            {children}
          </Container>
        </div>
      </div>
    );
  }
}
