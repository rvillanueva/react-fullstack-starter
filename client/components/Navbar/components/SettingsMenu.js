import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from '../../../actions/authActions';
import {bindActionCreators} from 'redux';
import {Dropdown, DropdownTrigger, DropdownContent, DropdownOption} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../navbar.scss';

// Since this component is simple and static, there's no parent container for it.
class SettingsMenu extends React.Component {
  render() {
    const user = this.props.auth.user;
    var isAdmin = user.role === 'admin';
    var globalAdminOption = <DropdownOption>
      <Link to="/admin" className="unstyled-link dropdown__option">Admin</Link>
    </DropdownOption>;
    return (
      <div className="navbar__settings-menu">
        <Dropdown>
          <DropdownTrigger>
            <div className="navbar__settings-menu__trigger">
              <FontAwesomeIcon className="navbar__settings-menu__trigger__icon" icon={['fas', 'caret-down']} />
            </div>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownOption>
              <Link className="unstyled-link nav-dropdown-link dropdown__option" to='/settings/user'>Profile</Link>
            </DropdownOption>
            {isAdmin ? globalAdminOption : null}
            <div className="dropdown__divider"></div>
            <DropdownOption>
              <a className="unstyled-link nav-dropdown-link dropdown__option" href="#" onClick={this.props.authActions.logout.bind(this)}>Logout</a>
            </DropdownOption>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  }
}

SettingsMenu.propTypes = {
  auth: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  activeBusiness: PropTypes.object,
  activeBusinessRole: PropTypes.string
};

function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMenu);
