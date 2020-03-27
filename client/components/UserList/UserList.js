import React from 'react';
import PropTypes from 'prop-types';
import './user-list.scss';


class UserList extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const {dropdown: UserDropdown, users} = this.props;
    var orgUsers = users
      //.sort((a, b) => comparelocal(a.name, b.name))
      .map(user => <div className="card-list__item card-list__item--padded flex-row" key={user._id}>
        <div className="flex-row__group flex-row__group--left">{user.name}</div>
        <div className="flex-row__group flex-row__group--left">{user.email}</div>
        <div className="flex-row__group flex-row__group--left">{user.role ? user.role : null}</div>
        <div className="flex-row__group flex-row__group--right"><UserDropdown user={user} /></div>
      </div>
      );
    return (
      <div className="card-list">
        {orgUsers}
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  dropdown: PropTypes.func
};

export default UserList;
