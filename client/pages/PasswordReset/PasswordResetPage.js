import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import * as authActions from '../../actions/authActions';
import PasswordResetForm from './components/PasswordResetForm';
import querystring from 'querystring';
import {history} from '../../store/configureStore';
import {extractErrorMessage} from '../../utils/error';
import './password-reset-page.scss';

export class PasswordResetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenIsAuthorized: null,
      resetToken: '',
      userId: ''
    };
  }
  setError(err) {
    console.error(err);
    this.setState({error: extractErrorMessage(err)});
  }
  componentDidMount() {
    const {user: userId, token: resetToken} = querystring.parse(this.props.location.search.slice(1) || '');
    this.setState({
      resetToken,
      userId
    });
    this.verifyResetToken(userId, resetToken);
  }
  async verifyResetToken(userId, resetToken) {
    try {
      if(!userId || !resetToken) return this.setState({ tokenIsAuthorized: false });
      await this.props.authActions.verifyResetToken(userId, resetToken);
      this.setState({ tokenIsAuthorized: true });
    } catch(err) {
      this.setState({ tokenIsAuthorized: false });
    }
  }
  changePassword = async(newPassword, newPasswordRepeat) => {
    try {
      const {resetToken, userId} = this.state;
      if(newPassword !== newPasswordRepeat) return this.setError('Passwords must match.');
      await this.props.authActions.resetPassword(userId, resetToken, newPassword);
      history.push('/password/reset/success');
    } catch(err) {
      this.setError(err);
    }
  }

  renderUnauthorized() {
    return <div>
      <h1>Password Reset</h1>
      Link is invalid or has expired. <Link to="/password/request">Please try again.</Link>
    </div>;
  }

  render() {
    const {tokenIsAuthorized} = this.state;
    let content = null;
    if(tokenIsAuthorized) {
      content = <PasswordResetForm
        onSubmit={this.changePassword}
        isAuthenticating={this.props.auth.isAuthenticating}
        error={this.state.error}
      />;
    } else if(tokenIsAuthorized === false) {
      content = this.renderUnauthorized();
    }
    return (
      <div className="fill login-page">
        <div className="login-card">
          {content}
        </div>
      </div>
    );
  }
}

PasswordResetPage.propTypes = {
  authActions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    location: state.router.location
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
)(PasswordResetPage);
