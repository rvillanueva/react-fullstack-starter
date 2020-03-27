import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../../../../actions/authActions';
import {stopEvent} from '../../../../../utils/dom';

export class ChangePasswordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDirty: false,
      error: null,
      success: false
    };
  }
  static getDerivedStateFromProps(props, prevState) {
    return {
      name: prevState.isDirty ? prevState.name : props.user.name
    };
  }
  setError(msg) {
    this.setState({error: msg});
  }
  onSubmit = async e => {
    try {
      stopEvent(e);
      const {name} = this.state;
      await this.props.onSubmit({
        name
      });
      this.setState({
        isDirty: false,
        success: true
      });
    } catch(err) {
      this.setError('Something went wrong.');
    }
  }
  onChange = (field, value) => {
    this.setState({
      [field]: value,
      isDirty: true
    });
  }
  render() {
    let error;
    let success;
    if(this.state.error) {
      error = <div className="alert alert-error">{this.state.error}</div>;
    } else if(this.state.success) {
      success = <div className="alert alert-success">Successfully changed.</div>;
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {error}
          {success}
          <strong>Name:</strong> <input className="form__control" value={this.state.name} onSubmit={this.props.onSubmit} onChange={e => this.onChange('name', e.target.value)}/>
          <button className="btn btn-primary" type="submit" disabled={!this.state.isDirty}>Update</button>
        </form>
      </div>
    );
  }
}

ChangePasswordForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
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
