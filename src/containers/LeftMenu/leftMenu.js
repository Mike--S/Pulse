import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import * as types from '../../actions/actionTypes';
import * as patientActions from '../../actions/patient/leftMenu';

import { Link } from 'react-router';
import Button from '../../components/button/button';
import ButtonsBlock from '../../components/leftMenu/buttonsBlock';
import MenuBlock from '../../components/materialUi/dropMenu';

import lm from './leftMenu.scss';

@cssModules([lm])
class TopMenu extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {};
    this.state.services = [
      'Диспансеризация',
      'Кнопка SOS',
      'Персональная забота',
      'Эксклюзивный уход'
    ];
  }

  componentWillMount() {
    this.props.loadPatient();
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
  }

  render() {
    const { styles, patient } = this.props;
    let lm = styles[0];
    let isFetching = patient && patient.isFetching;
    let doctors = patient && patient.doctors;

    if (isFetching === undefined || isFetching) {
      return(
        <nav className={lm.leftMenu}>
          <h1>Loading...</h1>
        </nav>
      )
    }
    else {
      return (
        <nav className={lm.leftMenu}>
          <input type="search" placeholder="Поиск"/>
          <ButtonsBlock role={'Patient'} title={'Лечащий врач'} buttonTitles={doctors.therapist || []} />
          <ButtonsBlock role={'Patient'} title={'Врачи консультанты'} buttonTitles={doctors.consultants || []} />
          <Button options={{emphasize: true}}>Добавить врача</Button>
          <ButtonsBlock title={'Подключить услуги'} buttonTitles={this.state.services} />
        </nav>
      );
    }
  }
}

function mapStateToProps(state) {
  return state.patient
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(patientActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
