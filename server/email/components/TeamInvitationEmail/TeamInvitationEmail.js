import HTMLComponent from '../BaseComponent';
import config from '../../../config/environment';
import path from 'path';

export default class TeamInvitationEmail extends HTMLComponent {
  async renderHtml() {
    const {invitation, creator, business} = this.props;
    const acceptUrl = `${config.domain}/auth/invitation?id=${invitation._id}&code=${invitation.authCode}`;
    return `
      <div class="container">
        <div class="card card--full card--padded">
          ${creator.name} (${creator.email}) has invited you to join
          <strong>${business.name}</strong> on Waypost.
          <br />
          <br />
          <a href="${acceptUrl}">Click here to join</a>
          <br />
          <br />or follow this link:
          <br />
          <a href="${acceptUrl}">${acceptUrl}</a>
        </div>
      </div>
    `;
  }
}

TeamInvitationEmail.styles = path.join(__dirname, '../../styles/team-invitation.css');
