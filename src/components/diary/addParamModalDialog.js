import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

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

import Button from '../../components/button/button';
import {Col, FlexContainer} from '../../components/layout/flex';

import ap from './addParamModalDialog.scss';
import u from '../../assets/utils.scss';

@cssModules([ap, u])

export default class AddParamModalDialog extends Component {
  static propTypes = {
    closeFunction: PropTypes.func
  };

  fakeData = [
    'Вес',
    'Сердечный ритм',
    'Сахар крови',
    'Чсс'
  ];

  constructor(props) {
    super(props);

    this.state = {
      paramType: null,
      paramName: '',
      stepIndex: 0,
      finished: false,
      timeValues: [
        {value: '', type: ''}
      ]
    };
    this.renderContent = this.renderContent.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.getTimeRow = this.getTimeRow.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleParamTypeChange = this.handleParamTypeChange.bind(this);
    this.handleParamNameChange = this.handleParamNameChange.bind(this);
    this.handleParamTimeChange = this.handleParamTimeChange.bind(this);
  }

  handleNext() {
    const {stepIndex} = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  };

  handlePrev() {
    const {stepIndex} = this.state;

    this.setState({
      stepIndex: stepIndex - 1
    });
  };

  handleParamTypeChange(event, index, value) {
    this.setState({
      paramType: value
    });
  }

  handleParamNameChange(value, data) {
    this.setState({
      paramName: value
    });
  }

  handleParamTimeChange(index, temp, value) {
    this.state.timeValues[index] = {type: 'time', value: value};
    this.setState({timeValues: this.state.timeValues});
  }

  handleParamDayChange(index, event, key, payload) {
    this.state.timeValues[index] = {type: 'day', value: payload};
    this.setState({timeValues: this.state.timeValues});
  }

  getTimeRow(timeData, index) {
    let type = timeData && timeData.type;
    let value = timeData && timeData.value;

    return <FlexContainer key={'timeRow' + index} alignItems={'center'}>
      <Col md={6}>
        <SelectField
          onChange={this.handleParamDayChange.bind(this, index)}
          hintText={'время суток...'}
          value={type && type === 'day' ? value: ''}
          >
          <MenuItem value={"morning"} primaryText={"утро"} />
          <MenuItem value={"day"} primaryText={"день"} />
          <MenuItem value={"evening"} primaryText={"вечер"} />
          <MenuItem value={"night"} primaryText={"ночь"} />
        </SelectField>
      </Col>
      <Col md={2}>
        ИЛИ
      </Col>
      <Col md={4}>
        <TimePicker
          onChange={this.handleParamTimeChange.bind(this, index)}
          format="24hr"
          hintText="конкретное время..."
          value={type && type === 'time' ? value: {}}
        />
      </Col>
    </FlexContainer>
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
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
      case 1:
        return (
          <div>
            <AutoComplete
              hintText="поиск параметра..."
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={this.fakeData}
              maxSearchResults={4}
              onUpdateInput={this.handleParamNameChange}
              onNewRequest={this.handleParamNameChange}
              searchText={this.state.paramName}
            />
          </div>
        );
        break;
      case 2:
        let timeRows = this.state.timeValues.map((row, index) => {
          return this.getTimeRow(row, index);
        });
        return(
          <div>
            {timeRows}
          </div>
        );
        break;
      default:
        return 'default';
    }
  }

  renderContent(styles) {
    const {finished, stepIndex} = this.state;
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
          {stepIndex !== 0 && <Button
              options={{flat: true}}
              onTouchTap={this.handlePrev}>
              Вернуться
            </Button>
          }
          <Button
            className={styles.right}
            disabled={
              stepIndex === 0 && this.state.paramType === null ||
              stepIndex === 1 && this.state.paramName === null ||
              stepIndex === 1 && this.state.paramName === ''
            }
            options={{flat: true}}
            inline={true}
            onTouchTap={this.handleNext}>
            Дальше
          </Button>
        </div>
      </div>
    );
  }

  render(){
    const { styles, open, closeFunction } = this.props;
    const ap = styles[0];
    const u = styles[1];
    const {stepIndex} = this.state;

    return <Dialog
      title="Добавление параметра"
      modal={false}
      open={open}
      onRequestClose={closeFunction}
      autoScrollBodyContent={true}>
      <Stepper activeStep={stepIndex}>
        <Step>
          <StepLabel>Выберите тип параметра</StepLabel>
        </Step>
        <Step>
          <StepLabel>Выберите параметр</StepLabel>
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
