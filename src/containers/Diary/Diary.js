import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import _ from 'lodash';

import * as diaryActions from '../../actions/diary/diary';

import d from './diary.scss';
import u from '../../assets/utils.scss';

import Button from '../../components/button/button';
import {Col, FlexContainer} from '../../components/layout/flex';
import TextField from 'material-ui/TextField';
import DatePicker_ from '../../components/diary/datePicker';
import Form from '../../components/diary/form';
import SubmitButton from '../../components/diary/submitButton';
import ParamField from '../../components/diary/paramField';

@cssModules([d, u])

export default class Diary extends Component {
  static propTypes = {

  };

  static childContextTypes = {
    update: PropTypes.func,
    timeValues: PropTypes.object
  };


  getChildContext() {
    return {
      update: this.updateTimeParam,
      timeValues: this.props.diary.data ? this.props.diary.data.times : {}
    };
  };

  constructor() {
    super();

    this.validations = [];

    this.handlePostForm = this.handlePostForm.bind(this);
    this.updateTimeParam = this.updateTimeParam.bind(this);
    this.updateHealth = this.updateHealth.bind(this);
    this.handlePostHealth = this.handlePostHealth.bind(this);
  }


  updateTimeParam(name, value) {
    this.props.updateDiary(name, value);
  }

  updateHealth(name, value) {
    this.props.updateHealthBlock(value);
  }

  handlePostForm(postData) {
    this.props.postDiaryParams(postData);
  }

  handlePostHealth(text, event) {
    event.preventDefault();

    this.props.postHealthBlock({
      text
    });
  }

  getAppropriateData(ids, blocksData, idField) {
    return _.filter(blocksData, (block) => {
      return _.includes(ids, block[idField]);
    });
  }

  componentWillMount() {
    this.props.loadDiary();
  }

  render() {
    const { styles, diary } = this.props;
    const d = styles[0];
    const u = styles[1];

    let paramBlocks,
      controlBlocks,
      timeBlocks;

    let diaryData = diary.data;
    let isFetching = diary && diary.isFetching;

    if (isFetching === undefined || isFetching) {
      return(<h2>Loading...</h2>)
    }
    else {
      if (Object.keys(diaryData.controlBlock).length !== 0) {
        controlBlocks = _.map(diaryData.controlBlock, (controlBlock, index) => {

          if (Object.keys(diaryData.params).length !== 0) {
            let paramsBlockData =this.getAppropriateData(controlBlock.parameters, diaryData.params, 'id');

            paramBlocks = _.map(paramsBlockData,(param) => {

              if (Object.keys(diaryData.times).length !== 0 ) {
                let timeBlocksData = this.getAppropriateData(param.time, diaryData.times, 'id');
                timeBlocks = _.map(timeBlocksData, (field)=> {

                  return (
                    <ParamField
                      key={field.id}
                      placeholder={param.hint}
                      label={field.label}
                      defaultValue={field.value}
                      name={field.id}
                      type={param.type}
                      validate={param.type === "text" ? ['validateTimeParams']: []}
                    />
                  )
                })
              }

              return(
                <Col key={param.id} xs={12} md={6} lg={4} options={{indents: true}}>
                  <h4 className={d.title}>{param.title}</h4>

                  {timeBlocks}
                </Col>
              )
            });
          }

          return (
            <Form
              key={index}
              className={d.textBlock}
              blockParams={controlBlock.parameters}
              id={controlBlock.id}
              onSubmit={this.handlePostForm}>
              <h3 className={d.subHeader}>Контроль назначен: {controlBlock.doctor}</h3>

              <FlexContainer>
                {paramBlocks}
              </FlexContainer>

              <SubmitButton className={u.right + ' ' + d.submit} />
            </Form>
          )
        });
      }

      return (
        <div>
          <h2 className={d.header} >
            <DatePicker_ />
          </h2>

          <form className={d.textBlock}>
            <h3 className={d.subHeader}>Самочувствие</h3>

            <TextField
              id={"health"}
              multiLine={true}
              rows={1}
              fullWidth={true}
              defaultValue={diaryData.healthBlock[0].text}
              onChange={this.updateHealth}
            />

            <Button clickFunction={this.handlePostHealth.bind(this, diaryData.healthBlock[0].text)} className={u.right + ' ' + d.submit} options={{inlineGreen: true}}>ЗАПИСАТЬ</Button>
          </form>

          {controlBlocks}
        </div>
      )
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
