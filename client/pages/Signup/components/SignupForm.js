import React from 'react';
import PropTypes, {func, bool} from 'prop-types';
import {Link} from 'react-router-dom';
import AlertCard from '../../../components/Alerts/AlertCard';
import passwordValidation from '../../../../shared/validation/password';

export class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      passwordIsValid: false,
      passwordValidationMessage: '',
      error: '',
      isSubmitting: false
    };
  }

  isReadyToSubmit() {
    return this.state.email.length > 0
      && this.state.passwordIsValid
      && this.state.name.length > 0;
  }

  onChange = async e => {
    switch (e.target.name) {
    case 'email':
      return this.setState({email: e.target.value});
    case 'password':
      const {isValid: passwordIsValid, message: passwordValidationMessage} = passwordValidation(e.target.value);
      this.setState({
        passwordIsValid,
        passwordValidationMessage
      });
      return this.setState({password: e.target.value});
    case 'name':
      return this.setState({name: e.target.value});
    }
  }

  onSubmit = async e => {
    const {email, password, name, isSubmitting} = this.state;
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    if(isSubmitting) return;
    const isReadyToSubmit = this.isReadyToSubmit();
    if(!isReadyToSubmit) {
      return this.setState({
        error: 'Looks like something\'s missing. Fill out all required fields to continue.'
      });
    }
    try {
      this.setState({isSubmitting: true});
      await this.props.signup({email, password, name});
    } catch(err) {
      console.error(err);
      this.setState({isSubmitting: false});
      let errorMessage = 'Something went wrong, please try again.';
      if(err.response && typeof err.response.data === 'string') {
        errorMessage = err.response.data;
      }
      this.setState({
        error: errorMessage
      });
    }
    return false;
  }

  render() {
    const isReadyToSubmit = this.isReadyToSubmit();
    const {isSubmitting} = this.state;
    return (
      <div className="signup-card">
        <h1>Sign Up</h1>
        <AlertCard type="error" message={this.state.error} />
        <form onSubmit={this.onSubmit}>
          <label className="form__label">Name</label>
          <input onChange={this.onChange} name="name" className="form__control" value={this.state.name} disabled={this.props.isAuthenticating}/>
          <label className="form__label">Email</label>
          <input onChange={this.onChange} name="email" className="form__control" value={this.state.email} disabled={this.props.isAuthenticating}/>
          <label className="form__label">Password</label>
          <input onChange={this.onChange} type="password" className="form__control" name="password" value={this.state.password} disabled={this.props.isAuthenticating}/>
          <AlertCard type="error" message={this.state.passwordValidationMessage} />
          <button type="submit" className="btn btn-primary signup-button" disabled={!isReadyToSubmit || isSubmitting}>Signup</button>
          Already registered? <Link to="/login">Login.</Link>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signup: func.isRequired,
  isAuthenticating: bool.isRequired,
  error: PropTypes.string
};

export default SignupForm;
