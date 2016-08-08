import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import d from '../../containers/Diary/diary.scss';
import u from '../../assets/utils.scss';
import _ from 'lodash';

import Form from '../../components/diary/form';
import SubmitButton from '../../components/diary/submitButton';
import ParamField from '../../components/diary/paramField';
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

    return (
      <Form
        className={d.textBlock}
        blockParams={paramsBlock.parameters}
        id={paramsBlock.id}
        onSubmit={self ? this.context.handlePostFormSelf : this.context.handlePostForm}>
        <h3 className={d.subHeader}>{paramsBlock.doctor ? 'Контроль назначен: ' + paramsBlock.doctor: 'Самостоятельный контроль'}</h3>

        <FlexContainer>
          {paramBlocks}
        </FlexContainer>

        {!disabled && <SubmitButton className={u.right + ' ' + d.submit} />}
      </Form>
    )

  }
}
