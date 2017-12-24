import React from 'react';
import PropTypes from 'prop-types';

export class AdminUserCard extends React.Component {
  onRoleChange(e){
    var confirm = window.confirm(`Change ${this.props.user.name}'s role to ${e.target.value}?`)
    if(confirm){
      this.props.setUserRole(this.props.user._id, e.target.value);
    }
  }
  render(){
    var roles = ['guest','user','admin'];
    roles = roles.map(role => {
      return <option value={role} key={role}>{role}</option>
    })
    return (
      <div className="admin-user-item">
        <div className="pull-right">
          <select onChange={this.onRoleChange.bind(this)} value={this.props.user.role}>
            {roles}
          </select>
        </div>
        <strong>{this.props.user.name}</strong><br />
        {this.props.user.email}
      </div>
    )
  }
}

AdminUserCard.propTypes = {
  user: PropTypes.object.isRequired,
  setUserRole: PropTypes.func.isRequired
};

export default AdminUserCard;
