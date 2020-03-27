import HTMLComponent from '../BaseComponent';
import config from '../../../config/environment';
import PropTypes from '../PropTypes';
import path from 'path';

export default class PasswordResetEmail extends HTMLComponent {
  async renderHtml() {
    const {user, token} = this.props;
    const resetUrl = `${config.domain}/password/reset?user=${user._id}&token=${token}`;
    return `
      <div class="container">
        <div class="card card--full card--padded">
          We've received a request to reset your Waypost password. If this was not you, you can ignore this email. The links below will be valid for one hour.
          <br />
          <br />
          You can <a href="${resetUrl}">click here to reset your password</a>
          <br />or follow this link:
          <br />
          <a href="${resetUrl}">${resetUrl}</a>
        </div>
      </div>
    `;
  }
  getDefaultSendOptions() {
    const {user} = this.props;
    return {
      to: [user.email],
      from: `${config.email.name} <${config.email.address}>`,
      subject: 'Password Reset for Waypost'
    };
  }
}


PasswordResetEmail.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
};


PasswordResetEmail.styles = path.join(__dirname, '../../styles/password-reset.css');
