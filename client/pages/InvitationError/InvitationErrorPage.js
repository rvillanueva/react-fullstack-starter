import React from 'react';
import {Link} from 'react-router-dom';
import {EmptyNavbar} from '../../components';
import './invitation-error-page.scss';

const InvitationErrorPage = () =>
  <div className="fill flex-column overflow-hidden">
    <EmptyNavbar />
    <div className="fill login-page">
      <div className="login-card">
        <h1>Invitation Link Expired</h1>
        This invitation link is expired or invalid. Please try again, <Link to="/login">login</Link>, or <Link to="/signup">sign up</Link>.
      </div>
    </div>
  </div>;

export default InvitationErrorPage;
