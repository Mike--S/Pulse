import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import TextField from 'material-ui/TextField';
import Button from '../../components/button/button';

import * as types from '../../actions/actionTypes';
import * as patientActions from '../../actions/patient/patient';

import d from './diary.scss';
import utils from '../../assets/utils.scss';

@cssModules([d, utils])

export default class Diary extends Component {
  static propTypes = {

  };

  render() {
    const { styles } = this.props;
    const d = styles[0];
    const u = styles[1];

    return (
      <div>
        <h2 className={d.header} >24 Октября 2014, Среда</h2>

        <article className={d.textBlock}>
          <h3 className={d.subHeader}>Самочувствие</h3>

          <TextField
            multiLine={true}
            rows={1}
            fullWidth={true}
            underlineFocusStyle={{borderColor: d.underLineFocus}}
            inputStyle={{fontSize: d.inputFontSize}}
            defaultValue={"Хорошее"}
          />

          <Button className={u.right} options={{inlineGreen: true}}>ЗАПИСАТЬ</Button>
        </article>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.patient
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(patientActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
