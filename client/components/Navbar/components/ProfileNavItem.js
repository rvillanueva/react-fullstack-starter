import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '../../../components';
import '../navbar.scss';

// Since this component is simple and static, there's no parent container for it.
export default class ProfileNavItem extends React.Component {
  render() {
    const {user} = this.props;
    return (
      <span className="navbar__profile-item">
        <Avatar user={user} size={32}/>
      </span>
    );
  }
}

ProfileNavItem.propTypes = {
  user: PropTypes.object.isRequired
};
