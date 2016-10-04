import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import * as patientActions from '../../actions/patient/patient';
import _ from 'lodash';

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

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
  }

  render() {
    const { styles, patient } = this.props;
    let lm = styles[0];
    let isFetching = patient && patient.isFetching;
    var type, doctors, patients, devices;
    if (patient) {
      type = patient.type;
      doctors = patient.doctors;
      patients = patient.patients;
      devices = patient.devices;
    }

    if (type === 'doctor') {
      return (
        <nav className={lm.leftMenu}>
          <input type="search" placeholder="Поиск"/>
          <ButtonsBlock role={'Patient'} title={'Собственный пациенты'} buttonData={patients.selfPatients || []}/>
          <ButtonsBlock role={'Patient'} title={'Заявки на лечащего врача'} buttonData={patients.request || []}/>
          <ButtonsBlock role={'Patient'} title={'Пациенты на консультации'} buttonData={patients.onConsultation || []}/>
        </nav>
      )
    }
    else {
      return (
        <nav className={lm.leftMenu}>
          <input type="search" placeholder="Поиск"/>
          <ButtonsBlock role={'Patient'} title={'Лечащий врач'} buttonData={doctors && doctors.therapist || []}/>
          <ButtonsBlock role={'Patient'} title={'Врачи консультанты'} buttonData={doctors && doctors.consultants || []}/>
          <Button options={{emphasize: true}}>Добавить врача</Button>
          <ButtonsBlock role={'Devices'} title={'Подключить услуги'} buttonData={this.state.services}/>
          <DropList title="Устройства" devices={devices} buttonText="Добавить устройство"/>
        </nav>
      );
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
