import React from 'react';
import PropTypes from 'prop-types';
import {AlertCard} from '../../../components';
import {stopEvent} from '../../../utils/dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';

class EmailVerificationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmationCode: Array(6).fill(''),
      error: '',
      isSubmitting: false
    };
    this.codeInputRefs = Array(6).fill(null);
  }
  componentDidMount() {
    this.codeInputRefs[0].focus();
  }

  setCodeInputRef(index, node) {
    this.codeInputRefs[index] = node;
  }

  handleSubmit = async e => {
    stopEvent(e);
    try {
      const code = this.state.confirmationCode.join('');
      await this.props.authActions.verifyUser(this.props.user._id, code);
      this.props.onVerification(code);
    } catch(error) {
      console.error(error);
      this.setState({
        error
      });
    }
  };

  onDigitEntry(index, value) {
    if(value.length > 1 || value && isNaN(Number(value))) return;
    const confirmationCode = this.state.confirmationCode.concat();
    confirmationCode[index] = value;
    if(value) {
      if(index < this.codeInputRefs.length - 1) {
        this.codeInputRefs[index + 1].focus();
      } else {
        this.codeInputRefs[index].blur();
        this.onSubmit();
      }
    }
    this.setState({ confirmationCode });
  }

  renderCodeDigitInput(i) {
    return <input
      name={`confirmation-code-${i}`}
      ref={node => this.setCodeInputRef(i, node)}
      onChange={e => this.onDigitEntry(i, e.target.value)}
      value={this.state.confirmationCode[i]}
      className="confirmation-code-digit" />;
  }

  render() {
    const {user} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Check your email</h1>
        We’ve sent a six-digit confirmation code to <strong>{user.email}</strong>. It will expire shortly, so enter your code soon.
        <br/><br />
        Your confirmation code
        <AlertCard type="error" message={this.state.error} />
        <div>
          {this.renderCodeDigitInput(0)}
          {this.renderCodeDigitInput(1)}
          {this.renderCodeDigitInput(2)}
          -
          {this.renderCodeDigitInput(3)}
          {this.renderCodeDigitInput(4)}
          {this.renderCodeDigitInput(5)}
        </div>
        <br />
        Keep this window open while checking for your code.
        <br />
        {'Haven\'t received our email? Check your spam folder or resend.'}
      </form>
    );
  }
}

EmailVerificationForm.propTypes = {
  authActions: PropTypes.object.isRequired,
  isAuthenticating: PropTypes.bool,
  onVerification: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.string
};

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(EmailVerificationForm);
