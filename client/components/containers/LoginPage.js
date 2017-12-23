import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/authActions';
import LoginForm from '../LoginForm';

export class LoginPage extends React.Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange = e => {
    if(e.target.name === 'email'){
      this.setState({email: e.target.value})
    }
    if(e.target.name === 'password'){
      this.setState({password: e.target.value})
    }
  }

  login = e => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    this.props.actions.fetchAuthToken({email: this.state.email, password: this.state.password});
    return false;
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.login}
        onChange={this.onChange}
        email={this.state.email}
        password={this.state.password}
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
