import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import cssModules from 'react-css-modules';
import styles from './SignIn.scss';
import TextField from 'material-ui/TextField';
import Button from '../../components/button/button';
import * as validators from '../../utils/validators/login';
import * as authActions from '../../actions/auth';

@cssModules(styles)

export default class SignIn extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);

    this.state = {
      login: {
        value: '',
        errors: []
      },
      password: {
        value: '',
        errors: []
      }
    }
  }

  isFormValid() {
    return this.state.login.errors.length === 0 &&
      this.state.password.errors.length === 0 &&
      this.state.login.value &&
      this.state.password.value;
  }

  onChangeLogin(event, value) {
    this.setState({
      login: {
        value: value,
        errors: []
      }
    })
  }

  onChangePassword(event, value) {
    this.setState({
      password: {
        value: value,
        errors: []
      }
    })
  }

  onBlur() {
    this.setState({
      login: {
        ...this.state.login,
        errors: validators.validateLogin(this.state.login.value, 'login')
      },
      password: {
        ...this.state.password,
        errors: validators.validateLogin(this.state.password.value, 'password')
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.onBlur();

    if (this.isFormValid()) {
      this.props.postLoginData({email: this.state.login.value, password: this.state.password.value});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && !_.isEqual(this.props, nextProps)
      && !_.isEmpty(nextProps.user)
      && nextProps.user.success) {
      this.props.login(nextProps.user);
      this.props.history.push('/diary');
    }
  }

  render() {
    const { styles, user } = this.props;
    return (
      <form onSubmit={this.onSubmit} className={styles.form}>
        <div>Авторизация</div>
        <div>
          <TextField
            onChange={this.onChangeLogin}
            onBlur={this.onBlur}
            hintText="логин"
            errorText={this.state.login.errors.length ? (
              <div>
                {this.state.login.errors.map((error, i) => <div key={i}>{error}</div>)}
              </div>
            ) : null}/>
        </div>
        <div>
          <TextField
            onChange={this.onChangePassword}
            onBlur={this.onBlur}
            hintText="пароль"
            type={'password'}
            errorText={this.state.password.errors.length ? (
              <div>
                {this.state.password.errors.map((error, i) => <div key={i}>{error}</div>)}
              </div>
            ) : null}/>
        </div>
        {user && user.errorMessage &&
          <div className={styles.row}>
            <span className={styles.error}>{user.errorMessage}</span>
          </div>
        }
        <div className={styles.row}>
          <Button options={{inlineGreen: true}}>Войти</Button>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
