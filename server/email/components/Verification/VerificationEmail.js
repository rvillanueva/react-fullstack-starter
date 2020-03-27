import HTMLComponent from '../BaseComponent';
import PropTypes from '../PropTypes';
import config from '../../../config/environment';
import path from 'path';

export default class VerificationEmail extends HTMLComponent {
  async renderHtml() {
    const {userId, token} = this.props;
    const url = `${config.domain}/auth/verification?id=${userId}&code=${token}`;
    return `
      <div class="container">
        <div class="card card--full card--padded">
          <h1>Complete your registration</h1>
          Click the link below to verify your email. The link will be valid for one hour.
          <br />
          <br />
          You can <a href="${url}">click here to verify</a>
          <br />or follow this link:
          <br />
          <a href="${url}">${url}</a>
        </div>
      </div>
    `;
  }
  getDefaultSendOptions() {
    const {userEmail} = this.props;
    return {
      to: [userEmail],
      subject: 'Verify your email for Waypost'
    };
  }
}

VerificationEmail.propTypes = {
  userId: PropTypes.object.isRequired,
  userEmail: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

VerificationEmail.styles = path.join(__dirname, '../../styles/verification.css');
