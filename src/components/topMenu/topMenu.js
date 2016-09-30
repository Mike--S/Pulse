import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { Link } from 'react-router';
import t from './topMenu.scss';

@cssModules(t)
export default class TopMenu extends Component {
  static propTypes = {

  };

  render() {
    const { styles } = this.props;
    return (
      <nav className={styles.nav}>
        <Link className={styles.link} to={'/'}>Журнал</Link>
        <Link className={styles.link} to={'/diary'}>Дневник</Link>
        <Link className={styles.link} to={'/'}>Карточка</Link>
        <Link className={styles.link} to={'/logout'}>Выход</Link>
      </nav>
    );
  }
}
