import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../../../actions/authActions';
import * as userActions from '../../../../actions/userActions';
import ChangePasswordForm from './components/ChangePasswordForm';
import UserProfileForm from './components/UserProfileForm';

export class UserSettingsPage extends React.Component {
  updateProfile = async patch => this.props.userActions.updateMyProfile(patch);
  render() {
    const {user} = this.props;
    return (
      <div className="page-body">
        <div className="card card-full card-body">
          <h2>Profile</h2>
          <UserProfileForm user={user} onSubmit={this.updateProfile} />
          <br />
          <strong>Email:</strong>&nbsp;{user.email}<br />
          <br />
          <h2>Change Password</h2>
          <ChangePasswordForm />
        </div>
      </div>
    );
  }
}

UserSettingsPage.propTypes = {
  user: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettingsPage);
