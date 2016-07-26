import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './paramField.scss';
import TextField from 'material-ui/TextField';

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

  constructor() {
    super();

    this.updateValue = this.updateValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  updateValue(value) {
    this.context.update(this.props.name, value);
  };

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
        onChange={this.onChange}/>
    )
  }
}
