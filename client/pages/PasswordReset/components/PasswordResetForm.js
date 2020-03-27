import React from 'react';
import PropTypes from 'prop-types';
import {AlertCard} from '../../../components';
import {stopEvent} from '../../../utils/dom';

export class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      newPassword: '',
      newPasswordRepeat: ''
    };
  }

  onChange = e => {
    if(e.target.name === 'newPassword') {
      this.setState({newPassword: e.target.value});
    } else if(e.target.name === 'newPasswordRepeat') {
      this.setState({newPasswordRepeat: e.target.value});
    }
  }

  async handleSubmit(e) {
    stopEvent(e);
    if(this.props.isAuthenticating) {
      return;
    }
    return this.props.onSubmit(this.state.newPassword, this.state.newPasswordRepeat);
  }
  render() {
    return (
      <div>
        <h1>Password Reset</h1>
        <div>{'Enter your new password below.'}</div>
        <br />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label className="form__label">New Password</label>
          <input type="password" onChange={this.onChange.bind(this)}className="form__control" name="newPassword" value={this.state.newPassword}/>
          <label className="form__label">Repeat New Password</label>
          <input type="password" onChange={this.onChange.bind(this)}className="form__control" name="newPasswordRepeat" value={this.state.newPasswordRepeat}/>
          {this.props.error ? <AlertCard message={this.props.error} type="error"/> : null}
          <button type="submit" className="btn btn-primary login-button">Submit</button>
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
