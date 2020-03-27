import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './Login/LoginPage';
import SignupPage from './Signup/SignupPage';
import EmailVerificationPage from './EmailVerification/EmailVerificationPage';
import AdminPage from './Admin/AdminPage';
import NotFoundPage from './NotFoundPage';
import SettingsPage from './Settings/SettingsPage';
import PasswordResetRequestPage from './PasswordResetRequest/PasswordResetRequestPage';
import PasswordResetSuccessPage from './PasswordResetSuccess/PasswordResetSuccessPage';
import PasswordResetPage from './PasswordReset/PasswordResetPage';
import InvitationErrorPage from './InvitationError/InvitationErrorPage';
import {OverlayManager, Navbar, PrivateRoute, PrivateRouteContainer, ErrorBoundary} from '../components';


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  componentDidUpdate(prevProps) {
    if(this.props.activeAccountId !== prevProps.activeAccountId) {
      this.forceUpdate();
    }
  }
  render() {
    const {isAuthenticated} = this.props;
    const needsAccount = !this.props.isAuthenticating && !this.props.activeAccount;
    return this.props.isLoaded && !this.props.isAuthenticating
      ? <ErrorBoundary>
        <OverlayManager />
        <Switch>
          <PrivateRoute path="/login" component={LoginPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
          <PrivateRoute path="/signup" exact component={SignupPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
          <PrivateRoute path="/signup/verify" exact component={EmailVerificationPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
          <PrivateRoute exact path="/password/request" component={PasswordResetRequestPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
          <Route exact path="/password/reset" component={PasswordResetPage} />
          <Route exact path="/password/reset/success" component={PasswordResetSuccessPage} />
          <PrivateRoute exact path="/invitations/error" isAuthorized={!isAuthenticated} component={InvitationErrorPage} redirectTo="/" />
          <PrivateRouteContainer isAuthorized={isAuthenticated} redirectTo="/login" withParams>
            <div className="fill">
              <div className="fill flex-column">
                <Navbar path={this.props.history} />
                <div className="fill flex-row">
                  <div className="content-container flex-column">
                    <Switch>
                      <Route path="/admin" component={AdminPage} />
                      <PrivateRoute path="/settings" component={SettingsPage} isAuthorized={!needsAccount} redirectTo="/account/create" />
                      <PrivateRoute path="/" exact isAuthorized={false} redirectTo="/customers" />
                      <Route component={NotFoundPage} />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </PrivateRouteContainer>
        </Switch>
      </ErrorBoundary> : null;
  }
}

App.propTypes = {
  location: PropTypes.object,
  isLoggingIn: PropTypes.bool,
  isLoaded: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.element,
  history: PropTypes.string,
  activeAccountId: PropTypes.string,
  activeAccount: PropTypes.object,
  isAuthenticating: PropTypes.bool.isRequired
};

export default App;
