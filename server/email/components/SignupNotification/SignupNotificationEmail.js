import HTMLComponent from '../BaseComponent';
import PropTypes from '../PropTypes';
import config from '../../../config/environment';
import path from 'path';

export default class SignupNotificationEmail extends HTMLComponent {
  async renderHtml() {
    return '';
  }
  getDefaultSendOptions() {
    const {user} = this.props;
    return {
      to: [config.email.admin],
      subject: `${user.email} signed up`
    };
  }
}

SignupNotificationEmail.propTypes = {
  user: PropTypes.object.isRequired
};

SignupNotificationEmail.styles = path.join(__dirname, '../../styles/verification.css');
