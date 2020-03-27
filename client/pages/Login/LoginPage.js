import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import LoginForm from './components/LoginForm';
import {EmptyNavbar} from '../../components';
import './login-page.scss';
import querystring from 'querystring';

function parseRedirectFromQueryString(searchStr) {
  if(!searchStr) {
    return null;
  }
  const {redirect} = querystring.parse(searchStr.slice(1)) || {};
  if(redirect) {
    const cleanRedirect = redirect.replace(/^\/+|\/+$/g, ''); // remove leading and trailing slashes
    return `/${cleanRedirect}`;
  }
  return null;
}

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  login = async(email, password) => {
    try {
      const {routing} = this.props;
      const redirectTo = parseRedirectFromQueryString(routing.location.search);
      await this.props.authActions.login({email, password});
      await this.props.authActions.handlePostAuthRedirect(redirectTo);
    } catch(err) {
      const isUnauthorizedError = err && err.response && err.response.status === 401;
      if(isUnauthorizedError) {
        this.setState({
          error: 'Invalid username or password, please try again.'
        });
      } else {
        console.error(err);
        this.setState({
          error: 'There was an unexpected error. Please try again.'
        });
      }
    }
  }

  render() {
    return (
      <div className="fill flex-column">
        <EmptyNavbar />
        <div className="fill login-page">
          <LoginForm
            login={this.login}
            isAuthenticating={this.props.auth.isAuthenticating}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  authActions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  routing: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    routing: state.router
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
)(LoginPage);
