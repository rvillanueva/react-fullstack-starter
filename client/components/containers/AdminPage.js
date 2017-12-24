import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../actions/adminActions';
import * as userActions from '../../actions/userActions';
import AdminUserCard from '../AdminUserCard';

class AdminPage extends React.Component {
  componentDidMount(){
    this.props.userActions.getUsers();
  }
  render() {
    var userCards = this.props.users.allIds.map(id => {
      var user = this.props.users.byId[id]
      return <AdminUserCard key={id} name={user.name} email={user.email} role={user.role} />;
    })

    return (
      <div>{userCards}</div>
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
