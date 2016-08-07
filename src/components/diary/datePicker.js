import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import DatePicker from 'material-ui/DatePicker';
import styles from './datePicker.scss';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

if (areIntlLocalesSupported(['ru'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/ru');
}

@cssModules(styles)

export default class DatePicker_ extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.maxDate = new Date();
  }

  render() {
    const { styles, date } = this.props;
    const inlineStyles = {
      fontSize: styles.fontSize
    };

    return (
      <DatePicker
        className={styles.datePicker}
        textFieldStyle={inlineStyles}
        maxDate={this.maxDate}
        value={date || this.maxDate}
        formatDate={new DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          weekday: 'short'
        }).format}
        okLabel="OK"
        cancelLabel="Отмена"
        DateTimeFormat={DateTimeFormat}
        locale="ru"
        onChange={this.props.onChange}
      />
    )
  }
}
