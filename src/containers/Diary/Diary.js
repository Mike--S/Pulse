import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';

import * as diaryActions from '../../actions/diary/diary';

import styles from './diary.scss';

import {FormBlockHealth, FormBlockWithParams} from '../../components/diary/FormBlock';

@cssModules(styles)

export default class Diary extends Component {
  static propTypes = {

  };

  componentWillMount() {
    this.props.loadDiary();
  }

  render() {
    const { styles, diary } = this.props;
    let isFetching = diary && diary.isFetching;

    if (isFetching === undefined || isFetching) {
      return(<h1>Loading</h1>)
    }
    else {
      var controlBlocks = diary.data.controlBlocks.map(function (controlBlock) {
        return (
          <FormBlockWithParams data={controlBlock} />
        )
      });

      return (
        <div>
          <h2 className={styles.header} >24 Октября 2014, Среда</h2>

          <FormBlockHealth health={diary.data.health} />

          {controlBlocks}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return state.diary
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(diaryActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
