import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import cssModules from 'react-css-modules';
import styles from './Auth.scss';
import TextField from 'material-ui/TextField';
import Button from '../../components/button/button';
import * as validators from '../../utils/validators/login';
import * as authActions from '../../actions/auth';

@cssModules(styles)

export default class Registration extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: {
        value: '',
        hintText: 'Почтовый адрес',
        validatorsType: 'email',
        errors: []
      },
      first_name: {
        value: '',
        hintText: 'Имя',
        validatorsType: 'fio',
        errors: []
      },
      last_name: {
        value: '',
        hintText: 'Фамилия',
        validatorsType: 'fio',
        errors: []
      },
      password: {
        value: '',
        hintText: 'Пароль',
        validatorsType: 'password',
        type: 'password',
        errors: []
      }
    };
  };

  componentWillMount() {
    this.props.dropRegistrationData();
  }

  onChange(type ,event, value) {
    this.setState({
      [type]: {
        ...this.state[type],
        value: value,
        errors: []
      }
    })
  }

  onBlur(type) {
    let field = this.state[type];
    this.setState({
      [type]: {
        ...this.state[type],
        errors: validators.validateAuth(field.value, field.validatorsType)
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    for (let field in this.state) {
      this.onBlur(field);
    }

    if (this.isFormValid()) {
      this.props.postRegistrationData({
        email: this.state.email.value,
        first_name: this.state.first_name.value,
        last_name: this.state.last_name.value,
        password: this.state.password.value
      });
    }
  }

  isFormValid() {
    let valid = true;

    for (let field in this.state) {
      let container;
      if(this.state.hasOwnProperty(field)) {
        container = this.state[field];
      }
      if (container && container.errors && (container.errors.length !== 0 || container.value === '')) {
        valid = false;
      }
    }

    return valid;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps &&
      !_.isEqual(this.props, nextProps) &&
      !_.isEmpty(nextProps.registration) &&
      nextProps.registration.errorContext) {
      for(let field in nextProps.registration.errorContext) {
        if(nextProps.registration.errorContext.hasOwnProperty(field) &&
          this.state.hasOwnProperty(field)) {
          let errorsArray = nextProps.registration.errorContext[field];
          this.setState({
            [field]: {
              ...this.state[field],
              errors: errorsArray
            }
          });
        }
      }
    }
  }

  render() {
    const { styles, registration } = this.props;

    var textFields = [];
    for (let field in this.state) {
      let container;
      if(this.state.hasOwnProperty(field)) {
        container = this.state[field];
      }
      if(container) {
        textFields.push(
          <div>
            <TextField
              onChange={this.onChange.bind(this, field)}
              onBlur={this.onBlur.bind(this, field)}
              hintText={container.hintText}
              type={container.type || 'text'}
              errorText={container.errors && container.errors.length ? (
              <div>
                {container.errors.map((error, i) => <div key={i}>{error}</div>)}
              </div>
            ) : null}/>
          </div>
        )
      }
    }
    if(registration && registration.success) {
      return(
        <div className={styles.form}>
          <div className={styles.row}>
            {this.state.email.value + ' Успешно зарегистрирован, подтвердите его по email'}
          </div>
          <div className={styles.row}>
            <Link to={'/signIn'}>Возвратиться к логину</Link>
          </div>
        </div>
      )
    }
    else {
      return(
        <form onSubmit={this.onSubmit} className={styles.form}>
          <div>Регистрация</div>
          {textFields}
          <div className={styles.row}>
            <Button options={{inlineGreen: true}}>Зарегистрироваться</Button>
          </div>
        </form>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    registration: state.user.registration
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
