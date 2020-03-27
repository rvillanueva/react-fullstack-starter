import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../../actions/adminActions';
import * as userActions from '../../../actions/userActions';
import {Dropdown, DropdownTrigger, DropdownContent, DropdownOption} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../admin-page.scss';

class AdminUserDropdown extends React.Component {
  setUserRole(role) {
    this.props.adminActions.changeUserRole(this.props.user._id, role)
      .then(() => this.props.userActions.get());
  }
  deleteUser(user) {
    const confirm = window.confirm(`Are you sure you want to delete user ${user.name}?`); // eslint-disable-line no-alert
    if(confirm) {
      this.props.adminActions.deleteUser(user._id);
    }
  }
  render() {
    const {user} = this.props;
    return <Dropdown>
      <DropdownTrigger>
        <FontAwesomeIcon className="dropdown__trigger-icon" icon={['far', 'ellipsis-v']} />
      </DropdownTrigger>
      <DropdownContent>
        <DropdownOption className="dropdown__option" onClick={() => this.setUserRole('user')}>
          Make User
        </DropdownOption>
        <DropdownOption className="dropdown__option" onClick={() => this.setUserRole('admin')}>
          Make Admin
        </DropdownOption>
        <DropdownOption className="dropdown__option" onClick={() => this.deleteUser(user)}>
          Remove
        </DropdownOption>
      </DropdownContent>
    </Dropdown>;
  }
}

AdminUserDropdown.propTypes = {
  adminActions: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    adminActions: bindActionCreators(adminActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AdminUserDropdown);
