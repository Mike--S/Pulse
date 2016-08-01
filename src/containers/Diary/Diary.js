import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import _ from 'lodash';
import without from 'lodash.without';

import * as diaryActions from '../../actions/diary/diary';

import d from './diary.scss';
import u from '../../assets/utils.scss';

import Button from '../../components/button/button';
import {Col, FlexContainer} from '../../components/layout/flex';
import TextField from 'material-ui/TextField';
import ParamField from '../../components/diary/paramField';

@cssModules([d, u])

export default class Diary extends Component {
  static propTypes = {

  };

  static childContextTypes = {
    update: PropTypes.func,
    timeValues: PropTypes.object,
    registerValidation: PropTypes.func,
    isFormValid: PropTypes.func
  };

  getChildContext() {
    return {
      update: this.update,
      timeValues: this.props.diary.data ? this.props.diary.data.times : {},
      registerValidation: this.registerValidation,
      isFormValid: this.isFormValid
    };
  };

  constructor() {
    super();

    this.validations = [];

    this.handlePostForm = this.handlePostForm.bind(this);
    this.update = this.update.bind(this);
    this.registerValidation = this.registerValidation.bind(this);
    this.removeValidation = this.removeValidation.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  update(name, value) {
    this.props.updateDiary(name, value);
  }

  handlePostForm(event) {
    event.preventDefault();

    if (this.isFormValid(true)) {
      this.props.postDiaryParams({});
    }
  }

  getTimeBlockData(ids, timeBlocksData) {
    return _.filter(timeBlocksData, (timeBlock) => {
      return _.includes(ids, timeBlock.type);
    });
  }

  registerValidation(isValidFunc) {
    this.validations = [...this.validations, isValidFunc];
    return this.removeValidation.bind(null, isValidFunc);
  }

  removeValidation(ref) {
    this.validations = without(this.validations, ref);
  }

  isFormValid(showErrors) {
    return this.validations.reduce(
      (memo, isValidFunc) => {
        return isValidFunc(showErrors) && memo
      }, true)
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
      if (Object.keys(diaryData.params).length !== 0) {

        paramBlocks = _.map(diaryData.params,(param) => {
          if(Object.keys(diaryData.times).length !==0 ) {
            let timeBlocksData = this.getTimeBlockData(param.time, diaryData.times);

            timeBlocks = _.map(timeBlocksData, (field, index)=> {

              return (
                <ParamField
                  key={field.type}
                  placeholder={param.hint}
                  label={field.label}
                  defaultValue={field.value}
                  name={field.type}
                  validate={['validateTimeParams']}
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

      if (Object.keys(diaryData.controlBlock).length !== 0) {
        controlBlocks = _.map(diaryData.controlBlock, (controlBlock, index) => {

          return (
            <form key={index} className={d.textBlock}>
              <h3 className={d.subHeader}>Контроль назначен: {controlBlock.doctor}</h3>

              <FlexContainer>
                {paramBlocks}
              </FlexContainer>

              <Button className={u.right} options={{inlineGreen: true}} clickFunction={this.handlePostForm}>ЗАПИСАТЬ</Button>
            </form>

          )
        });
      }

      return (
        <div>
          <h2 className={d.header} >24 Октября 2014, Среда</h2>

          <form className={d.textBlock}>
            <h3 className={d.subHeader}>Самочувствие</h3>

            <TextField
              id={"health"}
              multiLine={true}
              rows={1}
              fullWidth={true}
              defaultValue={diaryData.healthBlock.text}
            />

            <Button className={u.right} options={{inlineGreen: true}}>ЗАПИСАТЬ</Button>
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
