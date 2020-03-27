import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import PasswordResetRequestForm from './components/PasswordResetRequestForm';
import {EmptyNavbar} from '../../components';
import {extractErrorMessage} from '../../utils/error';
import './password-reset-request-page.scss';

export class PasswordRecoveryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      submitted: false,
      email: ''
    };
  }
  setError(err) {
    console.error(err);
    this.setState({
      error: extractErrorMessage(err)
    });
  }
  sendResetVerfication = async email => {
    try {
      await this.props.authActions.requestPasswordReset(email);
      this.setState({
        submitted: true,
        email
      });
    } catch(err) {
      this.setError(err);
    }
  }

  renderSuccessMessage() {
    return <div className="login-card">
      <h1>Password Reset Request Submitted</h1>
      {`If an account with the email ${this.state.email} exists, we have sent a message with a link to reset your password.`}
    </div>;
  }

  render() {
    const content = this.state.submitted
      ? this.renderSuccessMessage()
      : <PasswordResetRequestForm
        onSubmit={this.sendResetVerfication}
        isAuthenticating={this.props.auth.isAuthenticating}
        error={this.state.error}
      />;
    return (
      <div className="fill flex-column overflow-hidden">
        <EmptyNavbar />
        <div className="fill login-page">
          {content}
        </div>
      </div>
    );
  }
}

PasswordRecoveryPage.propTypes = {
  authActions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRecoveryPage);
