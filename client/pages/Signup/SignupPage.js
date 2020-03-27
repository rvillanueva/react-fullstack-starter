import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import * as routerActions from '../../actions/routerActions';
import SignupForm from './components/SignupForm';
import './signup-page.scss';

export class LoginPage extends React.Component {
  signup = async({email, password, name}) => {
    await this.props.authActions.signup({email, password, name});
    await this.props.routerActions.push('/signup/verify');
  }

  render() {
    return (
      <div className="fill signup-page">
        <SignupForm
          signup={this.signup}
          isAuthenticating={this.props.auth.isAuthenticating}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  authActions: PropTypes.object.isRequired,
  routerActions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
