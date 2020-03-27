import React from 'react';
import {Link} from 'react-router-dom';
import {EmptyNavbar} from '../../components';
import './password-reset-success-page.scss';

export default class PasswordResetSuccessPage extends React.Component {
  render() {
    return (
      <div className="fill flex-column overflow-hidden">
        <EmptyNavbar />
        <div className="fill login-page">
          <div className="login-card">
            <h1>Password Reset</h1>
            Password changed successfully! <Link to="/login">Click here to login.</Link>
          </div>
        </div>
      </div>
    );
  }
}
