import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import d from '../../containers/Diary/diary.scss';
import u from '../../assets/utils.scss';
import _ from 'lodash';

import Form from './form';
import SubmitButton from './submitButton';
import ParamField from './paramField';
import AddParamButton from './addParamButton';
import AddParamModalDialog from './addParamModalDialog';
import {Col, FlexContainer} from '../../components/layout/flex';

@cssModules([d,u])

export default class ParamsBlock extends Component {
  static propTypes = {
    paramsBlock: PropTypes.object
  };

  static contextTypes = {
    diaryData: PropTypes.object.isRequired,
    handlePostForm: PropTypes.func,
    handlePostFormSelf: PropTypes.func
  };

  static childContextTypes = {
    self: PropTypes.bool.isRequired,
    timeValues: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      modalDialog: {
        open: false
      }
    };

    this.handleAddParam = this.handleAddParam.bind(this);
    this.handleCloseParamModal = this.handleCloseParamModal.bind(this);
  }

  getChildContext() {
    return {
      self: this.props.self,
      timeValues: this.props.self ? this.context.diaryData.selfTimes : this.context.diaryData.times
    };
  };

  getAppropriateData(ids, blocksData) {
    return _.filter(blocksData, (block) => {
      return _.includes(ids, block.id);
    });
  }

  handleAddParam(event) {
    event.preventDefault();

    this.setState({
      modalDialog:{
        open : true
      }
    })
  }

  handleCloseParamModal() {
    this.setState({
      modalDialog:{
        open : false
      }
    })
  }

  render() {
    const { styles, paramsBlock, self } = this.props;
    const d = styles[0];
    const u = styles[1];
    let paramBlocks, timeBlocks;
    let diaryData = this.context.diaryData;
    let disabled = paramsBlock.disabled;
    let params = self ? diaryData.selfParams : diaryData.params;
    let times = self ? diaryData.selfTimes : diaryData.times;

    if (Object.keys(params).length !== 0) {
      let paramsBlockData = this.getAppropriateData(paramsBlock.parameters, params);

      paramBlocks = _.map(paramsBlockData,(param) => {

        if (Object.keys(times).length !== 0 ) {
          let timeBlocksData = this.getAppropriateData(param.time, times);
          timeBlocks = _.map(timeBlocksData, (field)=> {

            return (
              <ParamField
                key={field.id}
                placeholder={param.hint}
                label={field.label}
                defaultValue={field.value}
                name={field.id}
                type={param.type}
                disabled={disabled}
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

    let onSubmit = self ? this.context.handlePostFormSelf : this.context.handlePostForm,
        titleText = self ? 'Самостоятельный контроль' : 'Контроль назначен: ' + paramsBlock.doctor;
    if (self) {
      return (
        <Form
          className={d.textBlock}
          blockParams={paramsBlock.parameters}
          id={paramsBlock.id}
          onSubmit={onSubmit}>
          <h3 className={d.subHeader}>{titleText}</h3>

          <AddParamButton clickFunction={this.handleAddParam} className={u.right} />
          <AddParamModalDialog closeFunction={this.handleCloseParamModal} open={this.state.modalDialog.open} />

          <FlexContainer>
            {paramBlocks}
          </FlexContainer>

          {!disabled && <SubmitButton className={u.right + ' ' + d.submit} />}
        </Form>
      )
    }
    else {
      return (
        <Form
          className={d.textBlock}
          blockParams={paramsBlock.parameters}
          id={paramsBlock.id}
          onSubmit={onSubmit}>
          <h3 className={d.subHeader}>{titleText}</h3>

          <FlexContainer>
            {paramBlocks}
          </FlexContainer>

          {!disabled && <SubmitButton className={u.right + ' ' + d.submit} />}
        </Form>
      )
    }
  }
}
