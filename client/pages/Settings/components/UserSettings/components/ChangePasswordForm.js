import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../../../../actions/authActions';

export class ChangePasswordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
      error: null,
      success: false
    };
  }
  setError(msg) {
    this.setState({error: msg});
  }
  onChange(e) {
    var patch = {};
    patch[e.target.name] = e.target.value;
    this.setState(patch);
  }
  async onSubmit(e) {
    try {
      e.stopPropagation();
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      const { oldPassword, newPassword, repeatNewPassword } = this.state;
      if(newPassword !== repeatNewPassword) {
        return this.setError('New passwords must match.');
      }
      await this.props.authActions.changeMyPassword(oldPassword, newPassword);
      this.setError(null);
      this.setState({oldPassword: '', newPassword: '', repeatNewPassword: '', success: true});
    } catch(err) {
      console.error(err);
      this.setError(err.message || err);
    }
  }
  render() {
    let error;
    let success;
    if(this.state.error) {
      error = <div className="alert alert-error">{this.state.error}</div>;
    } else if(this.state.success) {
      success = <div className="alert alert-success">Successfully changed password.</div>;
    }
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label className="form__label">Old Password</label>
          <input className="form__control" type="password" name="oldPassword" onChange={this.onChange.bind(this)} value={this.state.oldPassword}/>
          <label className="form__label">New Password</label>
          <input className="form__control" type="password" name="newPassword" onChange={this.onChange.bind(this)} value={this.state.newPassword} />
          <label className="form__label">Repeat New Password</label>
          <input className="form__control" type="password" name="repeatNewPassword" onChange={this.onChange.bind(this)} value={this.state.repeatNewPassword} />
          {error}{success}
          <br />
          <button className="btn btn-primary" type="submit">Update</button>
        </form>
      </div>
    );
  }
}

ChangePasswordForm.propTypes = {
  authActions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ChangePasswordForm);
