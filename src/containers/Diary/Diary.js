import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import _ from 'lodash';

import * as diaryActions from '../../actions/diary/diary';

import d from './diary.scss';
import u from '../../assets/utils.scss';

import ParamsBlock from '../../components/diary/paramsBlock';
import Button from '../../components/button/button';
import TextField from 'material-ui/TextField';
import DatePicker_ from '../../components/diary/datePicker';

@cssModules([d, u])

export default class Diary extends Component {
  static propTypes = {

  };

  static childContextTypes = {
    update: PropTypes.func,
    handlePostForm: PropTypes.func,
    handlePostFormSelf: PropTypes.func,
    diaryData: PropTypes.object
  };


  getChildContext() {
    return {
      update: this.updateTimeParam,
      handlePostForm: this.handlePostForm,
      handlePostFormSelf: this.handlePostFormSelf,
      diaryData: this.props.diary.data ? this.props.diary.data : {}
    };
  };

  constructor() {
    super();

    this.validations = [];

    this.handlePostForm = this.handlePostForm.bind(this);
    this.updateTimeParam = this.updateTimeParam.bind(this);
    this.handlePostFormSelf = this.handlePostFormSelf.bind(this);
    this.updateHealth = this.updateHealth.bind(this);
    this.handlePostHealth = this.handlePostHealth.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  updateTimeParam(name, value, self) {
    this.props.updateDiary(name, value, self);
  }

  updateHealth(name, value) {
    this.props.updateHealthBlock(value);
  }

  handlePostForm(postData) {
    this.props.postDiaryParams(postData);
  }

  handlePostFormSelf(postData) {
    this.props.postDiaryParamsSelf(postData);
  }

  handlePostHealth(text, event) {
    event.preventDefault();

    this.props.postHealthBlock({
      text
    });
  }

  handleDateChange(emptyEvent, date) {
    this.props.updateDate(date);
    this.props.loadDiary({
      date
    })
  }

  componentWillMount() {
    this.props.loadDiary();
  }

  render() {
    const { styles, diary } = this.props;
    const d = styles[0];
    const u = styles[1];

    let diaryData = diary.data;
    let date = diary.date;
    let isFetching = diary && diary.isFetching;

    if (isFetching === undefined || isFetching) {
      return(<h2>Loading...</h2>)
    }
    else {
      if (!diaryData) {
        return(
          <div>
            <h2 className={d.header} >
              <DatePicker_ onChange={this.handleDateChange} date={date} />
            </h2>
            <div className={d.textBlock}>
              <p> Извините, нет данных на текущую дату </p>
            </div>
          </div>
        )
      }
      else {
        let healthDisabled = diaryData.healthBlock && diaryData.healthBlock[0].disabled;
        let recommendations = diaryData.recommendations;
        let healthBlock = diaryData.healthBlock;
        let controlBlocks, selfControlBlocks;

        if (Object.keys(diaryData.controlBlock).length !== 0) {
          controlBlocks = _.map(diaryData.controlBlock, (controlBlock, index) => <ParamsBlock self={false} key={index} paramsBlock={controlBlock} />)
        }
        if (Object.keys(diaryData.selfControlBlock).length !== 0) {
          selfControlBlocks = _.map(diaryData.selfControlBlock, (controlBlock, index) => <ParamsBlock self={true} key={index} paramsBlock={controlBlock} />)
        }
        return (
          <div>
            <h2 className={d.header} >
              <DatePicker_ onChange={this.handleDateChange} date={date} />
            </h2>
            {healthBlock && healthBlock[0] &&
              <form className={d.textBlock}>
                <h3 className={d.subHeader}>Самочувствие</h3>

                <TextField
                  id={"health"}
                  multiLine={true}
                  rows={1}
                  fullWidth={true}
                  defaultValue={healthBlock[0].text}
                  onChange={this.updateHealth}
                  disabled={healthDisabled}
                />

                {!healthDisabled &&
                  <Button clickFunction={this.handlePostHealth.bind(this, diaryData.healthBlock[0].text)}
                        className={u.right + ' ' + d.submit}
                        options={{inlineGreen: true}}>ЗАПИСАТЬ</Button>
                }
              </form>
            }

            {recommendations && recommendations[0] &&
              <div className={d.textBlock}>
                <h3 className={d.subHeader}>{'Рекомендации от ' + new Date(recommendations[0].setDate).toLocaleDateString('ru', {month: 'long', year: 'numeric', day: 'numeric'})}</h3>

                <p className={d.innerText}>
                  {recommendations[0].text}
                </p>

              </div>
            }
            {controlBlocks}
            {selfControlBlocks}
          </div>
        )
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    diary: state.diary
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(diaryActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
