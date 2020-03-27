import React from 'react';
import PropTypes from 'prop-types';
import {stopEvent} from '../../../utils/dom';
import {AlertCard} from '../../../components';

export class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ''
    };
  }

  onChange = e => {
    if(e.target.name === 'email') {
      this.setState({email: e.target.value});
    }
  }

  async handleSubmit(e) {
    stopEvent(e);
    if(this.props.isAuthenticating) {
      return;
    }
    return this.props.onSubmit(this.state.email);
  }
  render() {
    const error = <AlertCard type="error" message={this.props.error} />;
    return (
      <div className="login-card">
        <h1>Password Reset Request</h1>
        <div>{'Enter the email address that you used to register and we\'ll send you an email a link to reset your password.'}</div>
        <br />
        {this.props.error ? error : null}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label className="form__label">Email</label>
          <input onChange={this.onChange.bind(this)}className="form__control" name="email" value={this.state.email} disabled={this.props.isAuthenticating}/>
          <button type="submit" className="btn btn-primary login-button">Submit</button>
          <br />
          Still having problems? Contact us at <a href="mailto: support@wayposted.com">support@wayposted.com</a>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  isAuthenticating: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string
};

export default LoginForm;
