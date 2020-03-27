import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {stopEvent} from '../../../utils/dom';
import {AlertCard, SubmitButton} from '../../../components';

export class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = e => {
    if(e.target.name === 'email') {
      this.setState({email: e.target.value});
    }
    if(e.target.name === 'password') {
      this.setState({password: e.target.value});
    }
  }

  onSubmit(e) {
    stopEvent(e);
    if(this.props.isAuthenticating) {
      return;
    }
    return this.props.login(this.state.email, this.state.password);
  }
  render() {
    return (
      <div className="login-card">
        <h1>Login</h1>
        <AlertCard type="error" message={this.props.error}/>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label className="form__label">Email</label>
          <input onChange={this.onChange.bind(this)}className="form__control" name="email" value={this.state.email} disabled={this.props.isAuthenticating}/>
          <label className="form__label">Password</label>
          <input onChange={this.onChange.bind(this)} className="form__control" type="password" name="password" value={this.state.password} disabled={this.props.isAuthenticating}/>
          <SubmitButton className="btn btn-primary login-button" value="Login" isSubmitting={this.props.isAuthenticating}/>
          <br />
          New user? <Link to="/signup">Create an account.</Link>
          <br />
          Forgot your login? <Link to="/password/request">Reset password.</Link>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
  isAuthenticating: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string
};

export default LoginForm;
