import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../actions/adminActions';
import * as userActions from '../../actions/userActions';
import AdminUserItem from './AdminUserItem';
import {toArray} from '../../utils/normalize';
import './admin-page.scss';

class AdminPage extends React.Component {
  componentDidMount(){
    this.props.userActions.getUsers();
  }
  setUserRole(userId, role){
    this.props.adminActions.changeUserRole(userId, role)
    .then(() => this.props.userActions.getUsers())
  }
  render() {
    var userCards = toArray(this.props.users).map(user => {
      return <AdminUserItem key={user._id} user={user} setUserRole={this.setUserRole.bind(this)}/>;
    })

    return (
      <div className="card card-full top-spaced">{userCards}</div>
    );
  }
}

AdminPage.propTypes = {
  adminActions: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    adminActions: bindActionCreators(adminActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
