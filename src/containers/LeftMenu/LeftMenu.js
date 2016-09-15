import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import * as types from '../../actions/actionTypes';
import * as patientActions from '../../actions/patient/patient';
import * as authActions from '../../actions/auth';

import { Link } from 'react-router';
import Button from '../../components/button/button';
import ButtonsBlock from '../../components/leftMenu/buttonsBlock';
import DropList from '../../components/leftMenu/dropList';
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
    this.props.loadPatient({name: authActions.isLoggedIn()});
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
  }

  render() {
    const { styles, patient } = this.props;
    let lm = styles[0];
    let isFetching = patient && patient.isFetching;
    let type = patient && patient.type;
    let doctors = patient && patient.doctors;
    let patients = patient && patient.patients;
    let devices = patient && patient.devices;

    if (isFetching === undefined || isFetching) {
      return(
        <nav className={lm.leftMenu}>
          <h1>Loading...</h1>
        </nav>
      )
    }
    else {
      if (type === 'doctor') {
        return (
          <nav className={lm.leftMenu}>
            <input type="search" placeholder="Поиск"/>
            <ButtonsBlock role={'Patient'} title={'Собственный пациенты'} buttonTitles={patients.selfPatients || []}/>
            <ButtonsBlock role={'Patient'} title={'Заявки на лечащего врача'} buttonTitles={patients.request || []}/>
            <ButtonsBlock role={'Patient'} title={'Пациенты на консультации'} buttonTitles={patients.onConsultation || []}/>
          </nav>
        )
      }
      else {
        return (
          <nav className={lm.leftMenu}>
            <input type="search" placeholder="Поиск"/>
            <ButtonsBlock role={'Patient'} title={'Лечащий врач'} buttonTitles={doctors && doctors.therapist || []}/>
            <ButtonsBlock role={'Patient'} title={'Врачи консультанты'} buttonTitles={doctors && doctors.consultants || []}/>
            <Button options={{emphasize: true}}>Добавить врача</Button>
            <ButtonsBlock title={'Подключить услуги'} buttonTitles={this.state.services}/>
            <DropList title="Устройства" devices={devices} buttonText="Добавить устройство"/>
          </nav>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(patientActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
