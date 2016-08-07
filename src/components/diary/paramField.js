import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './paramField.scss';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import * as validators from '../../utils/validators/timeParams';
import {Col, FlexContainer} from '../../components/layout/flex';

@cssModules(styles)

export default class ParamField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string
  };

  static contextTypes = {
    update: PropTypes.func.isRequired,
    registerValidation: PropTypes.func.isRequired,
    timeValues: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.isValid = this.isValid.bind(this);

    this.state = {
      errors: []
    };
  }

  componentDidMount() {
    this.props.validate = [];
    this.removeValidationFromContext = this.context.registerValidation(show => this.isValid(show));
  }

  componentWillUnmount() {
    this.removeValidationFromContext();
  }

  updateValue(value) {
    this.context.update(this.props.name, value);
    if (this.state.errors.length) {
      setTimeout(() => this.isValid(true), 0);
    }
  };

  isValid(showErrors) {
    const errors = this.props.validate
      .reduce((memo, currentName) => {
        return memo.concat(validators[currentName](
          this.props.name,
          this.context.timeValues[this.props.name].value
        ))}, []);
    if (showErrors) {
      this.setState({
        errors
      });
    }
    return errors && !errors.length;
  }

  onBlur() {
    this.isValid(true);
  }

  onChange(event, value) {
    this.updateValue(value)
  };

  render() {
    const { name, label, placeholder, type, styles } = this.props;
    const { timeValues } = this.context;
    let value = Object.keys(timeValues).length ? timeValues[name].value : 0;
    const inlineStyles = {
      sliderStyle: {
        marginTop: styles.sliderTopMargin,
        marginBottom: '0'
      }
    };

    switch(type) {
      case 'text': {
        return(
          <TextField
            className={styles.textField}
            hintText={placeholder}
            floatingLabelText={label}
            value={value}
            onChange={this.onChange}
            onBlur={this.onBlur}
            errorText={this.state.errors.length ? (
              <div>
                {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
              </div>
            ) : null}/>
        )
      }
      break;
      case 'range': {
        return(
          <FlexContainer alignItems={'end'}>
            <Col md={8} options={{indents: true}}>
              <Slider
                min={0}
                max={10}
                step={1}
                sliderStyle={inlineStyles.sliderStyle}
                value={value}
                onChange={this.onChange}
              />
            </Col>
            <Col md={1} options={{indents: true}}>
              {value}
            </Col>
            <Col md={3} options={{indents: true}}>
              {label}
            </Col>
          </FlexContainer>
        )
      }
      break;
      case 'boolean': {
        return(
          <Checkbox
            className={styles.checkbox}
            label={label}
            checked={value}
            onCheck={this.onChange}
          />
        )
      }
      break;
    }
  }
}
