import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import _ from 'lodash';

import Dialog from 'material-ui/Dialog';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import ExpandTransition from 'material-ui/internal/ExpandTransition';

import Button from '../button/button';
import {Col, FlexContainer} from '../layout/flex';
import Icon from '../materialUi/icons/icons';

import ap from './addParamModalDialog.scss';
import u from '../../assets/utils.scss';

@cssModules([ap, u])

export default class AddParamModalDialog extends Component {
  static propTypes = {
    closeFunction: PropTypes.func
  };

  static contextTypes = {
    getParameters: PropTypes.func.isRequired,
    diaryParams: PropTypes.object
  };

  dayValues = {
    MORNING: 'утро',
    DAY: 'день',
    EVENING: 'вечер',
    NIGHT: 'ночь',
    EXACTTIME: 'конкретное время'
  };

  constructor(props) {
    super(props);

    this.clearState.apply(this);
    this.renderContent = this.renderContent.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.getTimeRow = this.getTimeRow.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleParamTypeChange = this.handleParamTypeChange.bind(this);
    this.handleParamNameChange = this.handleParamNameChange.bind(this);
    this.handleParamTimeChange = this.handleParamTimeChange.bind(this);
    this.handleAddTime = this.handleAddTime.bind(this);
    this.getTimeOptions = this.getTimeOptions.bind(this);
    this.isNextButtonDisabled = this.isNextButtonDisabled.bind(this);
    this.closeFunction = this.closeFunction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && this.props.open !== nextProps.open) {
      this.context.getParameters();
    }
  }

  clearState() {
    this.state = {
      paramType: null,
      paramName: '',
      stepIndex: 0,
      finished: false,
      timeValues: [
        {value: '', type: ''}
      ]
    };
  }

  handleNext() {
    const {stepIndex} = this.state;
    if (stepIndex === 0 && !this.state.isParameterNew) {
      this.setState({
        stepIndex: 2
      });
    }
    else {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2
      });
    }
  };

  handlePrev() {
    const {stepIndex} = this.state;

    if (stepIndex === 2 && !this.state.isParameterNew) {
      this.setState({
        stepIndex: 0
      });
    }
    else {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  };

  closeFunction() {
    this.props.closeFunction();
    this.clearState.apply(this);
  }

  handleParamTypeChange(event, index, value) {
    this.setState({
      paramType: value
    });
  }

  handleParamNameChange(value, data) {
    var isParameterNew = !_.includes(this.context.diaryParams.names, value);
    this.setState({
      paramName: value,
      isParameterNew: isParameterNew,
      existedTimeValues: isParameterNew ? []: _.filter(this.context.diaryParams.data, {name: value})[0].existedTimeValues
    });
  }

  handleParamTimeChange(index, temp, value) {
    this.setState({
      timeValues: this.state.timeValues.map((timeValue, innerIndex)=> {
        if (index === innerIndex) {
          return {type: 'time', value: value}
        }
        return timeValue;
      })
    });
  }

  handleParamDayChange(index, event, key, payload) {
    var type;

    if(payload === 'EXACTTIME') {
      type = 'time';
    }
    else {
      type = 'day';
    }
    this.setState({
      timeValues: this.state.timeValues.map((timeValue, innerIndex)=> {
        if (index === innerIndex) {
          return {type: type, value: payload}
        }
        return timeValue;
      })
    });
  }

  handleAddTime() {
    this.setState({
      timeValues: [
        ...this.state.timeValues,
        {type: 'day', value: ''}
      ]
    })
  }

  handleDeleteTime(index) {
    this.state.timeValues.splice(index, 1);
    this.setState({
      timeValues: this.state.timeValues
    });
  }

  getTimeOptions() {
    var self = this;
    return Object.keys(this.dayValues).map(key => {
      if(!self.state.isParameterNew &&
        _.includes(this.state.existedTimeValues, key)) {
        return;
      }
      return <MenuItem disabled={key !== 'EXACTTIME' && _.includes(this.state.timeValues.map(timeValue => timeValue.value), key)}
                       key={key}
                       value={key}
                       primaryText={this.dayValues[key]} />
    });
  }

  getTimeRow(timeData, index) {
    var type = timeData && timeData.type;
    var value = timeData && timeData.value;

    return <FlexContainer key={'timeRow' + index} alignItems={'center'}>
        <Col md={5}>
          <SelectField
            onChange={this.handleParamDayChange.bind(this, index)}
            hintText={'время суток...'}
            value={type === 'time' ? 'EXACTTIME' : value}
            >
            {this.getTimeOptions(index)}
          </SelectField>
        </Col>
        <Col md={1}>
          {
            index !== 0 &&
            <div className={ap.removeCol} onClick={this.handleDeleteTime.bind(this, index)}>
              <Icon iconName={'remove'} />
            </div>
          }
        </Col>
        <Col md={6}>
        {type && type === 'time' &&
          <TimePicker
            onChange={this.handleParamTimeChange.bind(this, index)}
            format="24hr"
            hintText="введите время..."
            value={typeof value === 'object' ? value : {}}
          />
        }
        </Col>
      </FlexContainer>
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <AutoComplete
              hintText="поиск параметра..."
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={this.context.diaryParams.names || []}
              maxSearchResults={4}
              onUpdateInput={this.handleParamNameChange}
              onNewRequest={this.handleParamNameChange}
              searchText={this.state.paramName}
            />
        );
        break;
      case 1:
        return (
        <div>
          <SelectField value={this.state.paramType} onChange={this.handleParamTypeChange}>
            <MenuItem value={"text"} primaryText={"Текстовый"} />
            <MenuItem value={"range"} primaryText={"Шкала от 0 до 10"} />
            <MenuItem value={"boolean"} primaryText={"Логический(да или нет)"}/>
          </SelectField>
        </div>
        );
        break;
      case 2:
        let timeRows = this.state.timeValues.map((row, index) => {
          return this.getTimeRow(row, index)
        });
        return(
          <div>
            {timeRows}
            <div style={{marginTop: '10px'}}>
              <Button onTouchTap={this.handleAddTime} options={{floatingAction: true}}>+</Button>
            </div>
          </div>
        );
        break;
      default:
        return 'default';
    }
  }

  isNextButtonDisabled() {
    const {stepIndex} = this.state;
    return stepIndex === 0 && this.state.paramName === "" ||
      stepIndex === 1 && this.state.paramType === null
  }

  renderContent(styles) {
    const {finished, stepIndex} = this.state;

    if (this.context.diaryParams.isFetching) {
      return (
        <div>Loading...</div>
      )
    }

    if (finished) {
      return (
        <div>
          Конец
        </div>
      );
    }
    return (
      <div>
        {this.getStepContent(stepIndex)}
        <div className={ap.buttons}>
          {
            stepIndex !== 0 &&
            <Button
              options={{flat: true}}
              onTouchTap={this.handlePrev}>
              Вернуться
            </Button>
          }
          <Button
            className={styles.right}
            disabled={this.isNextButtonDisabled()}
            options={{flat: true}}
            inline={true}
            onTouchTap={this.handleNext}>
            {this.state.isParameterNew ? 'Создать свой' : 'Дальше'}
          </Button>
        </div>
      </div>
    );
  }

  render(){
    const { styles, open} = this.props;
    const ap = styles[0];
    const u = styles[1];
    const {stepIndex} = this.state;

    return <Dialog
      title="Добавление параметра"
      modal={false}
      open={open}
      onRequestClose={this.closeFunction}
      autoScrollBodyContent={true}>
      <Stepper activeStep={stepIndex}>
        <Step>
          <StepLabel>Выберите параметр</StepLabel>
        </Step>
        <Step>
          <StepLabel>Выберите тип параметра</StepLabel>
        </Step>
        <Step>
          <StepLabel>Выберите время</StepLabel>
        </Step>
      </Stepper>
      <ExpandTransition open={true}>
        {this.renderContent(u)}
      </ExpandTransition>
    </Dialog>
  }
}
