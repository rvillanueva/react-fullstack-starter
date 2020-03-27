import React from 'react';
import {EmptyNavbar} from '../../components';

const EmailVerificationPage = () =>
  <div className="fill flex-column overflow-hidden">
    <EmptyNavbar />
    <div className="fill login-page">
      <div className="login-card">
        <h1>Thanks for confirming your account.</h1>
        Check your email for a verification link.
      </div>
    </div>
  </div>;

export default EmailVerificationPage;
