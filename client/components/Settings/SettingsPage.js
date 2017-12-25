import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import ChangePasswordForm from './ChangePasswordForm';

export class SettingsPage extends React.Component {
  render() {
    return (
      <div className="top-spaced">
        <div className="card card-full">
          <h2>Profile</h2>
          <strong>Name:</strong> {this.props.user.name}<br />
          <strong>Email:</strong> {this.props.user.email}<br />
          <br />
          <h2>Change Password</h2>
          <ChangePasswordForm />
        </div>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  user: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user
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
)(SettingsPage);
