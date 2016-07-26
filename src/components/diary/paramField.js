import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './paramField.scss';
import TextField from 'material-ui/TextField';
import * as validators from '../../utils/validators/timeParams';

@cssModules(styles)

export default class ParamField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string
  };

  static contextTypes = {
    update: PropTypes.func.isRequired,
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

  onChange(event) {
    this.updateValue(event.target.value)
  };

  render() {
    const { styles } = this.props;

    return(
      <TextField
        fullWidth={true}
        hintText={this.props.placeholder}
        floatingLabelText={this.props.label}
        value={Object.keys(this.context.timeValues).length ? this.context.timeValues[this.props.name].value : ""}
        onChange={this.onChange}
        onBlur={this.onBlur}
        errorText={this.state.errors.length ? (
          <div>
            {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
          </div>
        ) : null}/>
    )
  }
}
