import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/authActions';
import LoginForm from '../LoginForm';

export class LoginPage extends React.Component {

  login = (email, password) => {
    this.props.actions.login({email: email, password: password});
  }

  render() {
    return (
      <LoginForm
        login={this.login}
        isAuthenticating={this.props.auth.isAuthenticating}
      />
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
