import React from 'react';
import {func, bool} from 'prop-types';
import '../styles/login-page.scss';

export class LoginForm extends React.Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange = e => {
    if(e.target.name === 'email'){
      this.setState({email: e.target.value})
    }
    if(e.target.name === 'password'){
      this.setState({password: e.target.value})
    }
  }

  onSubmit = e => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    this.props.login(this.state.email, this.state.password);
    return false;
  }

  render() {
    return (
      <div className="login-panel">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          Email: <input onChange={this.onChange} name="email" value={this.state.email} disabled={this.props.isAuthenticating}/>
          <br />
          Password: <input onChange={this.onChange} type="password" name="password" value={this.state.password} disabled={this.props.isAuthenticating}/>
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: func.isRequired,
  isAuthenticating: bool.isRequired
};

export default LoginForm;
